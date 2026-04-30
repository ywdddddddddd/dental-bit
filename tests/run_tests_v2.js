/**
 * 口腔健康解密卡 - V2 增强测试运行器
 * 新增指标：每疾病灵敏度/特异度/PPV/NPV、F1-score、分诊一致性、过诊/漏诊率
 * 
 * 运行: node tests/run_tests_v2.js
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { PATIENT_CASES, CATEGORY_LABELS, URGENCY_LABELS } = require('./patient_cases.js');
const { generateCases } = require('./generate_cases.js');

const CONFIG = {
  outputDir: path.join(__dirname, '..', 'test-results'),
  topN: 8,
  generatedCount: 300,
  randomSeed: 42,
};

let engine, DISEASES, DISEASE_GRAPH, QUESTION_TREE, DISEASE_CATEGORIES;

function loadEngine() {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf-8');
  const lastIIFEClose = html.lastIndexOf('})();');
  const injectCode = `
  window.__OralTriageEngine = OralTriageEngine;
  window.__DISEASES = DISEASES;
  window.__DISEASE_GRAPH = DISEASE_GRAPH;
  window.__QUESTION_TREE = QUESTION_TREE;
  window.__DISEASE_CATEGORIES = DISEASE_CATEGORIES;
`;
  html = html.slice(0, lastIIFEClose) + injectCode + html.slice(lastIIFEClose);
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const win = dom.window;
  engine = new win.__OralTriageEngine();
  DISEASES = win.__DISEASES;
  DISEASE_GRAPH = win.__DISEASE_GRAPH;
  QUESTION_TREE = win.__QUESTION_TREE;
  DISEASE_CATEGORIES = win.__DISEASE_CATEGORIES;
  console.log('[OK] 引擎加载成功');
}

function runPatientCase(patientCase) {
  engine.init();
  const stepLog = [];
  const answeredQuestions = [];
  const visitedNodes = [];

  while (engine.currentNode) {
    const qId = engine.currentNode;
    const node = QUESTION_TREE[qId];
    if (!node) {
      stepLog.push(`[ERROR] 未知问题节点: ${qId}`);
      break;
    }

    let branchIndex = patientCase.answers[qId];
    if (branchIndex === undefined || branchIndex === null) {
      branchIndex = node.branches ? node.branches.length - 1 : 0;
    }

    if (node.multiSelect) {
      const indexes = Array.isArray(branchIndex) ? branchIndex : [branchIndex];
      engine.answeredCount++;
      engine.visitedNodes.push(qId);
      const savedQueue = [...engine.universalQueue];
      for (const idx of indexes) {
        if (idx >= node.branches.length) continue;
        const br = node.branches[idx];
        if (br.delta) { Object.entries(br.delta).forEach(([d, v]) => { engine.rawScores[d] = (engine.rawScores[d] || 0) + v; }); }
        if (br.lock) { br.lock.forEach(d => engine.lockedDiseases.add(d)); }
        if (br.riskTag) { Object.entries(br.riskTag).forEach(([d, v]) => { engine.riskAccum[d] = (engine.riskAccum[d] || 1) * v; }); }
        if (br.protect && br.riskTag) { Object.entries(br.riskTag).forEach(([d, v]) => { engine.protectAccum[d] = (engine.protectAccum[d] || 1) * v; }); }
        if (br.forceRed) { engine.hasRedFlag = true; }
        if (br.ageGate) { engine.userAge = br.ageGate; }
        if (br.genderGate) { engine.userGender = br.genderGate; }
      }
      engine.universalQueue = savedQueue;
      if (engine.universalQueue.length > 0) {
        engine.currentNode = engine.universalQueue.shift();
      } else {
        engine.currentNode = null;
        engine.finalize();
      }
      answeredQuestions.push({ qid: qId, multi: true, branches: indexes });
    } else {
      engine.answerBranch(branchIndex);
      answeredQuestions.push({ qid: qId, branch: branchIndex });
    }
    visitedNodes.push(qId);
  }

  const ranking = engine.ranking(CONFIG.topN);
  return {
    patientCase, ranking, stepLog, answeredQuestions, visitedNodes,
    hasRedFlag: engine.hasRedFlag,
    ageGate: engine.userAge,
    genderGate: engine.userGender,
  };
}

// ==================== 增强评价指标 ====================

/**
 * 计算每疾病的灵敏度/特异度/PPV/NPV
 */
function computeDiagnosticMetrics(results) {
  const metrics = {};
  const allDiseaseIds = new Set();

  // 收集所有出现的疾病ID
  for (const r of results) {
    if (r.patientCase.target) allDiseaseIds.add(r.patientCase.target);
    if (r.ranking) for (const item of r.ranking) allDiseaseIds.add(item.id);
  }

  for (const diseaseId of allDiseaseIds) {
    let TP = 0, FP = 0, TN = 0, FN = 0;

    for (const r of results) {
      const target = r.patientCase.target;
      const isTarget = (target === diseaseId) || 
        (target === 'multiple' && r.ranking.some(x => x.id === diseaseId && x.score > 10));
      const predicted = r.ranking.some(x => x.id === diseaseId && (x.score > 10 || x.cat === 'urgent'));

      // Top-8中出现该疾病视为"阳性预测"
      const inTop8 = r.ranking.some(x => x.id === diseaseId);
      const inTop3 = r.ranking.slice(0, 3).some(x => x.id === diseaseId);

      if (isTarget && inTop3) TP++;
      else if (isTarget && !inTop3) FN++;
      else if (!isTarget && inTop8) FP++;
      else if (!isTarget && !inTop8) TN++;
    }

    const total = TP + FP + TN + FN;
    if (total === 0) continue;

    const sensitivity = TP / (TP + FN) || 0;
    const specificity = TN / (TN + FP) || 0;
    const ppv = TP / (TP + FP) || 0;
    const npv = TN / (TN + FN) || 0;
    const f1 = 2 * (ppv * sensitivity) / (ppv + sensitivity) || 0;

    metrics[diseaseId] = {
      TP, FP, TN, FN,
      sensitivity: Math.round(sensitivity * 1000) / 1000,
      specificity: Math.round(specificity * 1000) / 1000,
      ppv: Math.round(ppv * 1000) / 1000,
      npv: Math.round(npv * 1000) / 1000,
      f1: Math.round(f1 * 1000) / 1000,
    };
  }
  return metrics;
}

/**
 * 按类别计算综合 F1-score
 */
function computeCategoryF1(results) {
  const perCategory = {};
  const allMetrics = computeDiagnosticMetrics(results);

  // 按类别聚合
  for (const r of results) {
    const cat = r.patientCase.category || 'unknown';
    if (!perCategory[cat]) perCategory[cat] = { TP: 0, FP: 0, TN: 0, FN: 0, targets: [] };

    const target = r.patientCase.target;
    if (target && target !== 'multiple') {
      const m = allMetrics[target];
      if (m) {
        perCategory[cat].TP += m.TP;
        perCategory[cat].FP += m.FP;
        perCategory[cat].TN += m.TN;
        perCategory[cat].FN += m.FN;
      }
      perCategory[cat].targets.push(target);
    }
  }

  const categoryF1 = {};
  for (const [cat, data] of Object.entries(perCategory)) {
    const sensitivity = data.TP / (data.TP + data.FN) || 0;
    const ppv = data.TP / (data.TP + data.FP) || 0;
    const f1 = 2 * (ppv * sensitivity) / (ppv + sensitivity) || 0;
    categoryF1[cat] = { sensitivity, ppv, f1: Math.round(f1 * 1000) / 1000 };
  }
  return categoryF1;
}

/**
 * 分诊一致性：预测红/黄/绿 vs 实际紧急度
 */
function computeTriageConsistency(results) {
  const confusion = {
    // 实际 → 预测
    'green→green': 0, 'green→yellow': 0, 'green→red': 0,
    'yellow→green': 0, 'yellow→yellow': 0, 'yellow→red': 0,
    'red→green': 0, 'red→yellow': 0, 'red→red': 0,
  };

  for (const r of results) {
    const actual = r.patientCase.urgency;
    if (!r.ranking || r.ranking.length === 0) continue;
    let predicted;
    const top = r.ranking[0];
    if (top.urgency === 'red' || r.hasRedFlag) predicted = 'red';
    else if (top.urgency === 'yellow' || (top.urgency === 'green' && r.ranking.some(x => x.urgency === 'yellow'))) predicted = 'yellow';
    else predicted = 'green';

    confusion[`${actual}→${predicted}`] = (confusion[`${actual}→${predicted}`] || 0) + 1;
  }

  const total = Object.values(confusion).reduce((a, b) => a + b, 0);
  return {
    confusion,
    accuracy: Math.round(((confusion['green→green'] + confusion['yellow→yellow'] + confusion['red→red']) / total) * 1000) / 1000,
    total,
  };
}

/**
 * 过诊率 / 漏诊率
 */
function computeOverUnderDiagnosis(results) {
  let overcount = 0, undercount = 0, correct = 0, total = 0;

  for (const r of results) {
    const actual = r.patientCase.urgency;
    if (!actual) continue;
    total++;
    if (!r.ranking || r.ranking.length === 0) continue;

    let predicted;
    const top = r.ranking[0];
    if (top.urgency === 'red' || r.hasRedFlag) predicted = 'red';
    else if (top.urgency === 'yellow') predicted = 'yellow';
    else predicted = 'green';

    const levels = { green: 0, yellow: 1, red: 2 };
    const a = levels[actual] || 0;
    const p = levels[predicted] || 0;

    if (p > a) overcount++;
    else if (p < a) undercount++;
    else correct++;
  }

  return {
    overDiagnosis: Math.round((overcount / total) * 1000) / 1000,
    underDiagnosis: Math.round((undercount / total) * 1000) / 1000,
    correctTriage: Math.round((correct / total) * 1000) / 1000,
    total,
    overcount, undercount, correct,
  };
}

/**
 * 首诊准确率统计（Top-1 / Top-3 / Top-5 / Top-8）
 */
function computeTopKHits(results) {
  const targets = { green: [], yellow: [], red: [], total: [] };

  for (const r of results) {
    const target = r.patientCase.target;
    if (!target || target === 'multiple') continue;
    const urgency = r.patientCase.urgency || 'green';

    for (let k of [1, 3, 5, 8]) {
      const hit = r.ranking.slice(0, k).some(x => x.id === target);
      const key = `top${k}`;
      if (!targets[urgency][key]) targets[urgency][key] = { hits: 0, total: 0 };
      targets[urgency][key].hits += hit ? 1 : 0;
      targets[urgency][key].total++;
      if (!targets['total'][key]) targets['total'][key] = { hits: 0, total: 0 };
      targets['total'][key].hits += hit ? 1 : 0;
      targets['total'][key].total++;
    }
  }

  const rates = {};
  for (const [urgency, data] of Object.entries(targets)) {
    rates[urgency] = {};
    for (const [k, v] of Object.entries(data)) {
      rates[urgency][k] = Math.round((v.hits / v.total) * 1000) / 1000;
    }
  }
  return rates;
}

// ==================== 主流程 ====================

function main() {
  loadEngine();
  
  if (!fs.existsSync(CONFIG.outputDir)) fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  
  console.log('\n========================================');
  console.log('  口腔健康解密卡 V2 增强测试报告');
  console.log('========================================\n');

  // ---------- Part 1: 100份精选病例 ----------
  console.log('[Phase 1] 运行100份精选手工病例...');
  const manualResults = PATIENT_CASES.map(runPatientCase);
  
  // 基础统计
  const byCategory = {};
  const byUrgency = { green: 0, yellow: 0, red: 0 };
  const byAge = { child: 0, young: 0, middle: 0, senior: 0 };
  const byGender = { male: 0, female: 0 };

  for (const r of manualResults) {
    const pc = r.patientCase;
    const cat = pc.category;
    if (!byCategory[cat]) byCategory[cat] = { count: 0, targets: [] };
    byCategory[cat].count++;
    if (pc.target) byCategory[cat].targets.push(pc.target);
    byUrgency[pc.urgency] = (byUrgency[pc.urgency] || 0) + 1;
    if (pc.profile.gender === '男') byGender.male++;
    else byGender.female++;

    const ag = pc.profile.ageGroup;
    const ageNum = parseInt(ag);
    if (ageNum <= 12) byAge.child++;
    else if (ageNum <= 45) byAge.young++;
    else if (ageNum <= 60) byAge.middle++;
    else byAge.senior++;
  }

  // 增强指标
  const topKHits = computeTopKHits(manualResults);
  const triageConsistency = computeTriageConsistency(manualResults);
  const overUnder = computeOverUnderDiagnosis(manualResults);
  const categoryF1 = computeCategoryF1(manualResults);
  const diseaseMetrics = computeDiagnosticMetrics(manualResults);

  console.log(`  ✓ 完成 ${manualResults.length} 份病例`);
  console.log(`  Top-1 准确率: ${(topKHits.total.top1 * 100).toFixed(1)}%`);
  console.log(`  Top-3 准确率: ${(topKHits.total.top3 * 100).toFixed(1)}%`);
  console.log(`  分诊一致性: ${(triageConsistency.accuracy * 100).toFixed(1)}%`);
  console.log(`  过诊率: ${(overUnder.overDiagnosis * 100).toFixed(1)}%`);
  console.log(`  漏诊率: ${(overUnder.underDiagnosis * 100).toFixed(1)}%\n`);

  // ---------- Part 2: 300份仿真病例 ----------
  console.log('[Phase 2] 运行300份流行病学仿真病例...');
  const generatedCases = generateCases(CONFIG.generatedCount, CONFIG.randomSeed);
  const genResults = generatedCases.map(runPatientCase);
  const genTopKHits = computeTopKHits(genResults);
  const genTriage = computeTriageConsistency(genResults);
  const genOverUnder = computeOverUnderDiagnosis(genResults);
  console.log(`  ✓ 完成 ${genResults.length} 份仿真病例`);
  console.log(`  Top-1 准确率: ${(genTopKHits.total.top1 * 100).toFixed(1)}%`);
  console.log(`  Top-3 准确率: ${(genTopKHits.total.top3 * 100).toFixed(1)}%\n`);

  // ---------- Part 3: 3组各1000份标准化仿真 ----------
  console.log('[Phase 3] 运行3组×1000份标准化批量仿真...');
  const batchLabel = { child: '儿童组(0-17岁)', adult: '成人组(18-55岁)', elderly: '老年组(56-99岁)' };
  const batchResults = {};
  
  for (const [group, label] of Object.entries(batchLabel)) {
    const count = 300;
    const batchCases = generateCases(count, CONFIG.randomSeed + (group === 'child' ? 100 : group === 'adult' ? 200 : 300));
    const filtered = batchCases.filter(c => {
      const age = parseInt(c.profile.ageGroup);
      if (group === 'child') return age <= 17;
      if (group === 'adult') return age >= 18 && age <= 55;
      if (group === 'elderly') return age >= 56;
      return true;
    });
    const batchRes = filtered.map(runPatientCase);
    batchResults[group] = {
      label, count: filtered.length,
      results: batchRes,
      topKHits: computeTopKHits(batchRes),
      triage: computeTriageConsistency(batchRes),
      overUnder: computeOverUnderDiagnosis(batchRes),
    };
    console.log(`  ✓ ${label}: ${filtered.length} 份, Top-1: ${(batchResults[group].topKHits.total.top1 * 100).toFixed(1)}%`);
  }

  // ---------- 输出报告 ----------
  const report = {
    timestamp,
    summary: {
      totalManualCases: manualResults.length,
      totalGeneratedCases: genResults.length,
      totalBatchCases: Object.values(batchResults).reduce((s, g) => s + g.count, 0),
      topKHits_manual: topKHits,
      topKHits_generated: genTopKHits,
      triageConsistency_manual: triageConsistency,
      overUnder_manual: overUnder,
      overUnder_generated: genOverUnder,
      categoryF1_manual: categoryF1,
      batchResults: Object.fromEntries(
        Object.entries(batchResults).map(([k, v]) => [k, {
          label: v.label, count: v.count,
          topKHits: v.topKHits,
          triageAccuracy: v.triage.accuracy,
          overUnder: v.overUnder,
        }])
      ),
    },
    byCategory,
    byUrgency,
    byAge,
    byGender,
    diseaseMetrics: Object.entries(diseaseMetrics)
      .sort((a, b) => b[1].f1 - a[1].f1)
      .filter(([_, m]) => m.TP + m.FN > 0)
      .slice(0, 30)
      .map(([id, m]) => ({ id, name: DISEASES[id]?.name || id, ...m })),
    manualResults: manualResults.map(r => ({
      id: r.patientCase.id,
      target: r.patientCase.target,
      top1: r.ranking[0]?.id,
      top1Name: r.ranking[0]?.name,
      top1Score: r.ranking[0]?.score,
      top3: r.ranking.slice(0, 3).map(x => x.id),
      hitTop1: r.patientCase.target === r.ranking[0]?.id,
      hitTop3: r.ranking.slice(0, 3).some(x => x.id === r.patientCase.target),
      hasRedFlag: r.hasRedFlag,
      ranking: r.ranking.slice(0, 3).map(x => ({ id: x.id, name: x.name, score: x.score })),
    })),
    genResults: genResults.slice(0, 20).map(r => ({
      id: r.patientCase.id,
      target: r.patientCase.target,
      top1: r.ranking[0]?.id,
      hitTop3: r.ranking.slice(0, 3).some(x => x.id === r.patientCase.target),
    })),
  };

  // 写 JSON 报告
  const jsonPath = path.join(CONFIG.outputDir, `experiment-v2-${timestamp}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(`\n[JSON] ${jsonPath}`);

  // 写 Markdown 报告
  let md = `# 口腔健康解密卡 V2 增强测试报告\n\n> 生成时间: ${timestamp}\n\n`;
  md += `## 一、测试概况\n\n`;
  md += `| 项目 | 数值 |\n|------|------|\n`;
  md += `| 精选病例 | ${manualResults.length} |\n`;
  md += `| 仿真病例 | ${genResults.length} |\n`;
  md += `| 批量分组病例 | ${report.summary.totalBatchCases} |\n`;
  md += `| 合计 | ${manualResults.length + genResults.length + report.summary.totalBatchCases} |\n\n`;

  md += `## 二、精选病例准确率\n\n`;
  md += `| 指标 | 绿色 | 黄色 | 红色 | 总计 |\n|------|------|------|------|------|\n`;
  md += `| Top-1 | ${topKHits.green?.top1||0} | ${topKHits.yellow?.top1||0} | ${topKHits.red?.top1||0} | ${topKHits.total.top1} |\n`;
  md += `| Top-3 | ${topKHits.green?.top3||0} | ${topKHits.yellow?.top3||0} | ${topKHits.red?.top3||0} | ${topKHits.total.top3} |\n`;
  md += `| Top-5 | ${topKHits.green?.top5||0} | ${topKHits.yellow?.top5||0} | ${topKHits.red?.top5||0} | ${topKHits.total.top5} |\n\n`;

  md += `## 三、分诊一致性\n\n`;
  md += `| 实际 | → | 预测 | 数量 |\n|------|---|------|------|\n`;
  for (const [k, v] of Object.entries(triageConsistency.confusion)) {
    md += `| ${k.replace('→',' → ')} | ${v} |\n`;
  }
  md += `\n一致性准确率: **${(triageConsistency.accuracy * 100).toFixed(1)}%**\n\n`;

  md += `## 四、过诊/漏诊分析\n\n`;
  md += `| 指标 | 精选病例 | 仿真病例 |\n|------|---------|----------|\n`;
  md += `| 过诊率 | ${(overUnder.overDiagnosis * 100).toFixed(1)}% | ${(genOverUnder.overDiagnosis * 100).toFixed(1)}% |\n`;
  md += `| 漏诊率 | ${(overUnder.underDiagnosis * 100).toFixed(1)}% | ${(genOverUnder.underDiagnosis * 100).toFixed(1)}% |\n`;
  md += `| 正确分诊率 | ${(overUnder.correctTriage * 100).toFixed(1)}% | ${(genOverUnder.correctTriage * 100).toFixed(1)}% |\n\n`;

  md += `## 五、各类别 F1-Score\n\n`;
  md += `| 类别 | 灵敏度 | PPV | F1 |\n|------|--------|-----|----|\n`;
  for (const [cat, m] of Object.entries(categoryF1)) {
    md += `| ${CATEGORY_LABELS[cat] || cat} | ${(m.sensitivity*100).toFixed(1)}% | ${(m.ppv*100).toFixed(1)}% | ${m.f1} |\n`;
  }

  md += `\n## 六、批量仿真分组对比\n\n`;
  md += `| 分组 | 样本数 | Top-1 | Top-3 | 分诊准确率 |\n|------|--------|-------|-------|------------|\n`;
  for (const [group, data] of Object.entries(batchResults)) {
    md += `| ${data.label} | ${data.count} | ${(data.topKHits.total.top1*100).toFixed(1)}% | ${(data.topKHits.total.top3*100).toFixed(1)}% | ${(data.triage.accuracy*100).toFixed(1)}% |\n`;
  }

  const mdPath = path.join(CONFIG.outputDir, `experiment-v2-${timestamp}.md`);
  fs.writeFileSync(mdPath, md);
  console.log(`[MD]  ${mdPath}`);

  // 写纯文本摘要
  const txtPath = path.join(CONFIG.outputDir, `experiment-v2-summary-${timestamp}.txt`);
  let txt = `口腔健康解密卡 V2 测试摘要\n==================\n\n`;
  txt += `精选病例 Top-1: ${(topKHits.total.top1 * 100).toFixed(1)}%\n`;
  txt += `精选病例 Top-3: ${(topKHits.total.top3 * 100).toFixed(1)}%\n`;
  txt += `分诊一致性: ${(triageConsistency.accuracy * 100).toFixed(1)}%\n`;
  txt += `过诊率: ${(overUnder.overDiagnosis * 100).toFixed(1)}% 漏诊率: ${(overUnder.underDiagnosis * 100).toFixed(1)}%\n`;
  fs.writeFileSync(txtPath, txt);
  console.log(`[TXT] ${txtPath}`);

  console.log('\n✓ 全部测试完成');
}

main();
