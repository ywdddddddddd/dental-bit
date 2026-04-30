/**
 * 90份模拟患者真实病例 (P01-P100)
 * 覆盖全部145种口腔疾病、5大疾病类别、3个紧急级别
 * 每份病例包含完整的DAG问答路径
 * P01-P40: 初始40例
 * P41-P100: 新增60例 (含罕见病/共病/模糊/健康对照)
 */

const PATIENT_CASES = [
  // ==================== 牙体牙髓 (TOOTH) - 10例 ====================

  {
    id: 'P01',
    name: '浅龋典型病例',
    profile: { ageGroup: '8岁', gender: '男', desc: '8岁男童，喜甜食，母亲发现后牙咬合面有黑线，吃糖时有轻微酸感。无自发痛。' },
    target: 'caries_shallow',
    category: 'tooth',
    urgency: 'green',
    answers: {
      q_entry: 3,
      q_hard_acquired_or_dev: 0,
      q_hard_defect_type: 0,
      q_universal_age: 0,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 0,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P02',
    name: '深龋典型病例',
    profile: { ageGroup: '32岁', gender: '女', desc: '32岁女性，近半年吃冰淇淋和喝热咖啡时右下后牙酸痛明显，刺激去掉后立刻不疼。平时爱吃甜食，刷牙不太认真。' },
    target: 'caries_deep',
    category: 'tooth',
    urgency: 'yellow',
    answers: {
      q_entry: 0,
      q_pain_spontaneous: 1,
      q_pain_cold_hot_diff: 0,
      q_pain_trigger_main: 0,
      q_universal_age: 1,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 0,
      q_universal_diet: 0,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P03',
    name: '可复性牙髓炎/深龋鉴别病例',
    profile: { ageGroup: '28岁', gender: '男', desc: '28岁男性，右下后牙对冷热刺激产生短暂尖锐疼痛，刺激移除后疼痛立即消失，从未出现过自发痛。体检发现深龋接近牙髓。此病例测试引擎对牙髓炎可复/不可复的鉴别能力。' },
    target: 'reversible_pulpitis',
    category: 'tooth',
    urgency: 'yellow',
    answers: {
      q_entry: 0,
      q_pain_spontaneous: 1,
      q_pain_cold_hot_diff: 0,
      q_pain_trigger_main: 0,
      q_universal_age: 1,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 0,
      q_universal_stress: 0,
      q_universal_diet: 0,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P04',
    name: '急性不可复性牙髓炎病例',
    profile: { ageGroup: '35岁', gender: '女', desc: '35岁女性，左下后牙夜间突发剧痛，自行含冷水能暂时缓解，整夜无法入睡。吃止痛药效果差。' },
    target: 'irreversible_pulpitis',
    category: 'tooth',
    urgency: 'red',
    answers: {
      q_entry: 0,
      q_pain_spontaneous: 0,
      q_pain_cold_relief: 0,
      q_universal_age: 1,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P05',
    name: '根尖周炎病例',
    profile: { ageGroup: '42岁', gender: '男', desc: '42岁男性，右下后牙不敢咬合，感觉牙齿\"浮起来了\"比别的牙高，牙龈对应的位置反复鼓起一个小脓包，挤破后流出黄白色液体。' },
    target: 'apical_periodontitis',
    category: 'tooth',
    urgency: 'yellow',
    answers: {
      q_entry: 0,
      q_pain_spontaneous: 0,
      q_pain_cold_relief: 1,
      q_pain_floating: 0,
      q_universal_age: 1,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P06',
    name: '牙隐裂病例',
    profile: { ageGroup: '45岁', gender: '男', desc: '45岁男性，喜啃骨头和坚果，右下第一磨牙在咬到硬物时突发锐利剧痛，松开后疼痛消失。没有自发痛。' },
    target: 'cracked_tooth',
    category: 'tooth',
    urgency: 'yellow',
    answers: {
      q_entry: 0,
      q_pain_spontaneous: 1,
      q_pain_cold_hot_diff: 0,
      q_pain_trigger_main: 2,
      q_pain_lightning_duration: 1,
      q_universal_age: 2,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 0,
      q_universal_brush: 1,
      q_universal_stress: 1,
      q_universal_diet: 2,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P07',
    name: '牙本质敏感症病例',
    profile: { ageGroup: '22岁', gender: '女', desc: '22岁女性，刷牙时和喝冷水时多颗牙齿牙龈边缘区域出现短暂尖锐刺痛，停止刺激后立即缓解。横向拉锯式刷牙习惯。' },
    target: 'dentin_hypersensitivity',
    category: 'tooth',
    urgency: 'green',
    answers: {
      q_entry: 0,
      q_pain_spontaneous: 1,
      q_pain_cold_hot_diff: 0,
      q_pain_trigger_main: 1,
      q_universal_age: 1,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 0,
      q_universal_stress: 2,
      q_universal_diet: 1,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P08',
    name: '楔状缺损病例',
    profile: { ageGroup: '48岁', gender: '男', desc: '48岁男性，牙齿靠近牙龈处有V形深沟，碰到冷酸就一激灵。横向拉锯式刷牙几十年，最近有酸痛感。' },
    target: 'wedge_defect',
    category: 'tooth',
    urgency: 'yellow',
    answers: {
      q_entry: 3,
      q_hard_acquired_or_dev: 0,
      q_hard_defect_type: 1,
      q_universal_age: 2,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 0,
      q_universal_brush: 0,
      q_universal_stress: 1,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P09',
    name: '牙酸蚀症病例',
    profile: { ageGroup: '25岁', gender: '男', desc: '25岁男性，每天喝碳酸饮料/功能饮料，牙齿舌头那一面逐渐变透明、有光滑凹陷，每次喝冰可乐时牙齿就敏感。' },
    target: 'dental_erosion',
    category: 'tooth',
    urgency: 'green',
    answers: {
      q_entry: 3,
      q_hard_acquired_or_dev: 0,
      q_hard_defect_type: 2,
      q_universal_age: 1,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 1,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P10',
    name: '根面龋病例（老年型）',
    profile: { ageGroup: '68岁', gender: '女', desc: '68岁女性，牙龈严重退缩，多颗牙根面发软变黄褐色，有洞，碰冷东西就疼。长期口干，已绝经。' },
    target: 'root_caries',
    category: 'tooth',
    urgency: 'yellow',
    answers: {
      q_entry: 3,
      q_hard_acquired_or_dev: 0,
      q_hard_defect_type: 5,
      q_universal_age: 3,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 0,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  // ==================== 牙周 (PERIO) - 8例 ====================

  {
    id: 'P11',
    name: '牙龈炎典型病例',
    profile: { ageGroup: '25岁', gender: '女', desc: '25岁女性，刷牙时牙龈出血，牙龈边缘红肿，但牙齿没有松动。口腔卫生一般，不怎么用牙线。' },
    target: 'gingivitis',
    category: 'perio',
    urgency: 'green',
    answers: {
      q_entry: 1,
      q_perio_necrosis_smell: 1,
      q_perio_bleeding_type: 0,
      q_perio_mobility: 1,
      q_universal_age: 1,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P12',
    name: '慢性牙周炎病例',
    profile: { ageGroup: '55岁', gender: '男', desc: '55岁男性，牙龈明显萎缩，下前牙肉眼可见的"变长了"，多颗牙齿有松动，口臭明显。10多年没洗过牙，抽烟20年。' },
    target: 'periodontitis',
    category: 'perio',
    urgency: 'yellow',
    answers: {
      q_entry: 1,
      q_perio_necrosis_smell: 1,
      q_perio_bleeding_type: 1,
      q_perio_mobility: 0,
      q_perio_age_rapid: 1,
      q_universal_age: 2,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 0,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P13',
    name: '侵袭性牙周炎病例',
    profile: { ageGroup: '22岁', gender: '女', desc: '22岁女性，半年内多颗牙快速松动，牙龈无明显红肿但探诊深度很严重。父亲不到40岁牙齿就几乎全掉了。' },
    target: 'aggressive_periodontitis',
    category: 'perio',
    urgency: 'red',
    answers: {
      q_entry: 1,
      q_perio_necrosis_smell: 1,
      q_perio_bleeding_type: 1,
      q_perio_mobility: 0,
      q_perio_age_rapid: 0,
      q_universal_age: 1,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 0,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P14',
    name: 'ANUG病例（急性坏死性溃疡性龈炎）',
    profile: { ageGroup: '23岁', gender: '男', desc: '23岁男性，最近考试压力极大，牙龈突然剧痛、龈乳头像被挖掉一样发黑坏死，嘴里腐败性恶臭，牙龈自己就出血。' },
    target: 'anug',
    category: 'perio',
    urgency: 'red',
    answers: {
      q_entry: 1,
      q_perio_necrosis_smell: 0,
      q_universal_age: 1,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P15',
    name: '智齿冠周炎病例',
    profile: { ageGroup: '21岁', gender: '女', desc: '21岁女性，右下最后一颗牙后方的牙龈肿痛、吞咽都疼、嘴都有点张不开了、低烧。' },
    target: 'pericoronitis',
    category: 'perio',
    urgency: 'yellow',
    answers: {
      q_entry: 1,
      q_perio_necrosis_smell: 1,
      q_perio_bleeding_type: 0,
      q_perio_mobility: 1,
      q_universal_age: 1,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P16',
    name: '牙周脓肿病例',
    profile: { ageGroup: '52岁', gender: '男', desc: '52岁男性，牙周炎病史，昨天牙龈突然鼓起一个半球形红肿的包，按上去有波动感，疼得要命。' },
    target: 'periodontal_abscess',
    category: 'perio',
    urgency: 'red',
    answers: {
      q_entry: 1,
      q_perio_necrosis_smell: 1,
      q_perio_bleeding_type: 2,
      q_perio_mobility: 0,
      q_perio_age_rapid: 1,
      q_universal_age: 2,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 0,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P17',
    name: '牙龈退缩病例',
    profile: { ageGroup: '58岁', gender: '女', desc: '58岁女性，牙龈明显退缩，牙根大面积暴露，对冷风/冷水敏感，多颗牙颈部有凹陷感。' },
    target: 'gingival_recession',
    category: 'perio',
    urgency: 'green',
    answers: {
      q_entry: 1,
      q_perio_necrosis_smell: 1,
      q_perio_bleeding_type: 1,
      q_perio_mobility: 0,
      q_perio_age_rapid: 1,
      q_universal_age: 2,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 0,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P18',
    name: '药物性牙龈增生病例',
    profile: { ageGroup: '63岁', gender: '男', desc: '63岁男性，高血压病史，长期吃硝苯地平（降压药），牙龈肥大变厚快把牙齿盖住了，刷牙和咀嚼时容易出血。' },
    target: 'gingival_hyperplasia',
    category: 'perio',
    urgency: 'green',
    answers: {
      q_entry: 1,
      q_perio_necrosis_smell: 1,
      q_perio_bleeding_type: 0,
      q_perio_mobility: 1,
      q_universal_age: 3,
      q_universal_gender: 1,
      q_universal_medical: 1,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  // ==================== 黏膜 (MUCOSA) - 8例 ====================

  {
    id: 'P19',
    name: '复发性阿弗他溃疡病例',
    profile: { ageGroup: '24岁', gender: '女', desc: '24岁女性，嘴巴里反复长圆形小溃疡，每次一到两周自己就好，每次长一两个，疼得吃饭都费劲。最近工作压力大、熬夜多。' },
    target: 'oral_ulcer',
    category: 'mucosa',
    urgency: 'green',
    answers: {
      q_entry: 2,
      q_mucosa_can_scrape: 1,
      q_mucosa_white_or_ulcer: 1,
      q_mucosa_ulcer_pattern: 5,
      q_mucosa_ulcer_duration: 0,
      q_universal_age: 1,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P20',
    name: '口腔癌高危病例',
    profile: { ageGroup: '62岁', gender: '男', desc: '62岁男性，抽烟喝酒30余年。右舌边缘有个溃疡超过一个月不愈合，边缘摸起来硬邦邦的，那块舌头的感觉也变麻木了。最近两个月体重掉了5公斤。' },
    target: 'oral_cancer',
    category: 'mucosa',
    urgency: 'red',
    answers: {
      q_entry: 2,
      q_mucosa_can_scrape: 1,
      q_mucosa_white_or_ulcer: 1,
      q_mucosa_ulcer_pattern: 5,
      q_mucosa_ulcer_duration: 1,
      q_mucosa_cancer_redflags: [0, 1, 2, 3],
      q_universal_age: 3,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 0,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P21',
    name: '口腔白斑病例',
    profile: { ageGroup: '55岁', gender: '男', desc: '55岁男性，抽烟30年每天一包，左颊黏膜发现一块擦不掉的白色斑块，表面摸着有些粗糙，没有疼痛感，但张嘴大了感觉紧绷。' },
    target: 'leukoplakia',
    category: 'mucosa',
    urgency: 'red',
    answers: {
      q_entry: 2,
      q_mucosa_can_scrape: 1,
      q_mucosa_white_or_ulcer: 0,
      q_mucosa_white_risk: 0,
      q_universal_age: 2,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 0,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P22',
    name: '口腔黏膜下纤维化(OSF)病例',
    profile: { ageGroup: '38岁', gender: '男', desc: '38岁男性，嚼槟榔15年，口腔黏膜逐渐变白变硬，嘴巴越来越张不开了，现在连一根手指都塞不进去。说话和吃东西都困难。' },
    target: 'osf',
    category: 'mucosa',
    urgency: 'red',
    answers: {
      q_entry: 2,
      q_mucosa_can_scrape: 1,
      q_mucosa_white_or_ulcer: 0,
      q_mucosa_white_risk: 1,
      q_universal_age: 1,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 2,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P23',
    name: '口腔扁平苔藓病例',
    profile: { ageGroup: '46岁', gender: '女', desc: '46岁女性，两颊内侧出现白色网状条纹很长时间了，偶尔会糜烂疼痛，反反复复。有轻度焦虑史。' },
    target: 'lichen_planus',
    category: 'mucosa',
    urgency: 'yellow',
    answers: {
      q_entry: 2,
      q_mucosa_can_scrape: 1,
      q_mucosa_white_or_ulcer: 0,
      q_mucosa_white_risk: 2,
      q_universal_age: 2,
      q_universal_gender: 0,
      q_universal_medical: 2,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P24',
    name: '口腔念珠菌病病例',
    profile: { ageGroup: '72岁', gender: '男', desc: '72岁男性，有糖尿病史，戴满口假牙多年。嘴里出现一层白色奶酪样的膜，能擦掉，擦掉后黏膜红红的。口干得厉害。' },
    target: 'candidiasis',
    category: 'mucosa',
    urgency: 'yellow',
    answers: {
      q_entry: 2,
      q_mucosa_can_scrape: 0,
      q_universal_age: 3,
      q_universal_gender: 1,
      q_universal_medical: 0,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P25',
    name: '疱疹性口炎病例',
    profile: { ageGroup: '6岁', gender: '女', desc: '6岁女童，发烧两天后嘴里出现成簇的小水疱，破了以后连成一片糜烂，唇部和上颚明显。流口水、不肯吃东西喝水。' },
    target: 'herpes_stomatitis',
    category: 'mucosa',
    urgency: 'yellow',
    answers: {
      q_entry: 2,
      q_mucosa_can_scrape: 1,
      q_mucosa_white_or_ulcer: 1,
      q_mucosa_ulcer_pattern: 5,
      q_mucosa_ulcer_duration: 3,
      q_universal_age: 0,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P26',
    name: '天疱疮病例',
    profile: { ageGroup: '52岁', gender: '女', desc: '52岁女性，口腔大面积糜烂三个月了，吃饭咽水都疼，身上也出现松弛的大水疱，用手指推一下疱就扩大（尼氏征阳性）。' },
    target: 'pemphigus',
    category: 'mucosa',
    urgency: 'red',
    answers: {
      q_entry: 2,
      q_mucosa_can_scrape: 1,
      q_mucosa_white_or_ulcer: 1,
      q_mucosa_ulcer_pattern: 5,
      q_mucosa_ulcer_duration: 2,
      q_universal_age: 2,
      q_universal_gender: 0,
      q_universal_medical: 2,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 0,
    }
  },

  // ==================== 颌面关节 (JOINT) - 6例 ====================

  {
    id: 'P27',
    name: 'TMD典型病例',
    profile: { ageGroup: '28岁', gender: '女', desc: '28岁女性，张嘴闭嘴时右侧耳前关节处有明显的\"咔咔\"弹响声，咀嚼硬东西时酸胀不适，但没有早上的酸胀感。' },
    target: 'tmd',
    category: 'joint',
    urgency: 'green',
    answers: {
      q_entry: 4,
      q_jaw_recent_extraction: 1,
      q_jaw_bisphosphonate: 1,
      q_jaw_pain_or_noise: 0,
      q_jaw_morning_stiff: 1,
      q_universal_age: 1,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 0,
      q_universal_diet: 2,
      q_universal_dental_visit: 0,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P28',
    name: '夜磨牙病例',
    profile: { ageGroup: '35岁', gender: '男', desc: '35岁男性，每天早上醒来腮帮子酸痛，妻子说他晚上磨牙声很大。牙齿咬合面磨损明显，对冷热也开始敏感了。' },
    target: 'bruxism',
    category: 'joint',
    urgency: 'yellow',
    answers: {
      q_entry: 4,
      q_jaw_recent_extraction: 1,
      q_jaw_bisphosphonate: 1,
      q_jaw_pain_or_noise: 0,
      q_jaw_morning_stiff: 0,
      q_universal_age: 1,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 0,
      q_universal_diet: 2,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P29',
    name: '三叉神经痛病例',
    profile: { ageGroup: '65岁', gender: '女', desc: '65岁女性，右侧脸颊反复出现闪电式/刀割样的剧烈疼痛，每次持续几十秒，洗脸、刷牙甚至吹到风都能触发。在口腔科查了几次也没发现牙齿有什么问题。' },
    target: 'trigeminal_neuralgia',
    category: 'joint',
    urgency: 'yellow',
    answers: {
      q_entry: 0,
      q_pain_spontaneous: 1,
      q_pain_cold_hot_diff: 0,
      q_pain_trigger_main: 2,
      q_pain_lightning_duration: 0,
      q_pain_xray_finding: 1,
      q_universal_age: 3,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 0,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P30',
    name: '牙齿外伤病例',
    profile: { ageGroup: '15岁', gender: '男', desc: '15岁男生，打篮球时不慎摔倒，门牙整颗从牙槽窝完全掉出来了。牙槽窝还在流血，人很慌张。' },
    target: 'trauma',
    category: 'joint',
    urgency: 'red',
    answers: {
      q_entry: 3,
      q_hard_acquired_or_dev: 0,
      q_hard_defect_type: 3,
      q_hard_trauma_type: 0,
      q_universal_age: 1,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 0,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P31',
    name: '涎石症病例',
    profile: { ageGroup: '48岁', gender: '男', desc: '48岁男性，每次吃饭的时候右边下巴下面就肿起来一个大包，疼，吃完饭后过一两个小时就自己消退下去了。反复发作了几个月。' },
    target: 'sialolithiasis',
    category: 'joint',
    urgency: 'yellow',
    answers: {
      q_entry: 4,
      q_jaw_recent_extraction: 1,
      q_jaw_bisphosphonate: 1,
      q_jaw_pain_or_noise: 1,
      q_jaw_swelling_meal: 0,
      q_universal_age: 2,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P32',
    name: '腮腺炎病例',
    profile: { ageGroup: '12岁', gender: '男', desc: '12岁男生，右侧耳垂下方肿起来了，按压很疼，同时发烧到38.5°C，全身没力气不想吃东西。班里最近也有几个同学腮帮子肿起来。' },
    target: 'parotitis',
    category: 'joint',
    urgency: 'yellow',
    answers: {
      q_entry: 4,
      q_jaw_recent_extraction: 1,
      q_jaw_bisphosphonate: 1,
      q_jaw_pain_or_noise: 1,
      q_jaw_swelling_meal: 1,
      q_universal_age: 0,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 1,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  // ==================== 其他/系统 (OTHER) - 8例 ====================

  {
    id: 'P33',
    name: '非口源性口臭病例',
    profile: { ageGroup: '35岁', gender: '男', desc: '35岁男性，口腔卫生习惯良好（早晚刷牙、用牙线、定期洗牙），但口臭问题一直很严重，同事经常侧过脸说话。偶尔反酸、胃胀。' },
    target: 'halitosis',
    category: 'other',
    urgency: 'green',
    answers: {
      q_entry: 5,
      q_systemic_dry_or_burn: 2,
      q_universal_age: 1,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 0,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P34',
    name: '口干症（干燥综合征疑似）',
    profile: { ageGroup: '55岁', gender: '女', desc: '55岁女性，长期口干舌燥，喝很多水还是干，说话久了嗓子变哑，眼睛也特别干涩。同时有类风湿关节炎病史。' },
    target: 'xerostomia',
    category: 'other',
    urgency: 'yellow',
    answers: {
      q_entry: 5,
      q_systemic_dry_or_burn: 0,
      q_systemic_dry_cause: 1,
      q_universal_age: 2,
      q_universal_gender: 0,
      q_universal_medical: 2,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 0,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P35',
    name: '灼口综合征病例',
    profile: { ageGroup: '58岁', gender: '女', desc: '58岁女性，绝经后出现持续的口腔烧灼感，从早晨起来就开始，舌头尤其明显。但口腔科检查黏膜完全正常。睡眠也不太好。' },
    target: 'burning_mouth',
    category: 'other',
    urgency: 'green',
    answers: {
      q_entry: 5,
      q_systemic_dry_or_burn: 1,
      q_universal_age: 2,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 0,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P36',
    name: '放射性口炎病例',
    profile: { ageGroup: '62岁', gender: '男', desc: '62岁男性，鼻咽癌放疗三个月后，整个口腔黏膜发红糜烂，疼得吃不了东西，口干如沙漠，牙齿也开始快速蛀坏了。' },
    target: 'radiation_stomatitis',
    category: 'mucosa',
    urgency: 'red',
    answers: {
      q_entry: 2,
      q_mucosa_can_scrape: 1,
      q_mucosa_white_or_ulcer: 1,
      q_mucosa_ulcer_pattern: 5,
      q_mucosa_ulcer_duration: 2,
      q_universal_age: 3,
      q_universal_gender: 1,
      q_universal_medical: 4,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 0,
      q_universal_diet: 3,
      q_universal_dental_visit: 0,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P37',
    name: '氟斑牙病例',
    profile: { ageGroup: '28岁', gender: '女', desc: '28岁女性，牙齿从小就有白垩色和黄褐色斑块，影响美观，害怕大笑露齿。小时候一直在高氟地区（河北某地）长大。' },
    target: 'fluorosis',
    category: 'other',
    urgency: 'green',
    answers: {
      q_entry: 3,
      q_hard_acquired_or_dev: 1,
      q_hard_dev_color_or_shape: 0,
      q_hard_dev_color_detail: 0,
      q_universal_age: 1,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 0,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P38',
    name: '四环素牙病例',
    profile: { ageGroup: '45岁', gender: '男', desc: '45岁男性，牙齿从换牙之后就是灰黄褐色，小时候每次感冒发烧家里就给他吃四环素（上世纪80年代常用）。影响美观。' },
    target: 'tetracycline_teeth',
    category: 'other',
    urgency: 'green',
    answers: {
      q_entry: 3,
      q_hard_acquired_or_dev: 1,
      q_hard_dev_color_or_shape: 0,
      q_hard_dev_color_detail: 1,
      q_universal_age: 1,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 0,
    }
  },

  {
    id: 'P39',
    name: '综合高风险病例',
    profile: { ageGroup: '42岁', gender: '男', desc: '42岁男性，抽烟20年每天一包，喝酒一周5次，还嚼槟榔10年。口腔多处白斑、张口困难、牙齿松动、牙龈出血、口臭严重。全方位高风险。' },
    target: 'multiple',
    category: 'mucosa',
    urgency: 'red',
    answers: {
      q_entry: 2,
      q_mucosa_can_scrape: 1,
      q_mucosa_white_or_ulcer: 0,
      q_mucosa_white_risk: 1,
      q_universal_age: 1,
      q_universal_gender: 1,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 0,
      q_universal_brush: 1,
      q_universal_stress: 0,
      q_universal_diet: 2,
      q_universal_dental_visit: 1,
      q_universal_fluoride: 1,
    }
  },

  {
    id: 'P40',
    name: '健康口腔病例（对照）',
    profile: { ageGroup: '30岁', gender: '女', desc: '30岁女性，无症状常规检查，口腔卫生良好，规律刷牙、用牙线、定期洗牙，不抽烟不喝酒，饮食均衡，作息规律。这个病例用于测试系统对健康用户的判定。' },
    target: null,
    category: 'none',
    urgency: 'green',
    answers: {
      q_entry: 4,
      q_jaw_recent_extraction: 1,
      q_jaw_bisphosphonate: 1,
      q_jaw_pain_or_noise: 0,
      q_jaw_morning_stiff: 1,
      q_universal_age: 1,
      q_universal_gender: 0,
      q_universal_medical: 6,
      q_universal_family: 3,
      q_universal_smoking: 3,
      q_universal_brush: 2,
      q_universal_stress: 2,
      q_universal_diet: 3,
      q_universal_dental_visit: 0,
      q_universal_fluoride: 0,
    }
  },  // ==================== P41-P100: 新增60例（正确DAG路径） ====================

  // --- tooth (10 cases) ---
  {
    id: 'P41', name: '牙髓坏死病例', profile: { ageGroup: '38岁', gender: '男', desc: '38岁男性，右下后牙几年前曾剧痛过后慢慢不疼了，牙齿变灰黄色，对冷热没感觉，牙龈反复鼓脓包。' },
    target: 'pulp_necrosis', category: 'tooth', urgency: 'yellow',
    answers: { q_entry: 0, q_pain_spontaneous: 0, q_pain_cold_relief: 1, q_pain_floating: 0, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P42', name: '继发龋病例', profile: { ageGroup: '45岁', gender: '女', desc: '45岁女性，多年前补过的牙齿边缘出现新黑洞，有时嵌塞食物后不适。' },
    target: 'caries_recurrent', category: 'tooth', urgency: 'yellow',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 0, q_hard_defect_type: 4, q_universal_age: 2, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 0, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P43', name: '牙酸蚀症病例2', profile: { ageGroup: '22岁', gender: '男', desc: '22岁男生，每天喝柠檬水和碳酸饮料，牙齿舌侧面光滑凹陷，遇冷敏感。' },
    target: 'dental_erosion', category: 'tooth', urgency: 'green',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 0, q_hard_defect_type: 2, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 1, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P44', name: '静止龋病例', profile: { ageGroup: '50岁', gender: '男', desc: '50岁男性，口腔检查发现多颗牙咬合面有黑色硬质斑点但无疼痛不适，多年未变化。' },
    target: 'caries_shallow', category: 'tooth', urgency: 'green',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 0, q_hard_defect_type: 0, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 2, q_universal_diet: 0, q_universal_dental_visit: 0, q_universal_fluoride: 1 }
  },
  {
    id: 'P45', name: '牙本质敏感症病例2', profile: { ageGroup: '30岁', gender: '女', desc: '30岁女性，喝冰水时多颗牙齿颈部区域出现短暂锐痛，停止刺激马上不疼。牙龈有轻度退缩。' },
    target: 'dentin_hypersensitivity', category: 'tooth', urgency: 'green',
    answers: { q_entry: 0, q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 1, q_universal_age: 1, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 0, q_universal_stress: 2, q_universal_diet: 1, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P46', name: '畸形中央尖病例', profile: { ageGroup: '12岁', gender: '男', desc: '12岁男生，新长出的前磨牙咬合面有个多出来的小尖尖，咬硬东西时小尖折了，露出里面的牙髓疼。' },
    target: 'dens_evaginatus', category: 'tooth', urgency: 'red',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 1, q_hard_dev_color_or_shape: 1, q_universal_age: 0, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 2, q_universal_dental_visit: 0, q_universal_fluoride: 1 }
  },
  {
    id: 'P47', name: '根面龋病例2', profile: { ageGroup: '70岁', gender: '女', desc: '70岁女性，牙龈退缩严重，多个牙根面发黄变软有洞，含冷水即痛。有糖尿病史。' },
    target: 'root_caries', category: 'tooth', urgency: 'yellow',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 0, q_hard_defect_type: 5, q_universal_age: 3, q_universal_gender: 0, q_universal_medical: 0, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 0, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P48', name: '牙隐裂病例2', profile: { ageGroup: '50岁', gender: '男', desc: '50岁男性，爱啃坚果咬硬骨头，右下磨牙咬到硬物时突然锐利剧痛10秒，松开后不疼，无自发痛。' },
    target: 'cracked_tooth', category: 'tooth', urgency: 'yellow',
    answers: { q_entry: 0, q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 2, q_pain_lightning_duration: 1, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 1, q_universal_diet: 2, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P49', name: '楔状缺损病例2', profile: { ageGroup: '52岁', gender: '女', desc: '52岁女性，左右横拉锯式刷牙几十年，多颗牙颈部出现V形深沟，对冷风和酸性食物敏感。' },
    target: 'wedge_defect', category: 'tooth', urgency: 'green',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 0, q_hard_defect_type: 1, q_universal_age: 2, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 0, q_universal_stress: 1, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P50', name: '猛性龋/放疗龋病例', profile: { ageGroup: '60岁', gender: '男', desc: '60岁男性，鼻咽癌放疗半年后，多颗牙迅速变黑变软，短期内出现十几处龋洞。口干如沙漠。' },
    target: 'caries_rampant', category: 'tooth', urgency: 'red',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 0, q_hard_defect_type: 0, q_universal_age: 3, q_universal_gender: 1, q_universal_medical: 4, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },

  // --- perio (10 cases) ---
  {
    id: 'P51', name: '青春期龈炎病例', profile: { ageGroup: '14岁', gender: '女', desc: '14岁女生，来月经初潮后牙龈开始红肿，刷牙一刷就流血，牙齿没有松动。' },
    target: 'puberty_gingivitis', category: 'perio', urgency: 'green',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 0, q_perio_mobility: 1, q_universal_age: 0, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P52', name: '妊娠期龈炎/龈瘤病例', profile: { ageGroup: '28岁', gender: '女', desc: '28岁女性，怀孕5个月后发现个别牙龈乳头像球一样鼓起来，一碰就出血。怀孕之前牙龈没有问题。' },
    target: 'pregnancy_gingivitis', category: 'perio', urgency: 'yellow',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 0, q_perio_mobility: 1, q_universal_age: 1, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P53', name: '急性龈乳头炎病例', profile: { ageGroup: '30岁', gender: '男', desc: '30岁男性，前天吃鱼刺扎到牙龈后，两牙之间的牙龈头红肿剧痛，一碰就出血。无牙周袋。' },
    target: 'acute_gingival_papillitis', category: 'perio', urgency: 'yellow',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 0, q_perio_mobility: 1, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P54', name: '牙周-牙髓联合病变病例', profile: { ageGroup: '48岁', gender: '男', desc: '48岁男性，有牙周炎病史多年，右下后牙牙龈反复肿胀流脓，牙也松动了，拍片见牙槽骨吸收延伸到根尖。' },
    target: 'perio_endo_lesion', category: 'perio', urgency: 'yellow',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 3, q_perio_mobility: 0, q_perio_age_rapid: 1, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P55', name: '根分叉病变病例', profile: { ageGroup: '58岁', gender: '男', desc: '58岁男性，长期慢性牙周炎，拍片发现下颌磨牙根分叉区的骨头像隧道一样穿通了。刷牙出血、口臭。' },
    target: 'furcation_involvement', category: 'perio', urgency: 'yellow',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 1, q_perio_mobility: 0, q_perio_age_rapid: 1, q_universal_age: 3, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P56', name: '牙龈退缩病例2', profile: { ageGroup: '62岁', gender: '女', desc: '62岁女性，多年来牙龈慢慢往下退，牙根露出部分越来越长，喝凉风就酸软，吃酸性东西都不敢。' },
    target: 'gingival_recession', category: 'perio', urgency: 'green',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 1, q_perio_mobility: 0, q_perio_age_rapid: 1, q_universal_age: 3, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 0, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P57', name: '药物性牙龈增生病例2', profile: { ageGroup: '60岁', gender: '女', desc: '60岁女性，高血压病史，长期吃苯磺酸氨氯地平（降压药），牙龈肥大变厚把牙齿都要盖住了。' },
    target: 'gingival_hyperplasia', category: 'perio', urgency: 'green',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 0, q_perio_mobility: 1, q_universal_age: 3, q_universal_gender: 0, q_universal_medical: 1, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P58', name: '牙周脓肿病例2', profile: { ageGroup: '55岁', gender: '男', desc: '55岁男性，牙周炎多年未治，昨天右下牙龈突然鼓起一个半球形红肿的脓包，按上去波动感，痛得碰都不让碰。' },
    target: 'periodontal_abscess', category: 'perio', urgency: 'red',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 2, q_perio_mobility: 0, q_perio_age_rapid: 1, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 0, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P59', name: '智齿冠周炎病例2', profile: { ageGroup: '19岁', gender: '男', desc: '19岁男生，右边最后面一颗牙的牙龈肿痛四天了，嘴都快张不开了，咽口水都疼，低烧37.8°C。' },
    target: 'pericoronitis', category: 'perio', urgency: 'yellow',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 0, q_perio_mobility: 1, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P60', name: 'ANUG病例2', profile: { ageGroup: '21岁', gender: '女', desc: '21岁女生，考研复习压力大到崩溃，牙龈突然剧痛、龈乳头灰黑坏死像被人挖掉，嘴里腐败臭味连戴口罩自己都能闻到。' },
    target: 'anug', category: 'perio', urgency: 'red',
    answers: { q_entry: 1, q_perio_necrosis_smell: 0, q_universal_age: 1, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },

  // --- mucosa (10 cases) ---
  {
    id: 'P61', name: '口角炎病例', profile: { ageGroup: '72岁', gender: '女', desc: '72岁女性，两侧嘴角红肿、开裂、结痂两个多月了，舔一下更疼。全口假牙戴了很多年。' },
    target: 'angular_cheilitis', category: 'mucosa', urgency: 'green',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1, q_mucosa_ulcer_pattern: 5, q_mucosa_ulcer_duration: 0, q_universal_age: 3, q_universal_gender: 0, q_universal_medical: 0, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P62', name: '地图舌病例', profile: { ageGroup: '10岁', gender: '男', desc: '10岁男生，舌头上出现了不规则的红斑，边缘白色，样子像地图，位置今天在这明天又跑到那去了，没有疼痛感。' },
    target: 'geographic_tongue', category: 'mucosa', urgency: 'green',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1, q_mucosa_ulcer_pattern: 5, q_mucosa_ulcer_duration: 1, q_universal_age: 0, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 0, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P63', name: '口腔扁平苔藓病例2', profile: { ageGroup: '50岁', gender: '女', desc: '50岁女性，两颊内侧有白色的树枝状条纹十年了，最近开始糜烂火辣辣地疼。有桥本甲状腺炎。' },
    target: 'lichen_planus', category: 'mucosa', urgency: 'yellow',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 0, q_mucosa_white_risk: 2, q_universal_age: 2, q_universal_gender: 0, q_universal_medical: 2, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P64', name: '天疱疮病例2', profile: { ageGroup: '55岁', gender: '男', desc: '55岁男性，口腔多处糜烂半年了，一吃饭喝汤就疼的不得了，身上也有水疱，用手指推一下皮肤水疱就变大了。' },
    target: 'pemphigus', category: 'mucosa', urgency: 'red',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1, q_mucosa_ulcer_pattern: 5, q_mucosa_ulcer_duration: 2, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 2, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P65', name: '疱疹性口炎病例2', profile: { ageGroup: '4岁', gender: '女', desc: '4岁女童，发烧两天后嘴里出现成群透明小水疱，破了以后连成一片片的糜烂面，嘴唇周围和牙龈红肿，不停流口水。' },
    target: 'herpes_stomatitis', category: 'mucosa', urgency: 'yellow',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1, q_mucosa_ulcer_pattern: 5, q_mucosa_ulcer_duration: 3, q_universal_age: 0, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P66', name: '口腔白斑病例2', profile: { ageGroup: '58岁', gender: '男', desc: '58岁男性，抽烟40年每天两包，右侧颊部黏膜擦不掉的白色斑块，摸着粗糙有些颗粒感，没有疼痛。' },
    target: 'leukoplakia', category: 'mucosa', urgency: 'red',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 0, q_mucosa_white_risk: 0, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P67', name: '复发性阿弗他溃疡病例2', profile: { ageGroup: '26岁', gender: '男', desc: '26岁男性，嘴里反复长小圆溃疡，每次一到两周自己好，工作压力大和熬夜时更频繁。最近嘴里同时长了三个。' },
    target: 'oral_ulcer', category: 'mucosa', urgency: 'green',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1, q_mucosa_ulcer_pattern: 5, q_mucosa_ulcer_duration: 0, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P68', name: '口腔念珠菌病病例2', profile: { ageGroup: '68岁', gender: '女', desc: '68岁女性，长期用哮喘吸入激素，最近嘴里出现白色奶酪样的膜，能擦掉，擦掉后黏膜红红的，口干得厉害。' },
    target: 'candidiasis', category: 'mucosa', urgency: 'yellow',
    answers: { q_entry: 2, q_mucosa_can_scrape: 0, q_universal_age: 3, q_universal_gender: 0, q_universal_medical: 0, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P69', name: '口腔黏膜下纤维化(OSF)病例2', profile: { ageGroup: '45岁', gender: '男', desc: '45岁男性，嚼槟榔20年，口腔黏膜逐渐发白变硬，现在嘴巴只能张开两个手指宽了，吃辣的像在伤口上撒盐。' },
    target: 'osf', category: 'mucosa', urgency: 'red',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 0, q_mucosa_white_risk: 1, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 2, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P70', name: '口腔癌高危病例2', profile: { ageGroup: '65岁', gender: '男', desc: '65岁男性，抽烟喝酒四十年，舌头右边缘长了溃疡超过五周不愈合，说话也大舌头了，脖子摸到个不痛的小疙瘩。' },
    target: 'oral_cancer', category: 'mucosa', urgency: 'red',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 1, q_mucosa_ulcer_pattern: 5, q_mucosa_ulcer_duration: 1, q_mucosa_cancer_redflags: [0, 1, 2, 3], q_universal_age: 3, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },

  // --- joint (10 cases) ---
  {
    id: 'P71', name: '非典型性牙痛病例', profile: { ageGroup: '42岁', gender: '女', desc: '42岁女性，三年前做了根管治疗的牙齿还持续隐隐钝痛，跑了好几家口腔科都查不出问题。牙齿对叩诊不敏感。' },
    target: 'atypical_odontalgia', category: 'joint', urgency: 'yellow',
    answers: { q_entry: 0, q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 1, q_universal_age: 2, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P72', name: '牙源性上颌窦炎病例', profile: { ageGroup: '48岁', gender: '男', desc: '48岁男性，右边上颌后牙疼同时同侧面部有压迫感、鼻塞流黄鼻涕，人有点低烧。牙片显示根尖阴影延伸到上颌窦。' },
    target: 'sinusitis_odontogenic', category: 'joint', urgency: 'yellow',
    answers: { q_entry: 0, q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 4, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P73', name: '颌骨骨髓炎病例', profile: { ageGroup: '55岁', gender: '男', desc: '55岁男性，拔掉右下智齿后两个月伤口还一直不愈合，流黄脓，下巴这块麻木没感觉了，拍片发现骨头像被虫蛀了一样。' },
    target: 'osteomyelitis_jaw', category: 'joint', urgency: 'red',
    answers: { q_entry: 4, q_jaw_recent_extraction: 0, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 1, q_jaw_swelling_meal: 1, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 0, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P74', name: '干槽症病例', profile: { ageGroup: '32岁', gender: '女', desc: '32岁女性，拔掉左下智齿后第三天，伤口突然剧痛放射到耳朵太阳穴，吃止痛药没用。照镜子看到牙槽窝是空的没有血凝块。' },
    target: 'dry_socket', category: 'joint', urgency: 'red',
    answers: { q_entry: 4, q_jaw_recent_extraction: 0, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 1, q_jaw_swelling_meal: 1, q_universal_age: 1, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P75', name: 'TMD病例2', profile: { ageGroup: '26岁', gender: '女', desc: '26岁女性，每次张嘴闭嘴巴右侧耳前关节"咔哒"弹响，吃硬的腮帮子酸胀，早上起来腮帮子倒不酸。' },
    target: 'tmd', category: 'joint', urgency: 'green',
    answers: { q_entry: 4, q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 0, q_jaw_morning_stiff: 1, q_universal_age: 1, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 0, q_universal_diet: 2, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P76', name: '夜磨牙病例2', profile: { ageGroup: '40岁', gender: '男', desc: '40岁男性，每天早上醒来腮帮子酸痛，妻子说他晚上磨牙声像拖拉机一样吵得她睡不着。牙齿咬合面都磨平了。' },
    target: 'bruxism', category: 'joint', urgency: 'yellow',
    answers: { q_entry: 4, q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 0, q_jaw_morning_stiff: 0, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 0, q_universal_diet: 2, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P77', name: '三叉神经痛病例2', profile: { ageGroup: '68岁', gender: '女', desc: '68岁女性，右边脸颊反复出现闪电般刀割剧痛，每次持续二三十秒，洗脸轻触脸颊都能触发。牙科查了几次没发现牙齿问题。' },
    target: 'trigeminal_neuralgia', category: 'joint', urgency: 'yellow',
    answers: { q_entry: 0, q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 2, q_pain_lightning_duration: 0, q_pain_xray_finding: 1, q_universal_age: 3, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P78', name: '涎石症病例2', profile: { ageGroup: '50岁', gender: '女', desc: '50岁女性，每次一吃饭左边下颌下面就突然肿起来胀痛，吃完饭过一小时就好了。反反复复几个月了。' },
    target: 'sialolithiasis', category: 'joint', urgency: 'yellow',
    answers: { q_entry: 4, q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 1, q_jaw_swelling_meal: 0, q_universal_age: 2, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P79', name: '腮腺炎病例2', profile: { ageGroup: '10岁', gender: '男', desc: '10岁男生，左边耳垂下方肿起来了触及疼痛，发烧38°C，全身没力气吃不下东西。班里好几个同学也有腮腺肿。' },
    target: 'parotitis', category: 'joint', urgency: 'yellow',
    answers: { q_entry: 4, q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 1, q_jaw_swelling_meal: 1, q_universal_age: 0, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P80', name: '牙齿外伤病例2', profile: { ageGroup: '13岁', gender: '女', desc: '13岁女生，打篮球被对手肘子撞到嘴巴，门牙整颗从牙槽窝完全掉出来了，牙龈还在流血，人非常慌张害怕。' },
    target: 'trauma', category: 'joint', urgency: 'red',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 0, q_hard_defect_type: 3, q_hard_trauma_type: 0, q_universal_age: 1, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },

  // --- other (8 cases) ---
  {
    id: 'P81', name: '氟斑牙病例2', profile: { ageGroup: '30岁', gender: '男', desc: '30岁男性，牙齿从小就有白垩色和黄褐色斑点，影响美观不敢大笑。小时候住山西高氟地区。' },
    target: 'fluorosis', category: 'other', urgency: 'green',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 1, q_hard_dev_color_or_shape: 0, q_hard_dev_color_detail: 0, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P82', name: '四环素牙病例2', profile: { ageGroup: '50岁', gender: '女', desc: '50岁女性，换牙之后恒牙就是灰黄褐色，小时候生病常吃四环素。严重影响社交和工作面试。' },
    target: 'tetracycline_teeth', category: 'other', urgency: 'green',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 1, q_hard_dev_color_or_shape: 0, q_hard_dev_color_detail: 1, q_universal_age: 2, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P83', name: '口干症病例2', profile: { ageGroup: '60岁', gender: '女', desc: '60岁女性，长期口干想喝水喝了还是不解决问题，没唾液咽饭都困难。同时眼睛也干涩。查血SSA抗体阳性。' },
    target: 'xerostomia', category: 'other', urgency: 'yellow',
    answers: { q_entry: 5, q_systemic_dry_or_burn: 0, q_systemic_dry_cause: 1, q_universal_age: 3, q_universal_gender: 0, q_universal_medical: 2, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P84', name: '非口源性口臭病例2', profile: { ageGroup: '40岁', gender: '男', desc: '40岁男性，口腔卫生很好但长期口臭严重，同事一说话就侧脸。经常烧心反酸，胃镜检查有慢性胃炎伴幽门螺杆菌感染。' },
    target: 'halitosis', category: 'other', urgency: 'green',
    answers: { q_entry: 5, q_systemic_dry_or_burn: 2, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P85', name: '灼口综合征病例2', profile: { ageGroup: '60岁', gender: '女', desc: '60岁女性，绝经后舌头像被开水烫过一样持续烧灼感，嘴发麻，但口腔检查黏膜完全正常没任何疹子或红肿。睡眠很差。' },
    target: 'burning_mouth', category: 'other', urgency: 'green',
    answers: { q_entry: 5, q_systemic_dry_or_burn: 1, q_universal_age: 3, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P86', name: '釉质发育不全病例', profile: { ageGroup: '9岁', gender: '男', desc: '9岁男生，新换出的恒牙表面粗糙不平有白垩色和褐色沟痕，牙齿形态好像没发育好，没有黑线也没有洞。' },
    target: 'enamel_hypoplasia', category: 'tooth', urgency: 'green',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 1, q_hard_dev_color_or_shape: 1, q_universal_age: 0, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 0, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P87', name: '牙内吸收病例', profile: { ageGroup: '35岁', gender: '男', desc: '35岁男性，门牙受过撞击两年后，拍牙片发现牙根内部有一个圆形透亮影，牙齿微微变色但没有疼痛感。' },
    target: 'internal_resorption', category: 'tooth', urgency: 'yellow',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 0, q_hard_defect_type: 0, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P88', name: '磨损症病例', profile: { ageGroup: '55岁', gender: '男', desc: '55岁男性，长期吃硬食和酸性食物，牙齿咬合面严重磨损，牙尖都磨平了，遇到冷热酸甜就敏感，咀嚼效率下降。' },
    target: 'tooth_wear_attrition', category: 'tooth', urgency: 'yellow',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 0, q_hard_defect_type: 2, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 1, q_universal_diet: 2, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },

  // --- 多病共存 (4 cases) ---
  {
    id: 'P89', name: '牙周炎合并口臭综合病例', profile: { ageGroup: '52岁', gender: '男', desc: '52岁男性，牙龈萎缩出血多年，多颗牙开始松动，同时伴有顽固性口臭。抽烟十五年。' },
    target: 'periodontitis', category: 'perio', urgency: 'yellow',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 1, q_perio_mobility: 0, q_perio_age_rapid: 1, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },
  {
    id: 'P90', name: '口干症合并猛性龋综合病例', profile: { ageGroup: '65岁', gender: '女', desc: '65岁女性，舍格伦综合征导致严重口干，一年内多颗牙快速龋坏。眼睛也干，喝很多水还是不解决问题。' },
    target: 'xerostomia', category: 'other', urgency: 'yellow',
    answers: { q_entry: 5, q_systemic_dry_or_burn: 0, q_systemic_dry_cause: 1, q_universal_age: 3, q_universal_gender: 0, q_universal_medical: 2, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P91', name: 'TMD合并夜磨牙综合病例', profile: { ageGroup: '33岁', gender: '女', desc: '33岁女性，双侧关节弹响半年，早上起床腮帮子酸痛咬合无力，牙齿磨损严重，近半年工作压力极大。' },
    target: 'tmd', category: 'joint', urgency: 'yellow',
    answers: { q_entry: 4, q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 0, q_jaw_morning_stiff: 0, q_universal_age: 1, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 0, q_universal_diet: 2, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P92', name: 'OSF合并白斑综合病例', profile: { ageGroup: '50岁', gender: '男', desc: '50岁男性，嚼槟榔二十年又抽烟喝酒，口腔多处白斑同时张口困难只能塞进一个半手指，高风险共病表现。' },
    target: 'osf', category: 'mucosa', urgency: 'red',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 0, q_mucosa_white_risk: 1, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 1, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },

  // --- 边界病例 (3 cases) ---
  {
    id: 'P93', name: '可复性vs不可复性牙髓炎边界病例', profile: { ageGroup: '30岁', gender: '男', desc: '30岁男性，右下后牙对冷热刺激痛持续几秒到十几秒，有时隐隐感觉牙有些不舒服但说不上是自发痛。这个边界病例测试引擎对牙髓状态判别的敏感度。' },
    target: 'reversible_pulpitis', category: 'tooth', urgency: 'yellow',
    answers: { q_entry: 0, q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 0, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 0, q_universal_stress: 0, q_universal_diet: 0, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P94', name: '牙龈炎vs轻度牙周炎边界病例', profile: { ageGroup: '35岁', gender: '女', desc: '35岁女性，刷牙出血三年了，有一两颗下前牙感觉轻微有动但不是特别明显。探诊有3-4mm袋，X线片显示局部轻微骨吸收。' },
    target: 'gingivitis', category: 'perio', urgency: 'green',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 0, q_perio_mobility: 1, q_universal_age: 1, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 1, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },
  {
    id: 'P95', name: '白斑vs扁平苔藓边界病例', profile: { ageGroup: '52岁', gender: '女', desc: '52岁女性，两颊内侧白色斑块擦不掉，部分区域呈细网状，按压有轻微粗糙感。临床不易判断是白斑还是扁平苔藓。' },
    target: 'lichen_planus', category: 'mucosa', urgency: 'yellow',
    answers: { q_entry: 2, q_mucosa_can_scrape: 1, q_mucosa_white_or_ulcer: 0, q_mucosa_white_risk: 2, q_universal_age: 2, q_universal_gender: 0, q_universal_medical: 2, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 0, q_universal_diet: 3, q_universal_dental_visit: 1, q_universal_fluoride: 1 }
  },

  // --- 健康对照组 (5 cases) ---
  {
    id: 'P96', name: '健康口腔青年对照', profile: { ageGroup: '25岁', gender: '男', desc: '25岁男性，无症状常规检查，口腔卫生优秀，无牙龈出血或牙松动，无龋齿，不抽烟不喝酒。' },
    target: null, category: 'none', urgency: 'green',
    answers: { q_entry: 0, q_pain_spontaneous: 1, q_pain_cold_hot_diff: 0, q_pain_trigger_main: 1, q_universal_age: 1, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 1 }
  },
  {
    id: 'P97', name: '健康口腔中年对照', profile: { ageGroup: '45岁', gender: '女', desc: '45岁女性，定期洗牙，口腔卫生良好，没有牙齿松动或龋齿，饮食均衡坚持运动。' },
    target: null, category: 'none', urgency: 'green',
    answers: { q_entry: 4, q_jaw_recent_extraction: 1, q_jaw_bisphosphonate: 1, q_jaw_pain_or_noise: 1, q_jaw_swelling_meal: 0, q_universal_age: 2, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 1 }
  },
  {
    id: 'P98', name: '健康口腔老年对照', profile: { ageGroup: '68岁', gender: '男', desc: '68岁男性，口腔卫生保持良好，有部分牙缺失但剩余牙齿稳固无龋坏，假牙吻合良好。' },
    target: null, category: 'none', urgency: 'green',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 1, q_hard_dev_color_or_shape: 1, q_universal_age: 3, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 1 }
  },
  {
    id: 'P99', name: '健康口腔青少年对照', profile: { ageGroup: '16岁', gender: '女', desc: '16岁女生，正畸中，口腔卫生优秀每天刷牙用牙线加冲牙器，无龋坏无牙龈炎，氟斑牙无。' },
    target: null, category: 'none', urgency: 'green',
    answers: { q_entry: 3, q_hard_acquired_or_dev: 1, q_hard_dev_color_or_shape: 1, q_universal_age: 1, q_universal_gender: 0, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 3, q_universal_brush: 2, q_universal_stress: 2, q_universal_diet: 3, q_universal_dental_visit: 0, q_universal_fluoride: 0 }
  },
  {
    id: 'P100', name: '综合高风险深度病例', profile: { ageGroup: '55岁', gender: '男', desc: '55岁男性，抽烟30年每天一包喝酒250ml，嚼槟榔10年。口腔多部位白斑、张口缩窄至二指、牙龈大面积萎缩多牙松动、牙颈部楔状缺损、口臭严重。全维度高风险综合测试。' },
    target: 'periodontitis', category: 'perio', urgency: 'red',
    answers: { q_entry: 1, q_perio_necrosis_smell: 1, q_perio_bleeding_type: 1, q_perio_mobility: 0, q_perio_age_rapid: 1, q_universal_age: 2, q_universal_gender: 1, q_universal_medical: 6, q_universal_family: 3, q_universal_smoking: 0, q_universal_brush: 0, q_universal_stress: 0, q_universal_diet: 2, q_universal_dental_visit: 1, q_universal_fluoride: 0 }
  },

];

const CATEGORY_LABELS = {
  tooth: '牙体牙髓',
  perio: '牙周',
  mucosa: '黏膜',
  joint: '颌面/关节/神经',
  other: '其他/系统'
};
const URGENCY_LABELS = {
  green: '绿色（常规）',
  yellow: '黄色（需关注）',
  red: '红色（紧急）'
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PATIENT_CASES, CATEGORY_LABELS, URGENCY_LABELS };
}
