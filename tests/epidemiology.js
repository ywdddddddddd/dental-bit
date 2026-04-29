/**
 * 口腔疾病流行病学概率表
 * 数据来源：
 *   1. 第四次全国口腔健康流行病学调查 (2015-2016, 国家卫健委)
 *   2. WHO Global Oral Health Status Report (2022)
 *   3. Peres MA et al. Lancet 2019;394:249-260
 *   4. 张志愿. 口腔颌面外科学 第8版
 *   5. 樊明文. 牙体牙髓病学 第5版
 *   6. 孟焕新. 牙周病学 第5版
 *   7. Scully C. Oral and Maxillofacial Medicine 3rd ed.
 *   8. Neville BW. Oral and Maxillofacial Pathology 4th ed.
 */

// 年龄分层定义
const AGE_GROUPS = {
  child:   { label: '儿童 (0-12岁)',   range: [0, 12],   weight: 0.15 },
  youth:   { label: '青少年 (13-17岁)', range: [13, 17],  weight: 0.08 },
  young:   { label: '青年 (18-35岁)',   range: [18, 35],  weight: 0.27 },
  middle:  { label: '中年 (36-55岁)',   range: [36, 55],  weight: 0.28 },
  senior:  { label: '老年 (56-74岁)',   range: [56, 74],  weight: 0.15 },
  elderly: { label: '高龄 (75-99岁)',   range: [75, 99],  weight: 0.07 },
};

// 性别分布 (population-based, slight female majority in older ages)
const GENDER_DIST = { male: 0.495, female: 0.505 };

/**
 * 疾病患病率 (按年龄+性别分层)
 * prevalence[ageGroup][gender] = 概率 (0-1)
 * 未指定性别则两性相同
 */
const PREVALENCE = {
  // ==================== 牙体牙髓 ====================
  caries_shallow: {
    child:  { male: 0.68, female: 0.72 },
    youth:  { male: 0.32, female: 0.37 },
    young:  { male: 0.40, female: 0.35 },
    middle: { male: 0.30, female: 0.25 },
    senior: { male: 0.20, female: 0.18 },
    elderly:{ male: 0.15, female: 0.12 },
  },
  caries_deep: {
    child:  { male: 0.15, female: 0.18 },
    youth:  { male: 0.12, female: 0.14 },
    young:  { male: 0.18, female: 0.15 },
    middle: { male: 0.20, female: 0.22 },
    senior: { male: 0.15, female: 0.17 },
    elderly:{ male: 0.10, female: 0.12 },
  },
  dentin_hypersensitivity: {
    child:  { male: 0.02, female: 0.02 },
    youth:  { male: 0.08, female: 0.10 },
    young:  { male: 0.15, female: 0.20 },
    middle: { male: 0.25, female: 0.30 },
    senior: { male: 0.35, female: 0.40 },
    elderly:{ male: 0.40, female: 0.45 },
  },
  wedge_defect: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.05, female: 0.06 },
    middle: { male: 0.15, female: 0.18 },
    senior: { male: 0.25, female: 0.28 },
    elderly:{ male: 0.30, female: 0.32 },
  },
  cracked_tooth: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.03, female: 0.02 },
    middle: { male: 0.08, female: 0.06 },
    senior: { male: 0.12, female: 0.10 },
    elderly:{ male: 0.10, female: 0.08 },
  },
  irreversible_pulpitis: {
    child:  { male: 0.02, female: 0.02 },
    youth:  { male: 0.03, female: 0.03 },
    young:  { male: 0.05, female: 0.06 },
    middle: { male: 0.08, female: 0.07 },
    senior: { male: 0.06, female: 0.05 },
    elderly:{ male: 0.04, female: 0.03 },
  },
  reversible_pulpitis: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.02, female: 0.02 },
    young:  { male: 0.04, female: 0.05 },
    middle: { male: 0.06, female: 0.05 },
    senior: { male: 0.04, female: 0.04 },
    elderly:{ male: 0.02, female: 0.02 },
  },
  apical_periodontitis: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.02, female: 0.02 },
    young:  { male: 0.05, female: 0.06 },
    middle: { male: 0.08, female: 0.07 },
    senior: { male: 0.10, female: 0.09 },
    elderly:{ male: 0.08, female: 0.07 },
  },
  pulp_necrosis: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.02, female: 0.02 },
    middle: { male: 0.04, female: 0.03 },
    senior: { male: 0.06, female: 0.05 },
    elderly:{ male: 0.08, female: 0.06 },
  },
  residual_root: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.02, female: 0.02 },
    middle: { male: 0.05, female: 0.04 },
    senior: { male: 0.10, female: 0.12 },
    elderly:{ male: 0.18, female: 0.20 },
  },
  dental_erosion: {
    child:  { male: 0.03, female: 0.02 },
    youth:  { male: 0.10, female: 0.08 },
    young:  { male: 0.18, female: 0.12 },
    middle: { male: 0.15, female: 0.10 },
    senior: { male: 0.10, female: 0.06 },
    elderly:{ male: 0.05, female: 0.03 },
  },
  caries_recurrent: {
    child:  { male: 0.02, female: 0.02 },
    youth:  { male: 0.05, female: 0.05 },
    young:  { male: 0.10, female: 0.12 },
    middle: { male: 0.15, female: 0.18 },
    senior: { male: 0.18, female: 0.20 },
    elderly:{ male: 0.15, female: 0.17 },
  },
  caries_rampant: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.00, female: 0.00 },
    young:  { male: 0.01, female: 0.01 },
    middle: { male: 0.02, female: 0.02 },
    senior: { male: 0.03, female: 0.03 },
    elderly:{ male: 0.05, female: 0.06 },
  },
  root_resorption: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.02, female: 0.02 },
    young:  { male: 0.03, female: 0.03 },
    middle: { male: 0.04, female: 0.04 },
    senior: { male: 0.03, female: 0.03 },
    elderly:{ male: 0.02, female: 0.02 },
  },
  dens_evaginatus: {
    child:  { male: 0.02, female: 0.02 },
    youth:  { male: 0.03, female: 0.03 },
    young:  { male: 0.01, female: 0.01 },
    middle: { male: 0.00, female: 0.00 },
    senior: { male: 0.00, female: 0.00 },
    elderly:{ male: 0.00, female: 0.00 },
  },
  enamel_hypoplasia: {
    child:  { male: 0.08, female: 0.08 },
    youth:  { male: 0.08, female: 0.08 },
    young:  { male: 0.08, female: 0.08 },
    middle: { male: 0.08, female: 0.08 },
    senior: { male: 0.08, female: 0.08 },
    elderly:{ male: 0.08, female: 0.08 },
  },
  vertical_root_fracture: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.00, female: 0.00 },
    young:  { male: 0.01, female: 0.01 },
    middle: { male: 0.03, female: 0.03 },
    senior: { male: 0.05, female: 0.05 },
    elderly:{ male: 0.05, female: 0.05 },
  },
  tooth_wear_attrition: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.03, female: 0.03 },
    young:  { male: 0.08, female: 0.06 },
    middle: { male: 0.20, female: 0.15 },
    senior: { male: 0.35, female: 0.30 },
    elderly:{ male: 0.50, female: 0.45 },
  },
  pulp_calcification: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.02, female: 0.02 },
    middle: { male: 0.05, female: 0.05 },
    senior: { male: 0.08, female: 0.08 },
    elderly:{ male: 0.10, female: 0.10 },
  },
  internal_resorption: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.00, female: 0.00 },
    young:  { male: 0.01, female: 0.01 },
    middle: { male: 0.01, female: 0.01 },
    senior: { male: 0.01, female: 0.01 },
    elderly:{ male: 0.01, female: 0.01 },
  },
  dentinogenesis_imperfecta: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.01, female: 0.01 },
    middle: { male: 0.01, female: 0.01 },
    senior: { male: 0.01, female: 0.01 },
    elderly:{ male: 0.01, female: 0.01 },
  },
  root_caries: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.00, female: 0.00 },
    young:  { male: 0.01, female: 0.01 },
    middle: { male: 0.08, female: 0.10 },
    senior: { male: 0.25, female: 0.30 },
    elderly:{ male: 0.40, female: 0.45 },
  },

  // ==================== 牙周 ====================
  gingivitis: {
    child:  { male: 0.30, female: 0.35 },
    youth:  { male: 0.55, female: 0.60 },
    young:  { male: 0.65, female: 0.70 },
    middle: { male: 0.70, female: 0.75 },
    senior: { male: 0.60, female: 0.65 },
    elderly:{ male: 0.50, female: 0.55 },
  },
  periodontitis: {
    child:  { male: 0.02, female: 0.02 },
    youth:  { male: 0.05, female: 0.05 },
    young:  { male: 0.20, female: 0.18 },
    middle: { male: 0.45, female: 0.40 },
    senior: { male: 0.55, female: 0.50 },
    elderly:{ male: 0.60, female: 0.55 },
  },
  aggressive_periodontitis: {
    child:  { male: 0.002, female: 0.003 },
    youth:  { male: 0.005, female: 0.008 },
    young:  { male: 0.008, female: 0.010 },
    middle: { male: 0.003, female: 0.005 },
    senior: { male: 0.001, female: 0.001 },
    elderly:{ male: 0.001, female: 0.001 },
  },
  puberty_gingivitis: {
    child:  { male: 0.02, female: 0.03 },
    youth:  { male: 0.10, female: 0.12 },
    young:  { male: 0.02, female: 0.03 },
    middle: { male: 0.00, female: 0.00 },
    senior: { male: 0.00, female: 0.00 },
    elderly:{ male: 0.00, female: 0.00 },
  },
  pregnancy_gingivitis: {
    // Only applicable to females of childbearing age
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.00, female: 0.00 },
    young:  { male: 0.00, female: 0.08 },
    middle: { male: 0.00, female: 0.03 },
    senior: { male: 0.00, female: 0.00 },
    elderly:{ male: 0.00, female: 0.00 },
  },
  gingival_hyperplasia: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.02, female: 0.02 },
    young:  { male: 0.03, female: 0.04 },
    middle: { male: 0.08, female: 0.10 },
    senior: { male: 0.12, female: 0.15 },
    elderly:{ male: 0.15, female: 0.18 },
  },
  pericoronitis: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.05, female: 0.05 },
    young:  { male: 0.10, female: 0.10 },
    middle: { male: 0.03, female: 0.03 },
    senior: { male: 0.01, female: 0.01 },
    elderly:{ male: 0.00, female: 0.00 },
  },
  anug: {
    child:  { male: 0.001, female: 0.001 },
    youth:  { male: 0.003, female: 0.002 },
    young:  { male: 0.005, female: 0.003 },
    middle: { male: 0.002, female: 0.001 },
    senior: { male: 0.001, female: 0.001 },
    elderly:{ male: 0.001, female: 0.001 },
  },
  gingival_fibromatosis: {
    child:  { male: 0.001, female: 0.001 },
    youth:  { male: 0.001, female: 0.001 },
    young:  { male: 0.001, female: 0.001 },
    middle: { male: 0.001, female: 0.001 },
    senior: { male: 0.001, female: 0.001 },
    elderly:{ male: 0.001, female: 0.001 },
  },
  epulis: {
    child:  { male: 0.001, female: 0.002 },
    youth:  { male: 0.001, female: 0.003 },
    young:  { male: 0.002, female: 0.005 },
    middle: { male: 0.003, female: 0.008 },
    senior: { male: 0.002, female: 0.005 },
    elderly:{ male: 0.001, female: 0.003 },
  },
  acute_gingival_papillitis: {
    child:  { male: 0.03, female: 0.03 },
    youth:  { male: 0.05, female: 0.05 },
    young:  { male: 0.08, female: 0.08 },
    middle: { male: 0.10, female: 0.10 },
    senior: { male: 0.10, female: 0.10 },
    elderly:{ male: 0.08, female: 0.08 },
  },
  perio_endo_lesion: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.02, female: 0.02 },
    middle: { male: 0.05, female: 0.04 },
    senior: { male: 0.08, female: 0.07 },
    elderly:{ male: 0.08, female: 0.07 },
  },
  furcation_involvement: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.03, female: 0.02 },
    middle: { male: 0.12, female: 0.10 },
    senior: { male: 0.20, female: 0.18 },
    elderly:{ male: 0.25, female: 0.22 },
  },
  periodontal_abscess: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.03, female: 0.02 },
    middle: { male: 0.06, female: 0.05 },
    senior: { male: 0.08, female: 0.07 },
    elderly:{ male: 0.06, female: 0.05 },
  },
  gingival_recession: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.03, female: 0.03 },
    young:  { male: 0.10, female: 0.12 },
    middle: { male: 0.40, female: 0.45 },
    senior: { male: 0.60, female: 0.65 },
    elderly:{ male: 0.75, female: 0.80 },
  },

  // ==================== 黏膜 ====================
  oral_ulcer: {
    child:  { male: 0.08, female: 0.10 },
    youth:  { male: 0.15, female: 0.20 },
    young:  { male: 0.18, female: 0.25 },
    middle: { male: 0.15, female: 0.22 },
    senior: { male: 0.10, female: 0.15 },
    elderly:{ male: 0.08, female: 0.10 },
  },
  herpes_stomatitis: {
    child:  { male: 0.03, female: 0.03 },
    youth:  { male: 0.02, female: 0.02 },
    young:  { male: 0.02, female: 0.02 },
    middle: { male: 0.01, female: 0.01 },
    senior: { male: 0.01, female: 0.01 },
    elderly:{ male: 0.01, female: 0.01 },
  },
  leukoplakia: {
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.001, female: 0.001 },
    young:  { male: 0.005, female: 0.003 },
    middle: { male: 0.025, female: 0.010 },
    senior: { male: 0.040, female: 0.020 },
    elderly:{ male: 0.050, female: 0.025 },
  },
  oral_cancer: {
    child:  { male: 0.0000, female: 0.0000 },
    youth:  { male: 0.0001, female: 0.0001 },
    young:  { male: 0.0002, female: 0.0001 },
    middle: { male: 0.0010, female: 0.0005 },
    senior: { male: 0.0020, female: 0.0010 },
    elderly:{ male: 0.0030, female: 0.0015 },
  },
  candidiasis: {
    child:  { male: 0.02, female: 0.02 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.02, female: 0.02 },
    middle: { male: 0.05, female: 0.05 },
    senior: { male: 0.10, female: 0.10 },
    elderly:{ male: 0.15, female: 0.15 },
  },
  geographic_tongue: {
    child:  { male: 0.02, female: 0.02 },
    youth:  { male: 0.02, female: 0.03 },
    young:  { male: 0.02, female: 0.03 },
    middle: { male: 0.02, female: 0.03 },
    senior: { male: 0.02, female: 0.02 },
    elderly:{ male: 0.01, female: 0.02 },
  },
  lichen_planus: {
    child:  { male: 0.001, female: 0.001 },
    youth:  { male: 0.002, female: 0.003 },
    young:  { male: 0.005, female: 0.010 },
    middle: { male: 0.008, female: 0.020 },
    senior: { male: 0.010, female: 0.025 },
    elderly:{ male: 0.008, female: 0.020 },
  },
  osf: {
    // Highly dependent on betel nut chewing habit; concentrated in certain regions
    child:  { male: 0.000, female: 0.000 },
    youth:  { male: 0.001, female: 0.000 },
    young:  { male: 0.005, female: 0.001 },
    middle: { male: 0.010, female: 0.002 },
    senior: { male: 0.015, female: 0.003 },
    elderly:{ male: 0.010, female: 0.002 },
  },
  burning_mouth: {
    child:  { male: 0.000, female: 0.000 },
    youth:  { male: 0.001, female: 0.002 },
    young:  { male: 0.002, female: 0.005 },
    middle: { male: 0.005, female: 0.020 },
    senior: { male: 0.010, female: 0.030 },
    elderly:{ male: 0.010, female: 0.025 },
  },
  angular_cheilitis: {
    child:  { male: 0.05, female: 0.05 },
    youth:  { male: 0.03, female: 0.03 },
    young:  { male: 0.03, female: 0.04 },
    middle: { male: 0.05, female: 0.06 },
    senior: { male: 0.08, female: 0.10 },
    elderly:{ male: 0.12, female: 0.15 },
  },
  pemphigus: {
    child:  { male: 0.0001, female: 0.0001 },
    youth:  { male: 0.0001, female: 0.0001 },
    young:  { male: 0.0002, female: 0.0003 },
    middle: { male: 0.0003, female: 0.0005 },
    senior: { male: 0.0003, female: 0.0005 },
    elderly:{ male: 0.0002, female: 0.0003 },
  },
  behcet_disease: {
    // Higher in East Asian populations
    child:  { male: 0.0001, female: 0.0001 },
    youth:  { male: 0.0002, female: 0.0003 },
    young:  { male: 0.0005, female: 0.0005 },
    middle: { male: 0.0004, female: 0.0004 },
    senior: { male: 0.0002, female: 0.0002 },
    elderly:{ male: 0.0001, female: 0.0001 },
  },
  erythema_multiforme: {
    child:  { male: 0.0001, female: 0.0001 },
    youth:  { male: 0.0002, female: 0.0002 },
    young:  { male: 0.0003, female: 0.0003 },
    middle: { male: 0.0002, female: 0.0002 },
    senior: { male: 0.0001, female: 0.0001 },
    elderly:{ male: 0.0001, female: 0.0001 },
  },
  hfmd: {
    child:  { male: 0.05, female: 0.05 },
    youth:  { male: 0.01, female: 0.01 },
    young:  { male: 0.001, female: 0.001 },
    middle: { male: 0.000, female: 0.000 },
    senior: { male: 0.000, female: 0.000 },
    elderly:{ male: 0.000, female: 0.000 },
  },
  traumatic_ulcer: {
    child:  { male: 0.08, female: 0.08 },
    youth:  { male: 0.10, female: 0.10 },
    young:  { male: 0.10, female: 0.10 },
    middle: { male: 0.08, female: 0.08 },
    senior: { male: 0.05, female: 0.05 },
    elderly:{ male: 0.05, female: 0.05 },
  },
  allergic_stomatitis: {
    child:  { male: 0.02, female: 0.02 },
    youth:  { male: 0.02, female: 0.03 },
    young:  { male: 0.02, female: 0.03 },
    middle: { male: 0.02, female: 0.03 },
    senior: { male: 0.01, female: 0.02 },
    elderly:{ male: 0.01, female: 0.02 },
  },
  lupus_erythematosus_oral: {
    child:  { male: 0.000, female: 0.001 },
    youth:  { male: 0.000, female: 0.002 },
    young:  { male: 0.001, female: 0.005 },
    middle: { male: 0.001, female: 0.008 },
    senior: { male: 0.001, female: 0.005 },
    elderly:{ male: 0.001, female: 0.003 },
  },
  pemphigoid: {
    child:  { male: 0.0000, female: 0.0000 },
    youth:  { male: 0.0001, female: 0.0001 },
    young:  { male: 0.0001, female: 0.0002 },
    middle: { male: 0.0002, female: 0.0005 },
    senior: { male: 0.0003, female: 0.0010 },
    elderly:{ male: 0.0005, female: 0.0015 },
  },
  radiation_stomatitis: {
    // Only in patients undergoing head/neck radiotherapy
    child:  { male: 0.000, female: 0.000 },
    youth:  { male: 0.001, female: 0.001 },
    young:  { male: 0.002, female: 0.002 },
    middle: { male: 0.005, female: 0.004 },
    senior: { male: 0.008, female: 0.006 },
    elderly:{ male: 0.010, female: 0.008 },
  },
  oral_lymphoma: {
    child:  { male: 0.0000, female: 0.0000 },
    youth:  { male: 0.0000, female: 0.0000 },
    young:  { male: 0.0001, female: 0.0001 },
    middle: { male: 0.0002, female: 0.0002 },
    senior: { male: 0.0003, female: 0.0003 },
    elderly:{ male: 0.0004, female: 0.0004 },
  },

  // ==================== 颌面关节 ====================
  tmd: {
    child:  { male: 0.05, female: 0.06 },
    youth:  { male: 0.10, female: 0.15 },
    young:  { male: 0.12, female: 0.20 },
    middle: { male: 0.10, female: 0.15 },
    senior: { male: 0.08, female: 0.10 },
    elderly:{ male: 0.05, female: 0.08 },
  },
  bruxism: {
    child:  { male: 0.08, female: 0.08 },
    youth:  { male: 0.12, female: 0.12 },
    young:  { male: 0.15, female: 0.15 },
    middle: { male: 0.12, female: 0.12 },
    senior: { male: 0.08, female: 0.08 },
    elderly:{ male: 0.05, female: 0.05 },
  },
  trigeminal_neuralgia: {
    child:  { male: 0.0000, female: 0.0000 },
    youth:  { male: 0.0001, female: 0.0001 },
    young:  { male: 0.0002, female: 0.0003 },
    middle: { male: 0.0005, female: 0.0008 },
    senior: { male: 0.0010, female: 0.0015 },
    elderly:{ male: 0.0015, female: 0.0020 },
  },
  atypical_odontalgia: {
    child:  { male: 0.000, female: 0.000 },
    youth:  { male: 0.001, female: 0.002 },
    young:  { male: 0.003, female: 0.005 },
    middle: { male: 0.005, female: 0.008 },
    senior: { male: 0.005, female: 0.008 },
    elderly:{ male: 0.003, female: 0.005 },
  },
  trauma: {
    child:  { male: 0.18, female: 0.12 },
    youth:  { male: 0.15, female: 0.10 },
    young:  { male: 0.08, female: 0.05 },
    middle: { male: 0.03, female: 0.02 },
    senior: { male: 0.02, female: 0.02 },
    elderly:{ male: 0.03, female: 0.03 },
  },
  dry_socket: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.02, female: 0.02 },
    young:  { male: 0.03, female: 0.04 },
    middle: { male: 0.03, female: 0.04 },
    senior: { male: 0.02, female: 0.03 },
    elderly:{ male: 0.02, female: 0.02 },
  },
  malocclusion: {
    child:  { male: 0.55, female: 0.55 },
    youth:  { male: 0.50, female: 0.50 },
    young:  { male: 0.40, female: 0.40 },
    middle: { male: 0.30, female: 0.30 },
    senior: { male: 0.25, female: 0.25 },
    elderly:{ male: 0.20, female: 0.20 },
  },
  sialolithiasis: {
    child:  { male: 0.001, female: 0.001 },
    youth:  { male: 0.002, female: 0.002 },
    young:  { male: 0.005, female: 0.004 },
    middle: { male: 0.008, female: 0.006 },
    senior: { male: 0.010, female: 0.008 },
    elderly:{ male: 0.012, female: 0.010 },
  },
  parotitis: {
    child:  { male: 0.02, female: 0.02 },
    youth:  { male: 0.02, female: 0.02 },
    young:  { male: 0.01, female: 0.01 },
    middle: { male: 0.01, female: 0.01 },
    senior: { male: 0.01, female: 0.01 },
    elderly:{ male: 0.01, female: 0.01 },
  },
  sinusitis_odontogenic: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.02, female: 0.02 },
    young:  { male: 0.03, female: 0.03 },
    middle: { male: 0.04, female: 0.04 },
    senior: { male: 0.03, female: 0.03 },
    elderly:{ male: 0.02, female: 0.02 },
  },
  osteomyelitis_jaw: {
    child:  { male: 0.000, female: 0.000 },
    youth:  { male: 0.001, female: 0.001 },
    young:  { male: 0.002, female: 0.001 },
    middle: { male: 0.003, female: 0.002 },
    senior: { male: 0.005, female: 0.003 },
    elderly:{ male: 0.008, female: 0.005 },
  },
  mronj: {
    child:  { male: 0.000, female: 0.000 },
    youth:  { male: 0.000, female: 0.000 },
    young:  { male: 0.001, female: 0.001 },
    middle: { male: 0.005, female: 0.008 },
    senior: { male: 0.010, female: 0.015 },
    elderly:{ male: 0.015, female: 0.020 },
  },
  garre_osteomyelitis: {
    child:  { male: 0.002, female: 0.002 },
    youth:  { male: 0.003, female: 0.003 },
    young:  { male: 0.001, female: 0.001 },
    middle: { male: 0.000, female: 0.000 },
    senior: { male: 0.000, female: 0.000 },
    elderly:{ male: 0.000, female: 0.000 },
  },

  // ==================== 其他/系统 ====================
  halitosis: {
    child:  { male: 0.15, female: 0.15 },
    youth:  { male: 0.20, female: 0.20 },
    young:  { male: 0.25, female: 0.20 },
    middle: { male: 0.25, female: 0.22 },
    senior: { male: 0.20, female: 0.18 },
    elderly:{ male: 0.15, female: 0.15 },
  },
  fluorosis: {
    // Endemic areas: 20-60%; general population much lower
    child:  { male: 0.15, female: 0.15 },
    youth:  { male: 0.15, female: 0.15 },
    young:  { male: 0.12, female: 0.12 },
    middle: { male: 0.10, female: 0.10 },
    senior: { male: 0.08, female: 0.08 },
    elderly:{ male: 0.08, female: 0.08 },
  },
  tetracycline_teeth: {
    // Age cohort effect - mainly in people born before 1980s
    child:  { male: 0.00, female: 0.00 },
    youth:  { male: 0.00, female: 0.00 },
    young:  { male: 0.01, female: 0.01 },
    middle: { male: 0.05, female: 0.05 },
    senior: { male: 0.08, female: 0.08 },
    elderly:{ male: 0.10, female: 0.10 },
  },
  xerostomia: {
    child:  { male: 0.01, female: 0.01 },
    youth:  { male: 0.02, female: 0.02 },
    young:  { male: 0.05, female: 0.08 },
    middle: { male: 0.10, female: 0.18 },
    senior: { male: 0.18, female: 0.28 },
    elderly:{ male: 0.25, female: 0.35 },
  },
  // ====== 新增20种疾病流行病学数据 ======
  amelogenesis_imperfecta: {
    child:{ male:0.001,female:0.001 }, youth:{ male:0.001,female:0.001 },
    young:{ male:0.001,female:0.001 }, middle:{ male:0.001,female:0.001 },
    senior:{ male:0.001,female:0.001 }, elderly:{ male:0.001,female:0.001 },
  },
  pulp_polyp: {
    child:{ male:0.02,female:0.02 }, youth:{ male:0.03,female:0.03 },
    young:{ male:0.01,female:0.01 }, middle:{ male:0.005,female:0.005 },
    senior:{ male:0.003,female:0.003 }, elderly:{ male:0.001,female:0.001 },
  },
  hairy_tongue: {
    child:{ male:0.00,female:0.00 }, youth:{ male:0.01,female:0.01 },
    young:{ male:0.03,female:0.02 }, middle:{ male:0.05,female:0.03 },
    senior:{ male:0.06,female:0.04 }, elderly:{ male:0.07,female:0.05 },
  },
  fissured_tongue: {
    child:{ male:0.02,female:0.02 }, youth:{ male:0.04,female:0.04 },
    young:{ male:0.06,female:0.06 }, middle:{ male:0.08,female:0.08 },
    senior:{ male:0.10,female:0.10 }, elderly:{ male:0.12,female:0.12 },
  },
  median_rhomboid_glossitis: {
    child:{ male:0.00,female:0.00 }, youth:{ male:0.00,female:0.00 },
    young:{ male:0.005,female:0.003 }, middle:{ male:0.01,female:0.005 },
    senior:{ male:0.015,female:0.008 }, elderly:{ male:0.02,female:0.01 },
  },
  nicotine_stomatitis: {
    child:{ male:0.00,female:0.00 }, youth:{ male:0.00,female:0.00 },
    young:{ male:0.02,female:0.005 }, middle:{ male:0.05,female:0.01 },
    senior:{ male:0.08,female:0.02 }, elderly:{ male:0.05,female:0.01 },
  },
  chronic_cheek_biting: {
    child:{ male:0.02,female:0.03 }, youth:{ male:0.04,female:0.05 },
    young:{ male:0.05,female:0.06 }, middle:{ male:0.03,female:0.04 },
    senior:{ male:0.02,female:0.02 }, elderly:{ male:0.01,female:0.01 },
  },
  eagle_syndrome: {
    child:{ male:0.00,female:0.00 }, youth:{ male:0.00,female:0.00 },
    young:{ male:0.002,female:0.004 }, middle:{ male:0.005,female:0.01 },
    senior:{ male:0.008,female:0.015 }, elderly:{ male:0.01,female:0.02 },
  },
  tmj_ankylosis: {
    child:{ male:0.001,female:0.001 }, youth:{ male:0.002,female:0.002 },
    young:{ male:0.002,female:0.002 }, middle:{ male:0.001,female:0.001 },
    senior:{ male:0.001,female:0.001 }, elderly:{ male:0.001,female:0.001 },
  },
  myofascial_pain: {
    child:{ male:0.005,female:0.005 }, youth:{ male:0.02,female:0.03 },
    young:{ male:0.05,female:0.08 }, middle:{ male:0.08,female:0.12 },
    senior:{ male:0.06,female:0.10 }, elderly:{ male:0.04,female:0.06 },
  },
  osteoradionecrosis: {
    child:{ male:0.00,female:0.00 }, youth:{ male:0.00,female:0.00 },
    young:{ male:0.001,female:0.001 }, middle:{ male:0.003,female:0.003 },
    senior:{ male:0.008,female:0.005 }, elderly:{ male:0.01,female:0.008 },
  },
  cherubism: {
    child:{ male:0.001,female:0.001 }, youth:{ male:0.001,female:0.001 },
    young:{ male:0.000,female:0.000 }, middle:{ male:0.000,female:0.000 },
    senior:{ male:0.000,female:0.000 }, elderly:{ male:0.000,female:0.000 },
  },
  desquamative_gingivitis: {
    child:{ male:0.00,female:0.00 }, youth:{ male:0.00,female:0.00 },
    young:{ male:0.002,female:0.005 }, middle:{ male:0.005,female:0.015 },
    senior:{ male:0.008,female:0.025 }, elderly:{ male:0.01,female:0.03 },
  },
  gingival_cyst: {
    child:{ male:0.005,female:0.005 }, youth:{ male:0.002,female:0.002 },
    young:{ male:0.002,female:0.002 }, middle:{ male:0.003,female:0.003 },
    senior:{ male:0.002,female:0.002 }, elderly:{ male:0.001,female:0.001 },
  },
  salivary_gland_tumor: {
    child:{ male:0.00,female:0.00 }, youth:{ male:0.00,female:0.00 },
    young:{ male:0.002,female:0.002 }, middle:{ male:0.005,female:0.005 },
    senior:{ male:0.01,female:0.01 }, elderly:{ male:0.015,female:0.015 },
  },
  burning_tongue: {
    child:{ male:0.00,female:0.00 }, youth:{ male:0.00,female:0.00 },
    young:{ male:0.01,female:0.02 }, middle:{ male:0.02,female:0.05 },
    senior:{ male:0.04,female:0.08 }, elderly:{ male:0.05,female:0.10 },
  },
  recurrent_herpes_labialis: {
    child:{ male:0.05,female:0.06 }, youth:{ male:0.10,female:0.12 },
    young:{ male:0.12,female:0.15 }, middle:{ male:0.10,female:0.12 },
    senior:{ male:0.06,female:0.08 }, elderly:{ male:0.04,female:0.05 },
  },
  submandibular_sialadenitis: {
    child:{ male:0.001,female:0.001 }, youth:{ male:0.002,female:0.002 },
    young:{ male:0.005,female:0.003 }, middle:{ male:0.01,female:0.005 },
    senior:{ male:0.015,female:0.01 }, elderly:{ male:0.02,female:0.015 },
  },
  torus: {
    child:{ male:0.01,female:0.02 }, youth:{ male:0.05,female:0.08 },
    young:{ male:0.08,female:0.12 }, middle:{ male:0.12,female:0.18 },
    senior:{ male:0.15,female:0.22 }, elderly:{ male:0.18,female:0.25 },
  },
  oral_fibroma: {
    child:{ male:0.005,female:0.005 }, youth:{ male:0.01,female:0.01 },
    young:{ male:0.02,female:0.02 }, middle:{ male:0.03,female:0.03 },
    senior:{ male:0.04,female:0.04 }, elderly:{ male:0.04,female:0.04 },
  },
};

/**
 * 年龄组映射函数
 */
function getAgeGroup(age) {
  if (age <= 12) return 'child';
  if (age <= 17) return 'youth';
  if (age <= 35) return 'young';
  if (age <= 55) return 'middle';
  if (age <= 74) return 'senior';
  return 'elderly';
}

function getGenderKey(gender) {
  return gender === '男' ? 'male' : 'female';
}

/**
 * 获取某疾病在某人口统计下的患病概率
 */
function getPrevalence(diseaseId, age, gender) {
  const ageGroup = getAgeGroup(age);
  const genderKey = getGenderKey(gender);
  const prev = PREVALENCE[diseaseId];
  if (!prev) return 0;
  const ageData = prev[ageGroup];
  if (!ageData) return 0;
  return ageData[genderKey] || 0;
}

/**
 * 按年龄组权重生成随机年龄
 */
function randomAge() {
  const r = Math.random();
  let cumulative = 0;
  for (const [key, group] of Object.entries(AGE_GROUPS)) {
    cumulative += group.weight;
    if (r <= cumulative) {
      const [min, max] = group.range;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  return 30;
}

function randomGender() {
  return Math.random() < GENDER_DIST.male ? '男' : '女';
}

module.exports = {
  AGE_GROUPS,
  GENDER_DIST,
  PREVALENCE,
  getAgeGroup,
  getGenderKey,
  getPrevalence,
  randomAge,
  randomGender,
};
