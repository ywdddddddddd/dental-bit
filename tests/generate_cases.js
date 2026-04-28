/**
 * 300份模拟患者病例生成器
 * 基于流行病学概率分布，生成符合真实人口统计特征的病例
 */

const epi = require('./epidemiology.js');

// ==================== DAG路径模板 ====================
// 入口节点分支索引 → 专科路径 → 最终接全局问题
const ENTRY_PATHS = {
  // q_entry branch 0: 牙疼/冷热疼/咬东西疼 → q_pain_spontaneous
  pain: {
    entryBranch: 0,
    category: 'tooth',
    variants: {
      spontaneous_pulpitis: {
        desc: '牙疼路径-自发痛',
        path: { q_pain_spontaneous: 0, q_pain_cold_relief: 0 },
      },
      spontaneous_apical: {
        desc: '牙疼路径-自发痛→根尖',
        path: { q_pain_spontaneous: 0, q_pain_cold_relief: 1, q_pain_floating: 0 },
      },
      triggered_caries: {
        desc: '牙疼路径-刺激痛→甜食痛(浅龋)',
        path: { q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 0, q_pain_caries_depth: 0 },
      },
      triggered_deep_caries: {
        desc: '牙疼路径-刺激痛→甜食痛(深龋)',
        path: { q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 0, q_pain_caries_depth: 1 },
      },
      triggered_reversible: {
        desc: '牙疼路径-可复性牙髓炎',
        path: { q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 0, q_pain_caries_depth: 0 },
      },
      triggered_hot: {
        desc: '牙疼路径-刺激痛→持续→根尖',
        path: { q_pain_spontaneous: 1, q_pain_cold_hot_diff: 1, q_pain_cold_relief: 0 },
      },
      triggered_wedge: {
        desc: '牙疼路径-刷牙痛',
        path: { q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 1 },
      },
      triggered_crack: {
        desc: '牙疼路径-咬硬物痛',
        path: { q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 2, q_pain_lightning_duration: 1 },
      },
      triggered_floating: {
        desc: '牙疼路径-浮起感',
        path: { q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 3 },
      },
      trigeminal: {
        desc: '牙疼路径-闪电痛→三叉神经',
        path: { q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 2, q_pain_lightning_duration: 0, q_pain_xray_finding: 1 },
      },
    },
  },

  // q_entry branch 1: 牙龈出血/红肿/松动 → q_perio_necrosis_smell
  perio: {
    entryBranch: 1,
    category: 'perio',
    variants: {
      anug: {
        desc: '牙周路径-ANUG',
        path: { q_perio_necrosis_smell: 0 },
      },
      gingivitis: {
        desc: '牙周路径-牙龈炎',
        path: { q_perio_necrosis_smell: 1, q_perio_bleeding_type: 0, q_perio_location: 1, q_perio_mobility: 1 },
      },
      pericoronitis: {
        desc: '牙周路径-智齿冠周炎',
        path: { q_perio_necrosis_smell: 1, q_perio_bleeding_type: 0, q_perio_location: 0, q_perio_mobility: 1 },
      },
      periodontitis: {
        desc: '牙周路径-牙周炎',
        path: { q_perio_necrosis_smell: 1, q_perio_bleeding_type: 1, q_perio_mobility: 0, q_perio_age_rapid: 1 },
      },
      aggressive_perio: {
        desc: '牙周路径-侵袭性牙周炎',
        path: { q_perio_necrosis_smell: 1, q_perio_bleeding_type: 1, q_perio_mobility: 0, q_perio_age_rapid: 0 },
      },
      apical_abscess: {
        desc: '牙周路径-根尖脓肿（经牙周入口）',
        path: { q_perio_necrosis_smell: 1, q_perio_bleeding_type: 2, q_perio_mobility: 0 },
        // Note: perio_bleeding_type branch 2 routes to apical_periodontitis
      },
    },
  },

  // q_entry branch 2: 溃疡/白斑/糜烂 → q_mucosa_can_scrape
  mucosa: {
    entryBranch: 2,
    category: 'mucosa',
    variants: {
      candidiasis: {
        desc: '黏膜路径-念珠菌',
        path: { q_mucosa_can_scrape: 0 },
      },
      leukoplakia: {
        desc: '黏膜路径-白斑',
        path: { q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 0, q_mucosa_white_risk: 0 },
      },
      osf: {
        desc: '黏膜路径-OSF',
        path: { q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 0, q_mucosa_white_risk: 1 },
      },
      lichen: {
        desc: '黏膜路径-扁平苔藓',
        path: { q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 0, q_mucosa_white_risk: 2 },
      },
      oral_ulcer: {
        desc: '黏膜路径-复发性溃疡',
        path: {
          q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1,
          q_mucosa_ulcer_pattern: 4, q_mucosa_ulcer_duration: 0,
        },
      },
      herpes: {
        desc: '黏膜路径-疱疹',
        path: {
          q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1,
          q_mucosa_ulcer_pattern: 4, q_mucosa_ulcer_duration: 3,
        },
      },
      pemphigus: {
        desc: '黏膜路径-天疱疮',
        path: {
          q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1,
          q_mucosa_ulcer_pattern: 4, q_mucosa_ulcer_duration: 2,
        },
      },
      oral_cancer: {
        desc: '黏膜路径-口腔癌',
        path: {
          q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1,
          q_mucosa_ulcer_pattern: 4, q_mucosa_ulcer_duration: 1,
          q_mucosa_cancer_redflags: [0, 1, 2, 3],
        },
      },
      geographic_tongue: {
        desc: '黏膜路径-地图舌',
        path: { q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 2 },
      },
      angular_cheilitis: {
        desc: '黏膜路径-口角炎',
        path: { q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 3 },
      },
      behcet: {
        desc: '黏膜路径-白塞病',
        path: {
          q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1,
          q_mucosa_ulcer_pattern: 1,
        },
      },
      erythema: {
        desc: '黏膜路径-多形红斑',
        path: {
          q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1,
          q_mucosa_ulcer_pattern: 2,
        },
      },
      pemphigoid: {
        desc: '黏膜路径-类天疱疮',
        path: {
          q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1,
          q_mucosa_ulcer_pattern: 3,
        },
      },
      hfmd: {
        desc: '黏膜路径-手足口病',
        path: {
          q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1,
          q_mucosa_ulcer_pattern: 0,
        },
      },
    },
  },

  // q_entry branch 3: 黑洞/缺口/变色 → q_hard_acquired_or_dev
  hard_tissue: {
    entryBranch: 3,
    category: 'tooth',
    variants: {
      acquired_caries: {
        desc: '硬组织路径-后天龋',
        path: { q_hard_acquired_or_dev: 0, q_hard_defect_type: 0 },
      },
      acquired_wedge: {
        desc: '硬组织路径-楔状缺损',
        path: { q_hard_acquired_or_dev: 0, q_hard_defect_type: 1 },
      },
      acquired_erosion: {
        desc: '硬组织路径-酸蚀症',
        path: { q_hard_acquired_or_dev: 0, q_hard_defect_type: 2 },
      },
      acquired_trauma: {
        desc: '硬组织路径-外伤',
        path: { q_hard_acquired_or_dev: 0, q_hard_defect_type: 3, q_hard_trauma_type: 1 },
      },
      acquired_trauma_avulsed: {
        desc: '硬组织路径-外伤掉牙',
        path: { q_hard_acquired_or_dev: 0, q_hard_defect_type: 3, q_hard_trauma_type: 0 },
      },
      acquired_recurrent: {
        desc: '硬组织路径-继发龋',
        path: { q_hard_acquired_or_dev: 0, q_hard_defect_type: 4 },
      },
      acquired_root_caries: {
        desc: '硬组织路径-根面龋',
        path: { q_hard_acquired_or_dev: 0, q_hard_defect_type: 5 },
      },
      developmental_fluorosis: {
        desc: '硬组织路径-氟斑牙',
        path: { q_hard_acquired_or_dev: 1, q_hard_dev_color_or_shape: 0, q_hard_dev_color_detail: 0 },
      },
      developmental_tetracycline: {
        desc: '硬组织路径-四环素牙',
        path: { q_hard_acquired_or_dev: 1, q_hard_dev_color_or_shape: 0, q_hard_dev_color_detail: 1 },
      },
      developmental_hypoplasia: {
        desc: '硬组织路径-釉质发育不全',
        path: { q_hard_acquired_or_dev: 1, q_hard_dev_color_or_shape: 0, q_hard_dev_color_detail: 2 },
      },
      developmental_dens: {
        desc: '硬组织路径-畸形中央尖',
        path: { q_hard_acquired_or_dev: 1, q_hard_dev_color_or_shape: 1 },
      },
    },
  },

  // q_entry branch 4: 关节/脸肿 → q_jaw_recent_extraction
  jaw: {
    entryBranch: 4,
    category: 'joint',
    variants: {
      dry_socket: {
        desc: '颌面路径-干槽症',
        path: { q_jaw_recent_extraction: 0 },
      },
      tmd: {
        desc: '颌面路径-TMD',
        path: { q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 0, q_jaw_morning_stiff: 1 },
      },
      bruxism: {
        desc: '颌面路径-磨牙',
        path: { q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 0, q_jaw_morning_stiff: 0 },
      },
      swelling_sialolith: {
        desc: '颌面路径-涎石症',
        path: { q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 1, q_jaw_swelling_meal: 0 },
      },
      swelling_parotitis: {
        desc: '颌面路径-腮腺炎',
        path: { q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 1, q_jaw_swelling_meal: 1 },
      },
      mronj: {
        desc: '颌面路径-MRONJ',
        path: { q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 0 },
      },
    },
  },

  // q_entry branch 5: 口干/口臭/烧灼 → q_systemic_dry_or_burn
  systemic: {
    entryBranch: 5,
    category: 'other',
    variants: {
      xerostomia_meds: {
        desc: '系统路径-口干(药物)',
        path: { q_systemic_dry_or_burn: 0, q_systemic_dry_cause: 0 },
      },
      xerostomia_sjogren: {
        desc: '系统路径-口干(干燥综合征)',
        path: { q_systemic_dry_or_burn: 0, q_systemic_dry_cause: 1 },
      },
      xerostomia_radiation: {
        desc: '系统路径-口干(放疗)',
        path: { q_systemic_dry_or_burn: 0, q_systemic_dry_cause: 2 },
      },
      burning: {
        desc: '系统路径-灼口',
        path: { q_systemic_dry_or_burn: 1 },
      },
      halitosis: {
        desc: '系统路径-口臭',
        path: { q_systemic_dry_or_burn: 2 },
      },
    },
  },
};

// 主诉→入口路径映射
const PRIMARY_DISEASE_ENTRY = {
  // 牙体牙髓 - pain入口
  caries_shallow: 'pain:triggered_caries',
  caries_deep: 'pain:triggered_deep_caries',
  irreversible_pulpitis: 'pain:spontaneous_pulpitis',
  reversible_pulpitis: 'pain:triggered_reversible',
  apical_periodontitis: 'pain:triggered_floating',
  cracked_tooth: 'pain:triggered_crack',
  dentin_hypersensitivity: 'pain:triggered_wedge',
  pulp_necrosis: 'pain:spontaneous_apical',
  pulp_calcification: 'pain:trigeminal',

  // 牙体牙髓 - hard_tissue入口（形态学问题）
  wedge_defect: 'hard_tissue:acquired_wedge',
  dental_erosion: 'hard_tissue:acquired_erosion',
  residual_root: 'hard_tissue:acquired_caries',
  caries_recurrent: 'hard_tissue:acquired_recurrent',
  caries_rampant: 'hard_tissue:acquired_caries',
  root_resorption: 'hard_tissue:acquired_caries',
  dens_evaginatus: 'hard_tissue:developmental_dens',
  enamel_hypoplasia: 'hard_tissue:developmental_hypoplasia',
  vertical_root_fracture: 'pain:triggered_crack',
  tooth_wear_attrition: 'hard_tissue:acquired_erosion',
  internal_resorption: 'hard_tissue:acquired_caries',
  dentinogenesis_imperfecta: 'hard_tissue:developmental_hypoplasia',
  root_caries: 'hard_tissue:acquired_root_caries',

  // 牙体牙髓 - 颜色问题(developmental)
  fluorosis: 'hard_tissue:developmental_fluorosis',
  tetracycline_teeth: 'hard_tissue:developmental_tetracycline',

  // 牙周
  gingivitis: 'perio:gingivitis',
  periodontitis: 'perio:periodontitis',
  aggressive_periodontitis: 'perio:aggressive_perio',
  puberty_gingivitis: 'perio:gingivitis',
  pregnancy_gingivitis: 'perio:gingivitis',
  gingival_hyperplasia: 'perio:gingivitis',
  pericoronitis: 'perio:pericoronitis',
  anug: 'perio:anug',
  gingival_fibromatosis: 'perio:gingivitis',
  epulis: 'perio:gingivitis',
  acute_gingival_papillitis: 'perio:gingivitis',
  perio_endo_lesion: 'perio:periodontitis',
  furcation_involvement: 'perio:periodontitis',
  periodontal_abscess: 'perio:periodontitis',
  gingival_recession: 'perio:periodontitis',

  // 黏膜
  oral_ulcer: 'mucosa:oral_ulcer',
  herpes_stomatitis: 'mucosa:herpes',
  leukoplakia: 'mucosa:leukoplakia',
  oral_cancer: 'mucosa:oral_cancer',
  candidiasis: 'mucosa:candidiasis',
  geographic_tongue: 'mucosa:geographic_tongue',
  lichen_planus: 'mucosa:lichen',
  osf: 'mucosa:osf',
  burning_mouth: 'systemic:burning',
  angular_cheilitis: 'mucosa:angular_cheilitis',
  pemphigus: 'mucosa:pemphigus',
  behcet_disease: 'mucosa:behcet',
  erythema_multiforme: 'mucosa:erythema',
  hfmd: 'mucosa:hfmd',
  traumatic_ulcer: 'mucosa:oral_ulcer',
  allergic_stomatitis: 'mucosa:oral_ulcer',
  lupus_erythematosus_oral: 'mucosa:lichen',
  pemphigoid: 'mucosa:pemphigoid',
  radiation_stomatitis: 'mucosa:oral_ulcer', // 通过黏膜路径+全局放疗史加分
  oral_lymphoma: 'mucosa:oral_cancer',

  // 颌面关节
  tmd: 'jaw:tmd',
  bruxism: 'jaw:bruxism',
  trigeminal_neuralgia: 'pain:trigeminal',
  atypical_odontalgia: 'pain:trigeminal',
  trauma: 'hard_tissue:acquired_trauma',
  dry_socket: 'jaw:dry_socket',
  malocclusion: 'hard_tissue:developmental_hypoplasia',
  sialolithiasis: 'jaw:swelling_sialolith',
  parotitis: 'jaw:swelling_parotitis',
  sinusitis_odontogenic: 'pain:triggered_caries',
  osteomyelitis_jaw: 'pain:triggered_floating',
  mronj: 'jaw:mronj',
  garre_osteomyelitis: 'pain:triggered_floating',

  // 其他/系统
  halitosis: 'systemic:halitosis',
  xerostomia: 'systemic:xerostomia_sjogren',
};

// 全局问题答案配置（基于生活方式档案）
const LIFESTYLE_PROFILES = {
  poor: {
    desc: '不良口腔习惯',
    brush: 1, dental: 1, fluoride: 1,
    smoking: { p_smoke: 0.40, p_drink: 0.30, p_betel: 0.10, p_none: 0.20 },
    stress: { p_high: 0.50, p_clench: 0.25, p_calm: 0.25 },
    diet: { p_sweet: 0.50, p_sour: 0.20, p_hard: 0.15, p_balanced: 0.15 },
    medical: { p_diabetes: 0.10, p_hypertension: 0.15, p_autoimmune: 0.02, p_antiepileptic: 0.02, p_radiation: 0.005, p_bisphosphonate: 0.01 },
    family: { p_early_loss: 0.08, p_cancer: 0.04, p_malocclusion: 0.20 },
  },
  average: {
    desc: '一般口腔习惯',
    brush: 1, dental: 1, fluoride: 1,
    smoking: { p_smoke: 0.25, p_drink: 0.20, p_betel: 0.03, p_none: 0.52 },
    stress: { p_high: 0.35, p_clench: 0.20, p_calm: 0.45 },
    diet: { p_sweet: 0.40, p_sour: 0.20, p_hard: 0.15, p_balanced: 0.25 },
    medical: { p_diabetes: 0.08, p_hypertension: 0.12, p_autoimmune: 0.02, p_antiepileptic: 0.02, p_radiation: 0.003, p_bisphosphonate: 0.005 },
    family: { p_early_loss: 0.06, p_cancer: 0.03, p_malocclusion: 0.15 },
  },
  good: {
    desc: '良好口腔习惯',
    brush: 2, dental: 0, fluoride: 0,
    smoking: { p_smoke: 0.05, p_drink: 0.10, p_betel: 0.00, p_none: 0.85 },
    stress: { p_high: 0.15, p_clench: 0.10, p_calm: 0.75 },
    diet: { p_sweet: 0.15, p_sour: 0.08, p_hard: 0.05, p_balanced: 0.72 },
    medical: { p_diabetes: 0.03, p_hypertension: 0.05, p_autoimmune: 0.01, p_antiepileptic: 0.005, p_radiation: 0.001, p_bisphosphonate: 0.001 },
    family: { p_early_loss: 0.03, p_cancer: 0.02, p_malocclusion: 0.10 },
  },
};

/**
 * 加权随机选择
 */
function weightedChoice(choices) {
  const r = Math.random();
  let cumulative = 0;
  for (const [key, weight] of Object.entries(choices)) {
    cumulative += weight;
    if (r <= cumulative) return key;
  }
  return Object.keys(choices)[0];
}

/**
 * 生成多选问题的答案数组
 */
function generateMultiAnswer(probs, maxSelect = 1) {
  const selected = [];
  for (const [idx, prob] of Object.entries(probs)) {
    if (Math.random() < prob) {
      selected.push(parseInt(idx));
      if (selected.length >= maxSelect && maxSelect > 0) break;
    }
  }
  // 确保至少选一项
  if (selected.length === 0) {
    // 选"无"选项（通常是最后一个）
    selected.push(Object.keys(probs).length - 1);
  }
  return selected;
}

/**
 * 生成全局问题答案
 */
function generateUniversalAnswers(age, lifestyleProfile) {
  const profile = lifestyleProfile;
  const answers = {};

  // 年龄
  if (age <= 12) answers.q_universal_age = 0;
  else if (age <= 45) answers.q_universal_age = 1;
  else if (age <= 60) answers.q_universal_age = 2;
  else answers.q_universal_age = 3;

  // 刷牙习惯
  answers.q_universal_brush = profile.brush;

  // 看牙频率
  answers.q_universal_dental_visit = profile.dental;

  // 含氟牙膏
  answers.q_universal_fluoride = profile.fluoride;

  // 吸烟/喝酒/槟榔 (多选)
  const smokeChoices = {};
  if (profile.smoking.p_smoke > 0) smokeChoices[0] = profile.smoking.p_smoke;
  if (profile.smoking.p_drink > 0) smokeChoices[1] = profile.smoking.p_drink;
  if (profile.smoking.p_betel > 0) smokeChoices[2] = profile.smoking.p_betel;
  smokeChoices[3] = profile.smoking.p_none;
  answers.q_universal_smoking = generateMultiAnswer(smokeChoices, 2);

  // 压力
  const stressR = Math.random();
  if (stressR < profile.stress.p_high) answers.q_universal_stress = 0;
  else if (stressR < profile.stress.p_high + profile.stress.p_clench) answers.q_universal_stress = 1;
  else answers.q_universal_stress = 2;

  // 饮食 (多选)
  const dietChoices = {
    0: profile.diet.p_sweet,
    1: profile.diet.p_sour,
    2: profile.diet.p_hard,
    3: profile.diet.p_balanced,
  };
  answers.q_universal_diet = generateMultiAnswer(dietChoices, 2);

  // 全身病史 (多选)
  const medChoices = {
    0: profile.medical.p_diabetes,
    1: profile.medical.p_hypertension,
    2: profile.medical.p_autoimmune,
    3: profile.medical.p_antiepileptic,
    4: profile.medical.p_radiation,
    5: profile.medical.p_bisphosphonate,
    6: 1.0, // "以上都没有" always available
  };
  answers.q_universal_medical = generateMultiAnswer(medChoices, 2);

  // 家族史 (多选)
  const familyChoices = {
    0: profile.family.p_early_loss,
    1: profile.family.p_cancer,
    2: profile.family.p_malocclusion,
    3: 1.0,
  };
  answers.q_universal_family = generateMultiAnswer(familyChoices, 2);

  return answers;
}

/**
 * 根据疾病确定生活方式档案
 */
function getLifestyleProfile(age, diseases) {
  // 高风险行为相关的疾病 → 不良习惯档案
  const highRiskDiseases = new Set([
    'leukoplakia', 'oral_cancer', 'osf', 'periodontitis',
    'aggressive_periodontitis', 'anug', 'caries_rampant',
  ]);
  // 健康习惯 → 良好档案
  const healthyProfile = age > 0 && age < 50 && diseases.length === 0;

  for (const d of diseases) {
    if (highRiskDiseases.has(d)) return LIFESTYLE_PROFILES.poor;
  }

  if (healthyProfile) return LIFESTYLE_PROFILES.good;
  if (age > 50 && diseases.length > 1) return LIFESTYLE_PROFILES.poor;
  return LIFESTYLE_PROFILES.average;
}

/**
 * 主生成函数：生成单份病例
 */
function generateCase(index) {
  // 1. 抽样人口统计
  let age = epi.randomAge();
  let gender = epi.randomGender();
  const ageGroup = epi.getAgeGroup(age);

  // 2. 按患病率抽样疾病
  const activeDiseases = [];
  const diseaseIds = Object.keys(epi.PREVALENCE);
  for (const diseaseId of diseaseIds) {
    const prevalence = epi.getPrevalence(diseaseId, age, gender);
    if (Math.random() < prevalence) {
      activeDiseases.push(diseaseId);
    }
  }

  // 3. 按互斥组去重（一个互斥组只保留最高概率的疾病）
  // 注：这里简化为保持所有抽到的疾病，让引擎的互斥逻辑处理

  // 4. 确定主诉疾病（优先选临床意义更高的疾病）
  // 策略：先按紧急度排序（red > yellow > green），再按稀有度加分
  const DISEASE_URGENCY_MAP = {
    caries_shallow: 'green', caries_deep: 'yellow', dentin_hypersensitivity: 'green',
    wedge_defect: 'yellow', cracked_tooth: 'yellow', irreversible_pulpitis: 'red',
    apical_periodontitis: 'yellow', pulp_necrosis: 'yellow', residual_root: 'yellow',
    dental_erosion: 'green', caries_recurrent: 'yellow', caries_rampant: 'red',
    root_resorption: 'yellow', dens_evaginatus: 'yellow', enamel_hypoplasia: 'green',
    vertical_root_fracture: 'red', tooth_wear_attrition: 'green',
    pulp_calcification: 'green', internal_resorption: 'yellow',
    dentinogenesis_imperfecta: 'green', root_caries: 'yellow',
    reversible_pulpitis: 'yellow',
    gingivitis: 'green', periodontitis: 'yellow', aggressive_periodontitis: 'red',
    puberty_gingivitis: 'green', pregnancy_gingivitis: 'green',
    gingival_hyperplasia: 'green', pericoronitis: 'yellow',
    anug: 'red', gingival_fibromatosis: 'green', epulis: 'yellow',
    acute_gingival_papillitis: 'green', perio_endo_lesion: 'red',
    furcation_involvement: 'yellow', periodontal_abscess: 'red',
    gingival_recession: 'green',
    oral_ulcer: 'green', herpes_stomatitis: 'yellow', leukoplakia: 'red',
    oral_cancer: 'red', candidiasis: 'yellow', geographic_tongue: 'green',
    lichen_planus: 'yellow', osf: 'red', burning_mouth: 'green',
    angular_cheilitis: 'green', pemphigus: 'red',
    behcet_disease: 'red', erythema_multiforme: 'red', hfmd: 'yellow',
    traumatic_ulcer: 'green', allergic_stomatitis: 'yellow',
    lupus_erythematosus_oral: 'yellow', pemphigoid: 'red',
    radiation_stomatitis: 'red', oral_lymphoma: 'red',
    tmd: 'green', bruxism: 'yellow', trigeminal_neuralgia: 'yellow',
    atypical_odontalgia: 'yellow', trauma: 'red', dry_socket: 'red',
    malocclusion: 'green', sialolithiasis: 'yellow', parotitis: 'yellow',
    sinusitis_odontogenic: 'yellow', osteomyelitis_jaw: 'red',
    mronj: 'red', garre_osteomyelitis: 'yellow',
    halitosis: 'green', fluorosis: 'green', tetracycline_teeth: 'green',
    xerostomia: 'yellow',
  };
  
  const URGENCY_SCORES = { red: 100, yellow: 30, green: 1 };
  let primaryDisease = activeDiseases.length > 0 ? activeDiseases[0] : null;
  let bestScore = -1;
  
  for (const d of activeDiseases) {
    const urgency = DISEASE_URGENCY_MAP[d] || 'green';
    let score = URGENCY_SCORES[urgency] || 1;
    
    // 稀有/严重疾病加分（鼓励作为主诉）
    const rareDiseases = new Set([
      'oral_cancer', 'leukoplakia', 'osf', 'pemphigus', 'pemphigoid',
      'behcet_disease', 'erythema_multiforme', 'oral_lymphoma',
      'anug', 'aggressive_periodontitis', 'osteomyelitis_jaw', 'mronj',
      'trigeminal_neuralgia', 'dry_socket', 'trauma',
    ]);
    if (rareDiseases.has(d)) score += 200;
    
    // 有明确症状的疾病加分
    const symptomaticDiseases = new Set([
      'irreversible_pulpitis', 'apical_periodontitis', 'cracked_tooth',
      'periodontal_abscess', 'perio_endo_lesion', 'pericoronitis',
      'herpes_stomatitis', 'hfmd', 'radiation_stomatitis',
      'sialolithiasis', 'parotitis', 'sinusitis_odontogenic',
    ]);
    if (symptomaticDiseases.has(d)) score += 50;
    
    if (score > bestScore) {
      bestScore = score;
      primaryDisease = d;
    }
  }

  // 5. 如果没有疾病，生成健康病例
  const isHealthy = activeDiseases.length === 0;

  // 6. 确定入口路径
  let entryPathKey = primaryDisease ? PRIMARY_DISEASE_ENTRY[primaryDisease] : null;
  if (!entryPathKey) {
    // 默认入口（基于年龄的常见问题）
    if (age <= 12) entryPathKey = 'hard_tissue:acquired_caries';
    else if (age <= 35) entryPathKey = 'pain:triggered_caries';
    else if (age <= 55) entryPathKey = 'perio:periodontitis';
    else entryPathKey = 'perio:periodontitis';
  }

  const [entryCategory, variantKey] = entryPathKey.split(':');
  const entryDef = ENTRY_PATHS[entryCategory];
  const variant = entryDef.variants[variantKey];

  // 7. 构建答案映射
  const answers = {};
  answers.q_entry = entryDef.entryBranch;
  if (variant && variant.path) {
    Object.assign(answers, variant.path);
  }

  // 8. 性别
  answers.q_universal_gender = gender === '男' ? 1 : 0;

  // 9. 全局问题
  const lifestyle = getLifestyleProfile(age, activeDiseases);
  const universalAnswers = generateUniversalAnswers(age, lifestyle);
  Object.assign(answers, universalAnswers);

  // 10. 构建病例对象
  const diseaseLabel = primaryDisease || '健康';
  const category = isHealthy ? 'none' : (entryDef.category || 'other');

  return {
    id: `G${String(index + 1).padStart(3, '0')}`,
    name: `${isHealthy ? '健康对照' : (primaryDisease || '未分类')}病例`,
    profile: {
      ageGroup: `${age}岁`,
      gender,
      desc: generateDescription(age, gender, activeDiseases, lifestyle),
    },
    target: primaryDisease,
    category,
    urgency: 'green', // 由引擎确定
    activeDiseases,
    answers,
    _meta: {
      age,
      ageGroup,
      genderKey: epi.getGenderKey(gender),
      entryPath: entryPathKey,
      lifestyle: lifestyle.desc,
      diseaseCount: activeDiseases.length,
      generated: true,
    },
  };
}

/**
 * 生成自然语言病例描述
 */
function generateDescription(age, gender, diseases, lifestyle) {
  if (diseases.length === 0) {
    return `${age}岁${gender}性，常规口腔检查，无特殊主诉，口腔卫生习惯良好。`;
  }

  const parts = [];
  parts.push(`${age}岁${gender}性`);

  // 生活习惯
  if (lifestyle.desc === '不良口腔习惯') {
    parts.push('口腔卫生习惯欠佳');
  }

  // 主诉
  const painDiseases = diseases.filter(d => ['caries_deep', 'caries_shallow', 'irreversible_pulpitis',
    'reversible_pulpitis', 'apical_periodontitis', 'cracked_tooth', 'dentin_hypersensitivity'].includes(d));
  const perioDiseases = diseases.filter(d => ['gingivitis', 'periodontitis', 'aggressive_periodontitis',
    'gingival_recession', 'pericoronitis', 'anug'].includes(d));
  const mucosaDiseases = diseases.filter(d => ['oral_ulcer', 'leukoplakia', 'oral_cancer', 'osf',
    'lichen_planus', 'candidiasis', 'herpes_stomatitis'].includes(d));

  if (painDiseases.length > 0) {
    parts.push('主诉牙齿疼痛/敏感');
  } else if (perioDiseases.length > 0) {
    parts.push('主诉牙龈出血/红肿/牙齿松动');
  } else if (mucosaDiseases.length > 0) {
    parts.push('主诉口腔溃疡/白斑/糜烂');
  } else {
    parts.push('主诉口腔不适');
  }

  parts.push(`共${diseases.length}种潜在口腔问题`);
  return parts.join('，') + '。';
}

/**
 * 批量生成N份病例
 */
function generateCases(count = 300, seed = 42) {
  // 简单伪随机种子
  const seededRandom = (function(s) {
    return function() {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  })(seed);

  // 暂存真实Math.random
  const origRandom = Math.random;
  Math.random = seededRandom;

  const cases = [];
  for (let i = 0; i < count; i++) {
    cases.push(generateCase(i));
  }

  // 恢复
  Math.random = origRandom;
  return cases;
}

// 统计生成病例的分布
function computeGenerationStats(cases) {
  const stats = {
    total: cases.length,
    byAge: { child: 0, youth: 0, young: 0, middle: 0, senior: 0, elderly: 0 },
    byGender: { male: 0, female: 0 },
    byCategory: {},
    byUrgency: { green: 0, yellow: 0, red: 0 },
    byDiseaseCount: {},
    topDiseases: {},
    healthyCount: 0,
  };

  for (const c of cases) {
    const ag = epi.getAgeGroup(c._meta.age);
    stats.byAge[ag] = (stats.byAge[ag] || 0) + 1;
    stats.byGender[c._meta.genderKey] = (stats.byGender[c._meta.genderKey] || 0) + 1;

    if (c.activeDiseases.length === 0) {
      stats.healthyCount++;
    } else {
      const count = c.activeDiseases.length;
      stats.byDiseaseCount[count] = (stats.byDiseaseCount[count] || 0) + 1;

      for (const d of c.activeDiseases) {
        stats.topDiseases[d] = (stats.topDiseases[d] || 0) + 1;
      }
    }

    const cat = c.category || 'none';
    stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
    stats.byUrgency[c.urgency] = (stats.byUrgency[c.urgency] || 0) + 1;
  }

  return stats;
}

module.exports = { ENTRY_PATHS, PRIMARY_DISEASE_ENTRY, LIFESTYLE_PROFILES, generateCases, computeGenerationStats };
