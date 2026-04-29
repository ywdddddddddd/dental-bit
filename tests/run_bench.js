/**
 * 高性能轻量测试基准 - 500例
 */
const { OralTriageEngine, DISEASES, QUESTION_TREE } = require('./engine_core.js');
const { generateCases } = require('./generate_cases.js');

const COUNT = 500;
console.log(`Generating ${COUNT} cases...`);
const cases = generateCases(COUNT, 42);
cases.forEach(c => {
  if (c.target && DISEASES[c.target]) {
    c.category = DISEASES[c.target].cat || 'other';
  }
});

console.log(`Running ${COUNT} tests...`);
const results = [];
cases.forEach((c, i) => {
  const e = new OralTriageEngine();
  e.init();
  let steps = 0;
  while (e.currentNode && steps < 50) {
    steps++;
    const qId = e.currentNode;
    const node = QUESTION_TREE[qId];
    if (!node) break;
    let bi = c.answers[qId];
    if (bi === undefined) bi = 0; // match original test runner behavior

    if (node.multiSelect) {
      const sel = Array.isArray(bi) ? bi : [bi];
      e.answeredCount++;
      e.visitedNodes.push(qId);
      const sq = [...e.universalQueue];
      sel.forEach(bIdx => {
        const branch = node.branches[bIdx];
        if (!branch) return;
        if (branch.delta) Object.entries(branch.delta).forEach(([k,v]) => { e.rawScores[k] = (e.rawScores[k]||0) + v; });
        if (branch.lock) branch.lock.forEach(d => e.lockedDiseases.add(d));
        if (branch.riskTag) Object.entries(branch.riskTag).forEach(([k,v]) => { e.riskAccum[k] = (e.riskAccum[k]||1) * v; });
        if (branch.protect && branch.riskTag) Object.entries(branch.riskTag).forEach(([k,v]) => { e.protectAccum[k] = (e.protectAccum[k]||1) * v; });
        if (branch.forceRed) e.hasRedFlag = true;
        if (branch.ageGate) e.userAge = branch.ageGate;
        if (branch.genderGate) e.userGender = branch.genderGate;
      });
      e.universalQueue = sq;
      if (e.universalQueue.length > 0) { e.currentNode = e.universalQueue.shift(); }
      else { e.currentNode = null; e.finalize(); }
    } else {
      e.answerBranch(bi);
    }
  }
  
  const ranking = e.ranking(8);
  results.push({
    t: c.target, cat: c.category, red: e.hasRedFlag,
    r1: ranking[0]?.id, r1n: ranking[0]?.name,
    scores: e.scores
  });
  
  if ((i+1) % 50 === 0 || i === COUNT - 1) {
    console.log(`  ${i+1}/${COUNT}`);
  }
});

// Stats
let hit = 0, top3 = 0, red = 0;
const bt = {};
results.forEach(r => {
  if (r.red) red++;
  const t = r.t;
  if (!t) return;
  if (!bt[t]) bt[t] = [0,0];
  bt[t][0]++;
  if (r.r1 === t) { hit++; bt[t][1]++; }
  if (results.some && false) {} // placeholder
});

// Recompute top3
results.forEach(r => {
  const t = r.t;
  if (!t) return;
  const rankIds = [r.r1];
  // Need full ranking for top3 - let's just use the scores
});

// Simple top3 approximation from scores
results.forEach((r, idx) => {
  const t = r.t;
  if (!t) return;
  const scores = r.scores;
  const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const top3Ids = sorted.slice(0,3).map(x=>x[0]);
  if (top3Ids.includes(t)) top3++;
});

console.log('\n' + '='.repeat(60));
console.log(`  v2.0 · ${COUNT}例 · 94种疾病`);
console.log('='.repeat(60));
console.log(`  首诊命中: ${hit}/${COUNT} = ${(hit/COUNT*100).toFixed(1)}%`);
console.log(`  Top-3覆盖: ${top3}/${COUNT} = ${(top3/COUNT*100).toFixed(1)}%`);
console.log(`  红色警告 : ${red}/${COUNT} = ${(red/COUNT*100).toFixed(1)}%`);

console.log('\n=== 各疾病准确率 ===');
const entries = Object.entries(bt).sort((a,b)=>b[1][0]-a[1][0]);
const zeroHits = [], fullHits = [];
entries.forEach(([d, [total, hits]]) => {
  const name = DISEASES[d]?.name || d;
  const pct = (hits/total*100).toFixed(0);
  const flag = hits === 0 ? ' ✗' : hits === total ? ' ✓' : '';
  console.log(`  ${name.padEnd(35)} ${String(hits).padStart(2)}/${String(total).padStart(2)} (${pct}%)${flag}`);
  if (hits === 0) zeroHits.push(name);
  if (hits === total) fullHits.push(name);
});

console.log(`\n  0%命中(${zeroHits.length}): ${zeroHits.join(', ')}`);
console.log(`  100%命中(${fullHits.length}): ${fullHits.join(', ')}`);
