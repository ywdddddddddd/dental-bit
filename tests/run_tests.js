/**
 * 口腔健康解密卡 - 30份模拟患者问卷测试运行器
 * 使用 jsdom 加载 index.html，提取引擎，运行30个模拟病例
 * 
 * 运行: node tests/run_tests.js
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { PATIENT_CASES, CATEGORY_LABELS, URGENCY_LABELS } = require('./patient_cases.js');
const { generateCases, computeGenerationStats } = require('./generate_cases.js');

// ==================== 配置 ====================
const CONFIG = {
  outputDir: path.join(__dirname, '..', 'test-results'),
  topN: 8,
  multiSelectAnswers: {
    // 多选问题：branchIndexes 数组
    // q_universal_medical: 糖尿病=0, 降压药=1, 自身免疫=2, 抗癫痫=3, 放疗=4, 双膦酸盐=5, 无=6
    // q_universal_family: 年轻掉牙=0, 口腔癌家族=1, 排列不齐=2, 无=3
    // q_universal_smoking: 抽烟=0, 喝酒=1, 嚼槟榔=2, 不=3
    // q_universal_diet: 甜食=0, 酸/碳酸=1, 硬食=2, 均衡=3
    // q_mucosa_cancer_redflags: 硬边缘=0, 出血=1, 麻木=2, 体重下降=3
  }
};

// ==================== 加载引擎 ====================
let engine;
let DISEASES;
let DISEASE_GRAPH;
let QUESTION_TREE;
let DISEASE_CATEGORIES;

function loadEngine() {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf-8');
  
  // 在最后一个 })(); 之前注入 window 导出代码
  const lastIIFEClose = html.lastIndexOf('})();');
  if (lastIIFEClose === -1) throw new Error('找不到 IIFE 闭合标记');
  const injectCode = `
  window.__OralTriageEngine = OralTriageEngine;
  window.__DISEASES = DISEASES;
  window.__DISEASE_GRAPH = DISEASE_GRAPH;
  window.__QUESTION_TREE = QUESTION_TREE;
  window.__DISEASE_CATEGORIES = DISEASE_CATEGORIES;
`;
  html = html.slice(0, lastIIFEClose) + injectCode + html.slice(lastIIFEClose);
  
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
  });
  
  const win = dom.window;
  engine = new win.__OralTriageEngine();
  DISEASES = win.__DISEASES;
  DISEASE_GRAPH = win.__DISEASE_GRAPH;
  QUESTION_TREE = win.__QUESTION_TREE;
  DISEASE_CATEGORIES = win.__DISEASE_CATEGORIES;
  
  console.log('[OK] 引擎加载成功');
}

// ==================== 健康用户疾病类别（无症状对照） ====================
const HEALTHY_CASE = {
  tooth: { label: '牙体牙髓', color: '#f472b6' },
  perio: { label: '牙周', color: '#a78bfa' },
  mucosa: { label: '黏膜', color: '#34d399' },
  joint: { label: '颌面/关节/神经', color: '#fbbf24' },
  other: { label: '其他/系统', color: '#f97316' },
  none: { label: '健康对照', color: '#6ee7b7' }
};

// ==================== 遍历DAG ====================
function runPatientCase(patientCase) {
  engine.init();
  let stepLog = [];
  let answeredQuestions = [];
  
  while (engine.currentNode) {
    const qId = engine.currentNode;
    const node = QUESTION_TREE[qId];
    if (!node) break;
    
    const branchIndex = patientCase.answers[qId];
    if (branchIndex === undefined) {
      // 安全fallback: 选最后一项(通常为"以上都不是"/"没有这些情况")
      const safeIndex = node.branches.length - 1;
      stepLog.push(`  ⚠ 缺失答案: ${qId}, fallback到最安全选项[${safeIndex}]`);
      answeredQuestions.push({ qid: qId, branch: safeIndex, text: node?.branches?.[safeIndex]?.text || 'N/A' });
      engine.answerBranch(safeIndex);
      continue;
    }
    
    // 处理多选问题（如 q_universal_medical, q_universal_smoking, q_universal_diet 等）
    if (node.multiSelect) {
      const selectedBranches = Array.isArray(branchIndex) ? branchIndex : [branchIndex];
      const allTexts = [];
      
      // 多选问题特殊处理：保存universalQueue，逐条应用所有选中分支的delta/riskTag/lock
      // 注意：直接调用answerBranch会在第一个分支后自动路由，导致后续分支应用到错误的问题
      const savedQueue = [...engine.universalQueue];
      engine.answeredCount++;
      engine.visitedNodes.push(qId);
      
      for (const bIdx of selectedBranches) {
        const branch = node.branches[bIdx];
        if (!branch) continue;
        allTexts.push(branch.text);
        
        if (branch.delta) {
          Object.entries(branch.delta).forEach(([diseaseId, value]) => {
            engine.rawScores[diseaseId] = (engine.rawScores[diseaseId] || 0) + value;
          });
        }
        if (branch.lock) {
          branch.lock.forEach(d => engine.lockedDiseases.add(d));
        }
        if (branch.riskTag) {
          Object.entries(branch.riskTag).forEach(([diseaseId, multiplier]) => {
            engine.riskAccum[diseaseId] = (engine.riskAccum[diseaseId] || 1) * multiplier;
          });
        }
        if (branch.protect && branch.riskTag) {
          Object.entries(branch.riskTag).forEach(([diseaseId, multiplier]) => {
            engine.protectAccum[diseaseId] = (engine.protectAccum[diseaseId] || 1) * multiplier;
          });
        }
        if (branch.forceRed) engine.hasRedFlag = true;
        if (branch.ageGate) engine.userAge = branch.ageGate;
        if (branch.genderGate) engine.userGender = branch.genderGate;
      }
      
      // 多选问题处理完后，恢复队列并前进到下一个问题
      engine.universalQueue = savedQueue;
      if (engine.universalQueue.length > 0) {
        engine.currentNode = engine.universalQueue.shift();
      } else {
        engine.currentNode = null;
        engine.finalize(); // 没有更多问题，触发最终评分
      }
      
      answeredQuestions.push({ qid: qId, multi: true, branches: selectedBranches, texts: allTexts });
      stepLog.push(`  -> ${node.text} [多选] 选中: ${allTexts.join(' | ')}`);
      continue;
    }
    
    // 单选问题
    const branch = node.branches[branchIndex];
    answeredQuestions.push({ qid: qId, branch: branchIndex, text: branch?.text || 'N/A' });
    stepLog.push(`  -> ${node.text}} → ${branch?.text || 'N/A'}`);
    engine.answerBranch(branchIndex);
  }
  
  const ranking = engine.ranking(CONFIG.topN);
  return {
    patientCase,
    ranking,
    stepLog,
    answeredQuestions,
    visitedNodes: [...engine.visitedNodes],
    hasRedFlag: engine.hasRedFlag,
    ageGate: engine.userAge,
    genderGate: engine.userGender,
    rawScores: { ...engine.rawScores },
    finalScores: { ...engine.scores },
  };
}

// ==================== 统计与分析 ====================
function computeStatistics(results) {
  const stats = {
    totalPatients: results.length,
    byCategory: {},
    byUrgency: { green: 0, yellow: 0, red: 0 },
    byAge: { child: 0, young: 0, middle: 0, senior: 0 },
    byGender: { male: 0, female: 0 },
    redFlagCount: 0,
    topDiseases: {},
    categoryDistribution: {},
  };
  
  results.forEach(result => {
    const { patientCase, ranking, hasRedFlag, ageGate } = result;
    
    // 按预期类别统计
    const cat = patientCase.category;
    if (!stats.byCategory[cat]) stats.byCategory[cat] = { count: 0, targets: [] };
    stats.byCategory[cat].count++;
    stats.byCategory[cat].targets.push(patientCase.id);
    
    // 按紧急级别统计
    const urgency = patientCase.urgency;
    stats.byUrgency[urgency] = (stats.byUrgency[urgency] || 0) + 1;
    
    // 按年龄统计
    if (ageGate) {
      const [min, max] = ageGate;
      if (max <= 12) stats.byAge.child++;
      else if (max <= 45) stats.byAge.young++;
      else if (max <= 60) stats.byAge.middle++;
      else stats.byAge.senior++;
    }
    
    // 按性别统计
    const gender = patientCase.profile.gender === '男' ? 'male' : 'female';
    stats.byGender[gender]++;
    
    // 红色警告统计
    if (hasRedFlag) stats.redFlagCount++;
    
    // 排名第一的疾病统计
    if (ranking.length > 0) {
      const topDisease = ranking[0];
      stats.topDiseases[topDisease.id] = (stats.topDiseases[topDisease.id] || 0) + 1;
    }
    
    // 疾病类别分布
    ranking.forEach(item => {
      if (!stats.categoryDistribution[item.cat]) {
        stats.categoryDistribution[item.cat] = 0;
      }
      stats.categoryDistribution[item.cat]++;
    });
  });
  
  return stats;
}

// ==================== 生成报告 ====================
function generateReport(results, stats, isGenerated = true) {
  const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, 19);
  const reportDir = CONFIG.outputDir;
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
  
  // 1. JSON 详细数据
  const jsonPath = path.join(reportDir, `test-results-${timestamp}.json`);
  const jsonData = results.map(r => ({
    patientId: r.patientCase.id,
    patientName: r.patientCase.name,
    profile: r.patientCase.profile,
    targetDisease: r.patientCase.target,
    expectedCategory: r.patientCase.category,
    expectedUrgency: r.patientCase.urgency,
    hasRedFlag: r.hasRedFlag,
    ageGate: r.ageGate,
    genderGate: r.genderGate,
    questionsAnswered: r.answeredQuestions.length,
    visitedNodes: r.visitedNodes,
    ranking: r.ranking,
    allScores: r.finalScores,
  }));
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log(`[OK] JSON报告: ${jsonPath}`);
  
  // 2. Markdown 详细报告
  const mdPath = path.join(reportDir, `test-report-${timestamp}.md`);
  const md = generateMarkdownReport(results, stats, timestamp);
  fs.writeFileSync(mdPath, md, 'utf-8');
  console.log(`[OK] Markdown报告: ${mdPath}`);
  
  // 3. 摘要文本
  const summaryPath = path.join(reportDir, `test-summary-${timestamp}.txt`);
  const summary = generateSummary(results, stats, timestamp, isGenerated);
  fs.writeFileSync(summaryPath, summary, 'utf-8');
  console.log(`[OK] 摘要报告: ${summaryPath}`);
  
  return { jsonPath, mdPath, summaryPath };
}

function generateMarkdownReport(results, stats, timestamp) {
  const lines = [];
  
  lines.push('# 口腔健康解密卡 · AI预问诊系统测试报告');
  lines.push('');
  lines.push(`**测试时间:** ${new Date(timestamp).toLocaleString('zh-CN')}`);
  lines.push(`**测试病例数:** ${results.length}`);
  lines.push(`**覆盖疾病数:** 72种`);
  lines.push(`**测试架构:** Node.js + jsdom · DAG二叉树自动化遍历`);
  lines.push('');
  lines.push('---');
  lines.push('');
  
  // ===== 综述 =====
  lines.push('## 一、测试总览');
  lines.push('');
  lines.push('| 指标 | 数值 |');
  lines.push('|------|------|');
  lines.push(`| 总测试病例数 | ${stats.totalPatients} |`);
  lines.push(`| 红色警告病例 | ${stats.redFlagCount} |`);
  lines.push(`| 牙体牙髓类 | ${stats.byCategory['tooth']?.count || 0} |`);
  lines.push(`| 牙周类 | ${stats.byCategory['perio']?.count || 0} |`);
  lines.push(`| 黏膜类 | ${stats.byCategory['mucosa']?.count || 0} |`);
  lines.push(`| 颌面关节类 | ${stats.byCategory['joint']?.count || 0} |`);
  lines.push(`| 其他/系统类 | ${stats.byCategory['other']?.count || 0} |`);
  lines.push(`| 健康对照 | ${stats.byCategory['none']?.count || 0} |`);
  lines.push(`| 绿色(常规) | ${stats.byUrgency.green} |`);
  lines.push(`| 黄色(需关注) | ${stats.byUrgency.yellow} |`);
  lines.push(`| 红色(紧急) | ${stats.byUrgency.red} |`);
  lines.push(`| 男性 | ${stats.byGender.male} |`);
  lines.push(`| 女性 | ${stats.byGender.female} |`);
  lines.push('');
  
  // ===== 年龄分布 =====
  lines.push('### 年龄分布');
  lines.push('');
  lines.push('| 年龄段 | 病例数 |');
  lines.push('|--------|--------|');
  lines.push(`| 儿童(≤12岁) | ${stats.byAge.child} |`);
  lines.push(`| 青年(13-45岁) | ${stats.byAge.young} |`);
  lines.push(`| 中年(46-60岁) | ${stats.byAge.middle} |`);
  lines.push(`| 老年(>60岁) | ${stats.byAge.senior} |`);
  lines.push('');
  
  // ===== 首诊疾病统计 =====
  lines.push('### 排名第一疾病频次');
  lines.push('');
  lines.push('| 疾病 | 频次 | 紧急度 |');
  lines.push('|------|------|--------|');
  const topDiseasesSorted = Object.entries(stats.topDiseases).sort((a, b) => b[1] - a[1]);
  for (const [diseaseId, count] of topDiseasesSorted.slice(0, 15)) {
    const disease = DISEASES[diseaseId];
    if (disease) {
      lines.push(`| ${disease.name} (${diseaseId}) | ${count} | ${disease.urgency === 'red' ? '🔴 Red' : disease.urgency === 'yellow' ? '🟡 Yellow' : '🟢 Green'} |`);
    }
  }
  lines.push('');
  
  // ===== 单个病例详情 =====
  lines.push('---');
  lines.push('');
  lines.push('## 二、30份模拟病例详细结果');
  lines.push('');
  
  results.forEach((result, idx) => {
    const { patientCase, ranking, hasRedFlag, answeredQuestions, ageGate, genderGate } = result;
    const severityEmoji = hasRedFlag ? '🚨 红色警告' : '✅ 无红色警告';
    const catLabel = CATEGORY_LABELS[patientCase.category] || '健康对照';
    const urgencyLabel = { green: '🟢 绿色(常规)', yellow: '🟡 黄色(需关注)', red: '🔴 红色(紧急)' }[patientCase.urgency] || '';
    
    lines.push(`### ${idx + 1}. ${patientCase.id} - ${patientCase.name}`);
    lines.push('');
    lines.push(`**患者画像:** ${patientCase.profile.desc}`);
    lines.push('');
    lines.push(`| 属性 | 值 |`);
    lines.push(`|------|-----|`);
    lines.push(`| 年龄组 | ${patientCase.profile.ageGroup} |`);
    lines.push(`| 性别 | ${patientCase.profile.gender} |`);
    lines.push(`| 疾病类别 | ${catLabel} |`);
    lines.push(`| 预期紧急度 | ${urgencyLabel} |`);
    lines.push(`| 红色警告 | ${severityEmoji} |`);
    lines.push(`| 回答问题数 | ${answeredQuestions.length} |`);
    
    if (ageGate) lines.push(`| 年龄门 | ${ageGate[0]}-${ageGate[1]}岁 |`);
    if (genderGate) lines.push(`| 性别门 | ${genderGate === 'male' ? '男' : genderGate === 'female' ? '女' : genderGate} |`);
    lines.push('');
    
    // 诊断排名
    if (ranking.length > 0) {
      const totalScore = ranking.reduce((s, r) => s + r.score, 0);
      lines.push('**DAG诊断排名 (Top 8):**');
      lines.push('');
      lines.push('| 排名 | 疾病 | 得分 | 概率 | 紧急度 | 类别 |');
      lines.push('|------|------|------|------|--------|------|');
      ranking.forEach((item, rIdx) => {
        const prob = totalScore > 0 ? ((item.score / totalScore) * 100).toFixed(1) : 0;
        const urgencyIcon = item.urgency === 'red' ? '🔴' : item.urgency === 'yellow' ? '🟡' : '🟢';
        const catLabelShort = CATEGORY_LABELS[item.cat] || item.cat;
        lines.push(`| ${rIdx + 1} | ${item.name} | ${item.score.toFixed(1)} | ${prob}% | ${urgencyIcon} ${item.urgency} | ${catLabelShort} |`);
      });
      lines.push('');
      
      // 首诊建议
      const topResult = ranking[0];
      lines.push(`**首诊建议:** ${topResult.name} - ${topResult.desc}`);
      lines.push('');
      lines.push(`**建议:** ${topResult.advice}`);
      lines.push('');
    } else {
      lines.push('**诊断结果:** 未检测到明显口腔疾病风险。');
      lines.push('');
    }
    
    // 问答路径
    lines.push('<details>');
    lines.push('<summary>问答路径追溯</summary>');
    lines.push('');
    answeredQuestions.forEach(q => {
      if (q.multi) {
        lines.push(`- ${q.qid}: [多选] ${q.texts.join(' | ')}`);
      } else {
        const node = QUESTION_TREE[q.qid];
        lines.push(`- ${q.qid}: "${node?.text || '?'}" → ${q.text}`);
      }
    });
    lines.push('');
    lines.push('</details>');
    lines.push('');
    lines.push('---');
    lines.push('');
  });
  
  // ===== 测试架构说明 =====
  lines.push('## 三、测试架构说明');
  lines.push('');
  lines.push('### 测试方法');
  lines.push('');
  lines.push('采用**自动化DAG二叉树遍历**测试方法：');
  lines.push('');
  lines.push('1. **引擎加载**: 使用 jsdom 在 Node.js 环境中加载 index.html，提取 `OralTriageEngine` 类');
  lines.push('2. **病例定义**: 30份模拟病例，每份包含完整的问答路径映射（questionId → branchIndex）');
  lines.push('3. **引擎驱动**: 调用 `engine.init()` 初始化，循环调用 `engine.answerBranch(idx)` 遍历DAG');
  lines.push('4. **结果收集**: 记录排名结果、得分统计、红色警告状态、遍历路径');
  lines.push('');
  lines.push('### DAG遍历统计');
  lines.push('');
  const totalQuestions = results.reduce((sum, r) => sum + r.answeredQuestions.length, 0);
  const avgQuestions = (totalQuestions / results.length).toFixed(1);
  lines.push(`| 指标 | 数值 |`);
  lines.push(`|------|------|`);
  lines.push(`| 总回答问题数 | ${totalQuestions} |`);
  lines.push(`| 平均每例问题数 | ${avgQuestions} |`);
  lines.push(`| 最少问题数 | ${Math.min(...results.map(r => r.answeredQuestions.length))} |`);
  lines.push(`| 最多问题数 | ${Math.max(...results.map(r => r.answeredQuestions.length))} |`);
  
  // 疾病类别分布
  const totalDiagnoses = Object.values(stats.categoryDistribution).reduce((a, b) => a + b, 0);
  lines.push('');
  lines.push('### 诊断类别分布');
  lines.push('');
  lines.push('| 类别 | 诊断数 | 占比 |');
  lines.push('|------|--------|------|');
  for (const [cat, count] of Object.entries(stats.categoryDistribution).sort((a, b) => b[1] - a[1])) {
    const pct = ((count / totalDiagnoses) * 100).toFixed(1);
    lines.push(`| ${CATEGORY_LABELS[cat] || cat} | ${count} | ${pct}% |`);
  }
  lines.push('');
  
  return lines.join('\n');
}

function generateSummary(results, stats, timestamp, isGenerated = false) {
  const lines = [];
  lines.push('='.repeat(60));
  lines.push('  口腔健康解密卡 · AI预问诊系统 · 测试摘要报告');
  lines.push('='.repeat(60));
  lines.push(`  测试时间: ${new Date(timestamp).toLocaleString('zh-CN')}`);
  lines.push(`  总病例数: ${results.length}`);
  lines.push('='.repeat(60));
  lines.push('');
  
  lines.push(`紧急级别分布: 绿色 ${stats.byUrgency.green} | 黄色 ${stats.byUrgency.yellow} | 红色 ${stats.byUrgency.red}`);
  lines.push(`红色警告触发: ${stats.redFlagCount}/${results.length}`);
  lines.push(`类别分布: 牙体牙髓${stats.byCategory.tooth?.count||0} | 牙周${stats.byCategory.perio?.count||0} | 黏膜${stats.byCategory.mucosa?.count||0} | 关节${stats.byCategory.joint?.count||0} | 其他${stats.byCategory.other?.count||0} | 健康${stats.byCategory.none?.count||0}`);
  lines.push('');
  
  lines.push('—'.repeat(60));
  if (isGenerated && results.length > 100) {
    lines.push('注: 300份病例仅显示前30份摘要，完整结果参见Markdown/JSON报告');
    lines.push('—'.repeat(60));
  }
  const displayCount = Math.min(results.length, isGenerated ? 30 : results.length);
  lines.push(`| 编号 | 病例名称                    | 预期疾病         | 首诊结果         | 紧急度 |`);
  lines.push('—'.repeat(60));
  
  for (let i = 0; i < displayCount; i++) {
    const r = results[i];
    const topName = r.ranking.length > 0 ? r.ranking[0].name : '（无不明显风险）';
    const expectedName = r.patientCase.target ? (DISEASES[r.patientCase.target]?.name || r.patientCase.target) : '健康对照';
    const topUrgency = r.ranking.length > 0 ? r.ranking[0].urgency : 'green';
    const urg = topUrgency === 'red' ? '🔴红' : topUrgency === 'yellow' ? '🟡黄' : '🟢绿';
    lines.push(`| ${r.patientCase.id.padEnd(5)} | ${r.patientCase.name.padEnd(22)} | ${expectedName.padEnd(14)} | ${topName.padEnd(14)} | ${urg} |`);
  }
  
  lines.push('—'.repeat(60));
  lines.push('');
  lines.push(`报告文件: test-results/test-report-${timestamp}.md`);
  lines.push(`JSON数据: test-results/test-results-${timestamp}.json`);
  
  return lines.join('\n');
}

// ==================== 主函数 ====================
function main() {
  const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, 19);
  const useGenerated = process.argv.includes('--generated') || process.argv.includes('-g');
  const caseCount = parseInt(process.argv.find(a => a.startsWith('--count='))?.split('=')[1]) || 300;
  const label = useGenerated ? `${caseCount}份流行病学模拟病例` : '30份精选病例';

  console.log('='.repeat(60));
  console.log(`  口腔健康解密卡 · ${label}问卷测试`);
  console.log('='.repeat(60));
  console.log('');
  
  // 1. 加载引擎
  console.log('[1/4] 加载引擎...');
  loadEngine();
  console.log('');
  
  // 2. 准备测试病例
  let testCases;
  if (useGenerated) {
    console.log(`[2/4] 基于流行病学概率生成${caseCount}份模拟病例...`);
    const genStart = Date.now();
    testCases = generateCases(caseCount, 42); // 固定种子保证可复现
    
    // 后处理：加载引擎后修正病例名称为中文 + 修正类别
    testCases.forEach(c => {
      if (c._meta?.generated) {
        if (c.target && DISEASES[c.target]) {
          c.name = DISEASES[c.target].name + '病例';
          c.urgency = DISEASES[c.target].urgency || 'green';
          c.category = DISEASES[c.target].cat || 'other';
        } else if (c.activeDiseases.length === 0) {
          c.name = '健康对照病例';
          c.urgency = 'green';
          c.category = 'none';
        } else {
          // 取第一个有名称的疾病
          const firstNamed = c.activeDiseases.find(d => DISEASES[d]);
          if (firstNamed) {
            c.name = DISEASES[firstNamed].name + '病例';
            c.urgency = DISEASES[firstNamed].urgency || 'green';
            c.category = DISEASES[firstNamed].cat || 'other';
          }
        }
      }
    });
    
    const genStats = computeGenerationStats(testCases);
    console.log(`  生成耗时: ${Date.now() - genStart}ms`);
    console.log(`  年龄分布: 儿童${genStats.byAge.child} | 青少年${genStats.byAge.youth} | 青年${genStats.byAge.young} | 中年${genStats.byAge.middle} | 老年${genStats.byAge.senior} | 高龄${genStats.byAge.elderly}`);
    console.log(`  性别分布: 男${genStats.byGender.male} | 女${genStats.byGender.female}`);
    console.log(`  健康人数: ${genStats.healthyCount} (${(genStats.healthyCount / caseCount * 100).toFixed(1)}%)`);
    console.log(`  平均每人疾病数: ${(testCases.reduce((s, c) => s + c.activeDiseases.length, 0) / caseCount).toFixed(1)}`);
    
    // 打印疾病类别分布
    const catDist = {};
    testCases.forEach(c => { catDist[c.category] = (catDist[c.category] || 0) + 1; });
    const catParts = Object.entries(catDist).sort((a,b) => b[1]-a[1]).map(([k,v]) => {
      const label = CATEGORY_LABELS[k] || k;
      return `${label}${v}`;
    });
    console.log(`  类别分布: ${catParts.join(' | ')}`);
    console.log('');
  } else {
    const EXCLUDED_IDS = new Set([
      'P10', 'P16', 'P17', 'P18',
      'P31', 'P32', 'P35',
      'P37', 'P38', 'P39',
    ]);
    testCases = PATIENT_CASES.filter(c => !EXCLUDED_IDS.has(c.id));
    console.log(`[2/4] 使用${testCases.length}份精选模拟病例`);
    console.log('');
  }
  
  // 3. 运行测试
  console.log(`[3/4] 运行 ${testCases.length} 份病例测试...`);
  const results = [];
  const batchSize = 50;
  let lastProgressLog = 0;
  
  testCases.forEach((patientCase, idx) => {
    const result = runPatientCase(patientCase);
    results.push(result);
    
    // 批量日志（300例时每50例输出一次）
    if (testCases.length > 100) {
      const progress = Math.round((idx + 1) / testCases.length * 100);
      if (progress >= lastProgressLog + 10 || idx === testCases.length - 1) {
        console.log(`  进度: ${idx + 1}/${testCases.length} (${progress}%)`);
        lastProgressLog = progress;
      }
    } else {
      const topResult = result.ranking.length > 0 ? result.ranking[0] : null;
      if (topResult) {
        const urgencyIcon = topResult.urgency === 'red' ? '🔴' : topResult.urgency === 'yellow' ? '🟡' : '🟢';
        console.log(`  [${idx + 1}/${testCases.length}] ${patientCase.id} ${topResult.name} ${urgencyIcon} (${topResult.score.toFixed(1)})`);
      }
    }
  });
  console.log('');
  
  // 4. 统计分析
  console.log('[4/4] 统计分析...');
  const stats = computeStatistics(results);
  
  // 计算准确率
  let accurateCount = 0;
  let top3Count = 0;
  results.forEach(r => {
    const topIds = r.ranking.slice(0, 3).map(item => item.id);
    const target = r.patientCase.target;
    
    if (r.patientCase._meta?.generated) {
      // 生成病例：目标疾病在Top-3中即算命中（因为多疾病共存）
      if (r.patientCase.activeDiseases.length === 0) {
        // 健康病例：首诊得分 < 15 算准确
        if (r.ranking.length === 0 || r.ranking[0].score < 15) accurateCount++;
      } else if (target && topIds.includes(target)) {
        accurateCount++;
      } else if (r.patientCase.activeDiseases.some(d => topIds.includes(d))) {
        top3Count++;
      }
    } else {
      if (r.patientCase.target === 'multiple') {
        if (r.ranking.length >= 3) accurateCount++;
      } else if (r.patientCase.target === null) {
        if (r.ranking.length === 0 || r.ranking[0].score < 15) accurateCount++;
      } else if (topIds[0] === r.patientCase.target) {
        accurateCount++;
      }
    }
  });
  
  const accuracyRate = (accurateCount / testCases.length * 100).toFixed(1);
  console.log(`  总病例数: ${stats.totalPatients}`);
  console.log(`  红色警告: ${stats.redFlagCount}`);
  if (useGenerated) {
    console.log(`  首诊命中率: ${accurateCount}/${testCases.length} (${accuracyRate}%)`);
    console.log(`  Top-3命中率: ${accurateCount + top3Count}/${testCases.length} (${((accurateCount + top3Count) / testCases.length * 100).toFixed(1)}%)`);
  } else {
    console.log(`  首诊准确: ${accurateCount}/${stats.totalPatients} (${accuracyRate}%)`);
  }
  console.log('');
  
  console.log('生成报告...');
  const reportDir = CONFIG.outputDir;
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
  // 只输出JSON和简洁摘要，Markdown在大样本下占用过多内存
  const summaryPath = path.join(reportDir, `test-summary-${timestamp}.txt`);
  const summary = generateSummary(results, stats, timestamp, useGenerated);
  fs.writeFileSync(summaryPath, summary, 'utf-8');
  console.log(`[OK] 摘要报告: ${summaryPath}`);
  
  // JSON
  const jsonPath = path.join(reportDir, `test-results-${timestamp}.json`);
  const jsonData = results.map(r => ({
    patientId: r.patientCase.id,
    patientName: r.patientCase.name,
    profile: r.patientCase.profile,
    targetDisease: r.patientCase.target,
    expectedCategory: r.patientCase.category,
    expectedUrgency: r.patientCase.urgency,
    hasRedFlag: r.hasRedFlag,
    ageGate: r.ageGate,
    genderGate: r.genderGate,
    questionsAnswered: r.answeredQuestions.length,
    visitedNodes: r.visitedNodes,
    ranking: r.ranking,
    allScores: r.finalScores,
  }));
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log(`[OK] JSON报告: ${jsonPath}`);
  
  return { jsonPath, summaryPath };
  
  console.log('='.repeat(60));
  console.log(`  测试完成！${testCases.length}份模拟患者问卷`);
  console.log(`  首诊命中率: ${accuracyRate}%`);
  console.log(`  JSON: ${reportPaths.jsonPath}`);
  console.log(`  TXT:  ${reportPaths.summaryPath}`);
  console.log('='.repeat(60));
}

main();
