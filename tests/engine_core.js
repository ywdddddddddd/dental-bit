// Regenerated engine core from index.html v2.3 (74 diseases)
'use strict';

const DISEASE_CATEGORIES = {
  "tooth": {
    "label": "牙体牙髓",
    "color": "#f472b6"
  },
  "perio": {
    "label": "牙周",
    "color": "#a78bfa"
  },
  "mucosa": {
    "label": "黏膜",
    "color": "#34d399"
  },
  "joint": {
    "label": "颌面/关节/神经",
    "color": "#fbbf24"
  },
  "other": {
    "label": "其他/系统",
    "color": "#f97316"
  }
};

const DISEASES = {
  "caries_shallow": {
    "name": "浅/中龋",
    "cat": "tooth",
    "urgency": "green",
    "emoji": "🕳️",
    "desc": "咬合面有黑线或小洞，吃甜食时微酸不适。",
    "advice": "尽早补牙充填就好，现在处理花费最少、痛苦最小。",
    "ageRange": [
      3,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "caries_deep"
    ],
    "exclusiveGroup": "caries_spectrum"
  },
  "caries_deep": {
    "name": "深龋",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "🦷",
    "desc": "冷热酸甜刺激时酸痛明显，刺激去掉后就没事了。",
    "advice": "需要尽快补牙，可能要在洞底垫一层材料保护牙神经。",
    "ageRange": [
      3,
      99
    ],
    "genderBias": null,
    "causalParent": "caries_shallow",
    "causalChildren": [
      "irreversible_pulpitis"
    ],
    "exclusiveGroup": "caries_spectrum"
  },
  "dentin_hypersensitivity": {
    "name": "牙本质敏感",
    "cat": "tooth",
    "urgency": "green",
    "emoji": "🧊",
    "desc": "碰到冷热酸甜或刷牙时，牙齿短暂地尖锐刺痛一下。",
    "advice": "用抗敏感牙膏，别横着用力拉锯式刷牙，换成巴氏刷牙法。",
    "ageRange": [
      15,
      70
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "hypersensitivity_wedge"
  },
  "wedge_defect": {
    "name": "楔状缺损",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "🪥",
    "desc": "牙齿和牙龈交界处有一条\"V\"型深沟，碰冷酸不适。",
    "advice": "浅的用脱敏治疗，深的要树脂充填。最关键的是改掉横向拉锯式刷牙的习惯。",
    "ageRange": [
      25,
      70
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "dentin_hypersensitivity"
    ],
    "exclusiveGroup": "hypersensitivity_wedge"
  },
  "cracked_tooth": {
    "name": "牙隐裂",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "⚡",
    "desc": "咬到特定硬物（比如花椒、骨头渣）时突发剧烈刺痛。",
    "advice": "千万不要用这边咬硬东西了！可能需要做个全冠保护起来，严重的话要根管治疗。",
    "ageRange": [
      30,
      70
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "irreversible_pulpitis"
    ],
    "exclusiveGroup": "crack_trauma"
  },
  "irreversible_pulpitis": {
    "name": "急性牙髓炎",
    "cat": "tooth",
    "urgency": "red",
    "emoji": "🔥",
    "desc": "牙自己就疼起来了，晚上疼得更厉害，含冷水可能暂时舒服点。",
    "advice": "赶紧去看牙医做根管治疗（俗称\"抽神经\"），止痛药只能临时顶一下。",
    "ageRange": [
      6,
      99
    ],
    "genderBias": null,
    "causalParent": "caries_deep",
    "causalChildren": [
      "apical_periodontitis",
      "pulp_necrosis"
    ],
    "exclusiveGroup": "pulp_pathosis"
  },
  "apical_periodontitis": {
    "name": "根尖周炎",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "🎈",
    "desc": "牙齿感觉\"浮起来了\"，比别的牙高一截，不敢咬东西，牙龈可能反复鼓脓包。",
    "advice": "需要做彻底的根管治疗，严重的话可能还需要根尖手术。",
    "ageRange": [
      6,
      99
    ],
    "genderBias": null,
    "causalParent": "irreversible_pulpitis",
    "causalChildren": [
      "osteomyelitis_jaw"
    ],
    "exclusiveGroup": "pulp_pathosis"
  },
  "pulp_necrosis": {
    "name": "牙髓坏死",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "⚫",
    "desc": "牙齿颜色发灰/发黄，对冷热已经没什么感觉了，但牙龈可能反复起包。",
    "advice": "需要根管治疗或者拔掉做种植/镶牙，拖着不处理可能引起颌骨感染。",
    "ageRange": [
      6,
      99
    ],
    "genderBias": null,
    "causalParent": "irreversible_pulpitis",
    "causalChildren": [
      "apical_periodontitis"
    ],
    "exclusiveGroup": "pulp_pathosis"
  },
  "residual_root": {
    "name": "残根残冠",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "🏚️",
    "desc": "牙齿蛀得只剩下牙根露在外面了。",
    "advice": "牙根要是还健康可以打桩做冠修复，不行的话就拔掉种牙或镶牙。",
    "ageRange": [
      20,
      99
    ],
    "genderBias": null,
    "causalParent": "caries_deep",
    "causalChildren": [],
    "exclusiveGroup": "caries_spectrum"
  },
  "dental_erosion": {
    "name": "牙酸蚀症",
    "cat": "tooth",
    "urgency": "green",
    "emoji": "🥤",
    "desc": "牙齿表面有光滑的凹陷，变透明了，舌侧比较明显。",
    "advice": "碳酸饮料和酸性食物尽量用吸管喝，平时用含氟牙膏。",
    "ageRange": [
      10,
      60
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "dentin_hypersensitivity"
    ],
    "exclusiveGroup": "erosion_abrasion"
  },
  "caries_recurrent": {
    "name": "继发龋",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "🔁",
    "desc": "以前补过的那颗牙边缘又变黑了，或者补的材料有点松动了。",
    "advice": "需要把旧的充填材料去掉，重新补一次。",
    "ageRange": [
      10,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "caries_deep"
    ],
    "exclusiveGroup": "caries_spectrum"
  },
  "caries_rampant": {
    "name": "猛性龋/放疗龋",
    "cat": "tooth",
    "urgency": "red",
    "emoji": "🦷",
    "desc": "短时间内好几颗牙一起快速蛀坏，常见于头颈部放疗后或严重口干的情况。",
    "advice": "需要紧急口腔综合治疗！如果是因为要放疗，放疗前一定要先做口腔预处理。",
    "ageRange": [
      30,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "residual_root"
    ],
    "exclusiveGroup": "caries_spectrum"
  },
  "root_resorption": {
    "name": "牙根吸收",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "📉",
    "desc": "牙齿表面看不出明显蛀牙，但慢慢变松了，拍片子看到牙根变短了。",
    "advice": "要去拍牙片才能确诊，明确了原因再制定方案。",
    "ageRange": [
      10,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "resorption_trauma"
  },
  "dens_evaginatus": {
    "name": "畸形中央尖",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "🔺",
    "desc": "牙齿咬合面中央多了一个尖尖的小突起，容易折断导致牙神经暴露。",
    "advice": "可以分次磨掉或用树脂加固保护，如果已经感染了就需要根管治疗。",
    "ageRange": [
      8,
      25
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "irreversible_pulpitis",
      "apical_periodontitis"
    ],
    "exclusiveGroup": "developmental_tooth"
  },
  "enamel_hypoplasia": {
    "name": "牙釉质发育不全",
    "cat": "tooth",
    "urgency": "green",
    "emoji": "🦷",
    "desc": "牙齿表面有带状或小坑状的缺陷，颜色也不大正常，是小时候长牙时形成的。",
    "advice": "如果觉得影响美观可以做贴面或牙冠，平时注意防蛀。",
    "ageRange": [
      3,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "developmental_tooth"
  },
  "gingivitis": {
    "name": "牙龈炎",
    "cat": "perio",
    "urgency": "green",
    "emoji": "🩸",
    "desc": "牙龈发红发肿，刷牙时会出血，但牙齿还没有松动。",
    "advice": "去洗个牙就好了！平时好好刷牙，学会用牙线，完全可以恢复。",
    "ageRange": [
      3,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "periodontitis"
    ],
    "exclusiveGroup": "perio_spectrum"
  },
  "periodontitis": {
    "name": "慢性牙周炎",
    "cat": "perio",
    "urgency": "yellow",
    "emoji": "🍂",
    "desc": "牙龈萎缩、牙根露出来了，牙齿有点松动，有口臭。",
    "advice": "需要进行系统的牙周刮治，之后定期维护，这是口腔的\"隐形杀手\"不能拖。",
    "ageRange": [
      25,
      99
    ],
    "genderBias": null,
    "causalParent": "gingivitis",
    "causalChildren": [],
    "exclusiveGroup": "perio_spectrum"
  },
  "aggressive_periodontitis": {
    "name": "侵袭性牙周炎",
    "cat": "perio",
    "urgency": "red",
    "emoji": "🧬",
    "desc": "年纪不大就多颗牙快速松动脱落，牙菌斑看起来不多但破坏很严重，常有家族遗传。",
    "advice": "马上找牙周专科医生！常常需要抗生素配合治疗。",
    "ageRange": [
      10,
      40
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "perio_spectrum"
  },
  "puberty_gingivitis": {
    "name": "青春期龈炎",
    "cat": "perio",
    "urgency": "green",
    "emoji": "🧑",
    "desc": "青春期牙龈红肿得比较厉害，刷牙容易出血，跟体内激素变化有关。",
    "advice": "加强口腔清洁就好，青春期过了大部分会缓解，必要时去洗个牙。",
    "ageRange": [
      10,
      18
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "perio_spectrum"
  },
  "pregnancy_gingivitis": {
    "name": "妊娠期龈炎/龈瘤",
    "cat": "perio",
    "urgency": "green",
    "emoji": "🤰",
    "desc": "怀孕后牙龈红肿、容易出血，有时还长出小肉瘤一样的东西。",
    "advice": "激素变化引起的，生完宝宝一般就好了。孕期也要注意口腔卫生，可以定期产检时顺便看看牙。",
    "ageRange": [
      18,
      50
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "perio_spectrum"
  },
  "gingival_hyperplasia": {
    "name": "药物性牙龈增生",
    "cat": "perio",
    "urgency": "green",
    "emoji": "🥩",
    "desc": "牙龈肥大变厚快把牙齿盖住了，和长期吃降压药/抗癫痫药/环孢素有关。",
    "advice": "排查一下正在吃的药，注意口腔清洁，实在严重可以考虑手术修整。",
    "ageRange": [
      30,
      80
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "perio_spectrum"
  },
  "pericoronitis": {
    "name": "智齿冠周炎",
    "cat": "perio",
    "urgency": "yellow",
    "emoji": "🤕",
    "desc": "最里面那颗牙的牙龈肿痛，吞咽都疼，严重的时候嘴都张不开。",
    "advice": "先用漱口水冲洗消炎，炎症控制后强烈建议把这颗智齿拔掉！",
    "ageRange": [
      16,
      35
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "pericoronitis_impaction"
  },
  "oral_ulcer": {
    "name": "复发性阿弗他溃疡",
    "cat": "mucosa",
    "urgency": "green",
    "emoji": "😖",
    "desc": "嘴巴里长了圆形的小坑，表面黄白色，周围一圈红红的，碰着就疼。",
    "advice": "一般1-2周自己就好了。注意休息别熬夜，多吃蔬菜水果补充维生素。",
    "ageRange": [
      6,
      60
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_ulcerative"
  },
  "herpes_stomatitis": {
    "name": "疱疹性口炎",
    "cat": "mucosa",
    "urgency": "yellow",
    "emoji": "🦠",
    "desc": "嘴巴里出现成簇的小水疱，破了以后连成一片烂了，嘴唇和上颚比较常见。",
    "advice": "病毒感染，要注意别传染给家人（餐具毛巾分开），可以用抗病毒药治疗。",
    "ageRange": [
      1,
      40
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_vesicular"
  },
  "leukoplakia": {
    "name": "口腔白斑",
    "cat": "mucosa",
    "urgency": "red",
    "emoji": "⬜",
    "desc": "口腔黏膜上有擦不掉的白色斑块，可能摸着有点粗糙。长期吸烟喝酒的人风险更高。",
    "advice": "这是癌前病变的信号！一定要去口腔黏膜科做活检，之后定期复查。",
    "ageRange": [
      35,
      80
    ],
    "genderBias": "male",
    "causalParent": null,
    "causalChildren": [
      "oral_cancer"
    ],
    "exclusiveGroup": "mucosa_white"
  },
  "oral_cancer": {
    "name": "口腔鳞状细胞癌",
    "cat": "mucosa",
    "urgency": "red",
    "emoji": "⚠️",
    "desc": "口腔里有超过两三周还不愈合的溃疡、或者菜花样肿物、硬块、疼痛麻木。",
    "advice": "马上去口腔颌面外科或头颈外科！这类问题越早治效果越好。",
    "ageRange": [
      40,
      80
    ],
    "genderBias": "male",
    "causalParent": "leukoplakia",
    "causalChildren": [],
    "exclusiveGroup": "mucosa_malignant"
  },
  "candidiasis": {
    "name": "口腔念珠菌病（鹅口疮）",
    "cat": "mucosa",
    "urgency": "yellow",
    "emoji": "🍄",
    "desc": "嘴里有一层像奶酪一样的白膜，能擦掉，擦掉后下面红红的。老人、免疫力差的、戴假牙的人更容易得。",
    "advice": "用抗真菌的漱口水或药，假牙要好好清洁。同时要排查一下免疫力方面的问题。",
    "ageRange": [
      0,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_infectious"
  },
  "geographic_tongue": {
    "name": "地图舌",
    "cat": "mucosa",
    "urgency": "green",
    "emoji": "🗺️",
    "desc": "舌头上有游走的红斑和白色边缘，形状会变来变去，像地图一样，一般没啥感觉。",
    "advice": "这是良性的，没什么大事，不用特殊治疗，少吃辛辣刺激的就好了。",
    "ageRange": [
      3,
      70
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_tongue"
  },
  "lichen_planus": {
    "name": "口腔扁平苔藓",
    "cat": "mucosa",
    "urgency": "yellow",
    "emoji": "🕸️",
    "desc": "嘴巴两颊内侧有白色网状条纹，有时候还会糜烂，反反复复，中年女性比较多见。",
    "advice": "跟免疫功能有关，需要定期复查，虽然恶变几率很低但不能完全不管。",
    "ageRange": [
      30,
      70
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [
      "oral_cancer"
    ],
    "exclusiveGroup": "mucosa_white"
  },
  "osf": {
    "name": "口腔黏膜下纤维化",
    "cat": "mucosa",
    "urgency": "red",
    "emoji": "🚫",
    "desc": "口腔黏膜变白变硬，张口越来越困难，和嚼槟榔有直接关系。",
    "advice": "癌前病变警告！马上停止嚼槟榔，去口腔黏膜科接受专科治疗。",
    "ageRange": [
      20,
      55
    ],
    "genderBias": "male",
    "causalParent": null,
    "causalChildren": [
      "oral_cancer"
    ],
    "exclusiveGroup": "mucosa_white"
  },
  "burning_mouth": {
    "name": "灼口综合征",
    "cat": "mucosa",
    "urgency": "green",
    "emoji": "🔥",
    "desc": "嘴巴里持续有烧灼感，但照镜子看黏膜外观完全正常，更年期女性比较多见。",
    "advice": "先排除其他器质性问题，这个病和心理因素、内分泌关系较大，对症处理就好。",
    "ageRange": [
      40,
      75
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_neuropathic"
  },
  "angular_cheilitis": {
    "name": "口角炎",
    "cat": "mucosa",
    "urgency": "green",
    "emoji": "😬",
    "desc": "嘴角发红、裂开、起皮结痂，一张嘴说话就疼。",
    "advice": "涂点抗真菌加抗菌的药膏，补充B族维生素，别老用舌头去舔。",
    "ageRange": [
      3,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_infectious"
  },
  "pemphigus": {
    "name": "天疱疮",
    "cat": "mucosa",
    "urgency": "red",
    "emoji": "🫧",
    "desc": "口腔大面积糜烂，皮肤上也可能出现松弛的水疱，一推就破。",
    "advice": "严重的自身免疫病！马上去皮肤科或口腔黏膜科，需要用激素类药物系统治疗。",
    "ageRange": [
      30,
      70
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_autoimmune"
  },
  "tmd": {
    "name": "颞下颌关节紊乱(TMD)",
    "cat": "joint",
    "urgency": "green",
    "emoji": "🗣️",
    "desc": "张嘴闭嘴时耳朵前方的关节咔咔响，咀嚼时觉得酸胀。",
    "advice": "少咬硬东西，别大张口，局部热敷，放松心情，大部分可以自己好。",
    "ageRange": [
      15,
      55
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "tmj_spectrum"
  },
  "bruxism": {
    "name": "夜磨牙/紧咬牙",
    "cat": "joint",
    "urgency": "yellow",
    "emoji": "😬",
    "desc": "早上醒来腮帮子酸痛，牙齿磨损得厉害，家人可能告诉你晚上磨牙。",
    "advice": "精神压力是主要原因，建议定做一个夜磨牙垫保护牙齿。",
    "ageRange": [
      15,
      65
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "tmd",
      "cracked_tooth",
      "wedge_defect"
    ],
    "exclusiveGroup": "tmj_spectrum"
  },
  "trigeminal_neuralgia": {
    "name": "三叉神经痛",
    "cat": "joint",
    "urgency": "yellow",
    "emoji": "💢",
    "desc": "脸上像闪电或刀割一样突然剧痛，洗脸刷牙都可能触发，疼几秒到几分钟。",
    "advice": "很容易被误当牙痛拔错牙！要去神经内科确诊，有一种叫卡马西平的药对控制这个痛很有效。",
    "ageRange": [
      40,
      80
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "neuropathic_pain"
  },
  "atypical_odontalgia": {
    "name": "非典型性牙痛",
    "cat": "joint",
    "urgency": "yellow",
    "emoji": "🦷",
    "desc": "牙齿持续闷痛，说不出具体哪颗牙，牙科检查也找不到原因。",
    "advice": "排除了牙齿本身的问题后，要考虑是神经性的，某些抗抑郁药可能有帮助。",
    "ageRange": [
      25,
      60
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "neuropathic_pain"
  },
  "trauma": {
    "name": "牙齿外伤",
    "cat": "joint",
    "urgency": "red",
    "emoji": "💥",
    "desc": "撞到或者摔倒后牙齿折断、松动或者整颗掉出来了。",
    "advice": "如果整颗牙掉出来了，把它泡在牛奶里或者含在嘴里，30分钟内赶到医院急诊！",
    "ageRange": [
      3,
      99
    ],
    "genderBias": "male",
    "causalParent": null,
    "causalChildren": [
      "pulp_necrosis",
      "residual_root"
    ],
    "exclusiveGroup": "crack_trauma"
  },
  "dry_socket": {
    "name": "干槽症",
    "cat": "joint",
    "urgency": "red",
    "emoji": "💀",
    "desc": "拔牙后第2-3天突然疼得要命，止痛药完全没用，还有一股恶臭。",
    "advice": "不要自己扛！立刻回医院找医生，需要在麻醉下清创换药。",
    "ageRange": [
      16,
      99
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "post_extraction"
  },
  "malocclusion": {
    "name": "错颌畸形",
    "cat": "joint",
    "urgency": "green",
    "emoji": "🧩",
    "desc": "牙齿排列不齐，咬合关系不对，脸型也不大对称。",
    "advice": "儿童期矫正效果最好，成年人也可以通过正畸来改善。",
    "ageRange": [
      3,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "tmd"
    ],
    "exclusiveGroup": "developmental_jaw"
  },
  "sialolithiasis": {
    "name": "涎石症（唾液腺结石）",
    "cat": "joint",
    "urgency": "yellow",
    "emoji": "🪨",
    "desc": "一吃饭时腮帮子或者下巴下面就肿起来疼，吃完过一会儿又消下去了。",
    "advice": "小的结石可能自己排出来，大的需要手术取石。",
    "ageRange": [
      25,
      65
    ],
    "genderBias": "male",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "salivary"
  },
  "parotitis": {
    "name": "腮腺炎",
    "cat": "joint",
    "urgency": "yellow",
    "emoji": "🐹",
    "desc": "耳垂下方肿起来，按压会痛，可能还发烧全身没劲。",
    "advice": "要区分是病毒性的还是细菌性的，保持口腔卫生，吃清淡的。",
    "ageRange": [
      3,
      60
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "salivary"
  },
  "sinusitis_odontogenic": {
    "name": "牙源性上颌窦炎",
    "cat": "joint",
    "urgency": "yellow",
    "emoji": "🤧",
    "desc": "一边的上排后牙疼，同时这边鼻子堵、流黄色脓鼻涕。",
    "advice": "需要牙齿和鼻窦两个问题一起处理才行。",
    "ageRange": [
      20,
      70
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "sinus_dental"
  },
  "osteomyelitis_jaw": {
    "name": "颌骨骨髓炎",
    "cat": "joint",
    "urgency": "red",
    "emoji": "🦴",
    "desc": "颌骨区域持续剧痛、脸肿、发烧、牙齿松动、下嘴唇发麻。",
    "advice": "非常严重的感染！需要马上住院，用抗生素加手术清创。",
    "ageRange": [
      20,
      80
    ],
    "genderBias": "male",
    "causalParent": "apical_periodontitis",
    "causalChildren": [],
    "exclusiveGroup": "osteomyelitis"
  },
  "halitosis": {
    "name": "非口源性口臭",
    "cat": "other",
    "urgency": "green",
    "emoji": "🤢",
    "desc": "口腔清洁做得挺好但口臭还是很重，可能伴有反酸、胃胀。",
    "advice": "建议去看消化内科，查一下有没有幽门螺杆菌或者胃食管反流。",
    "ageRange": [
      15,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "systemic"
  },
  "fluorosis": {
    "name": "氟斑牙",
    "cat": "other",
    "urgency": "green",
    "emoji": "🟤",
    "desc": "牙齿上有白垩色或黄褐色的斑块，跟小时候（8岁前）生活的地方水里含氟量偏高有关。",
    "advice": "觉得影响美观可以做贴面或牙冠。这个和四环素牙虽然看起来像，但形成原因完全不同。",
    "ageRange": [
      3,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "developmental_tooth"
  },
  "tetracycline_teeth": {
    "name": "四环素牙",
    "cat": "other",
    "urgency": "green",
    "emoji": "🟫",
    "desc": "牙齿呈灰黄或灰褐色，跟小时候生病吃过四环素类药物有关。",
    "advice": "贴面或牙冠可以改善外观。和氟斑牙虽然颜色有点像，但病因完全不同。",
    "ageRange": [
      10,
      80
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "developmental_tooth"
  },
  "xerostomia": {
    "name": "口干症",
    "cat": "other",
    "urgency": "yellow",
    "emoji": "🏜️",
    "desc": "长期口干舌燥，喝很多水也不管用，说话久了就难受，还容易蛀牙。",
    "advice": "要排查干燥综合征、糖尿病或者是不是吃的药有副作用。平时嚼点无糖口香糖可以刺激口水分泌。",
    "ageRange": [
      40,
      85
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [
      "caries_rampant",
      "candidiasis",
      "burning_mouth"
    ],
    "exclusiveGroup": "systemic"
  },
  "reversible_pulpitis": {
    "name": "可复性牙髓炎",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "🦷",
    "desc": "冷热刺激引起尖锐疼痛，刺激去掉后疼痛立马消失，没有自己疼过。",
    "advice": "把引发刺激的原因去掉（比如深龋补上、充填体调整），牙神经是可以恢复正常的。要是发展成自己会疼了就得根管治疗了。",
    "ageRange": [
      6,
      70
    ],
    "genderBias": null,
    "causalParent": "caries_deep",
    "causalChildren": [
      "irreversible_pulpitis"
    ],
    "exclusiveGroup": "pulp_pathosis"
  },
  "pulp_calcification": {
    "name": "牙髓钙化/髓石",
    "cat": "tooth",
    "urgency": "green",
    "emoji": "🪨",
    "desc": "牙齿没啥原因就阵发性放射痛，有点像三叉神经痛，但拍片子能看到髓腔里有钙化的小石头。",
    "advice": "拍张牙片确诊，症状明显的需要做根管治疗把髓石取出来。",
    "ageRange": [
      30,
      70
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "pulp_pathosis"
  },
  "internal_resorption": {
    "name": "牙内吸收",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "🩷",
    "desc": "牙冠出现粉红色（\"粉红牙\"），牙髓腔里的组织在破坏性吸收，拍片子看到髓腔变大了。",
    "advice": "赶紧做根管治疗阻止继续吸收，不然牙齿可能会裂掉。",
    "ageRange": [
      15,
      60
    ],
    "genderBias": null,
    "causalParent": "trauma",
    "causalChildren": [
      "residual_root"
    ],
    "exclusiveGroup": "resorption_trauma"
  },
  "dentinogenesis_imperfecta": {
    "name": "遗传性牙本质发育不全",
    "cat": "tooth",
    "urgency": "green",
    "emoji": "🦷",
    "desc": "满口牙呈半透明琥珀色或灰蓝色，牙釉质容易剥落，牙本质露出来后磨得很快。家族里通常还有别人也有。",
    "advice": "用全冠把牙齿保护起来，定期检查。这个有明确的家族遗传。",
    "ageRange": [
      3,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "tooth_wear_attrition"
    ],
    "exclusiveGroup": "developmental_tooth"
  },
  "vertical_root_fracture": {
    "name": "牙根纵裂",
    "cat": "tooth",
    "urgency": "red",
    "emoji": "⚡",
    "desc": "根管治疗后的牙持续钝痛/咬合痛，拍片看到根旁边有\"J形\"或一圈透光影。",
    "advice": "多数情况下这颗牙保不住了需要拔掉，少数可以尝试根管内粘接修复。",
    "ageRange": [
      30,
      75
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "apical_periodontitis"
    ],
    "exclusiveGroup": "crack_trauma"
  },
  "tooth_wear_attrition": {
    "name": "牙齿磨损/磨耗",
    "cat": "tooth",
    "urgency": "green",
    "emoji": "🪥",
    "desc": "咬合面的牙体组织均匀变少，牙本质露出来呈淡黄色，嚼东西可能酸胀，对冷热也敏感。",
    "advice": "晚上磨牙的话要配戴磨牙垫，磨损严重的可以做全冠把咬合高度恢复。",
    "ageRange": [
      30,
      80
    ],
    "genderBias": "male",
    "causalParent": "bruxism",
    "causalChildren": [
      "dentin_hypersensitivity",
      "tmd"
    ],
    "exclusiveGroup": "erosion_abrasion"
  },
  "anug": {
    "name": "急性坏死性溃疡性龈炎(ANUG)",
    "cat": "perio",
    "urgency": "red",
    "emoji": "☠️",
    "desc": "牙龈疼得要命、龈乳头像被\"挖掉\"一样烂掉、自己就出血、嘴巴里一股腐败臭味。常跟精神压力大/抽烟有关。",
    "advice": "马上去牙周科！用双氧水冲洗加上吃甲硝唑，先把感染控制住再洗牙。",
    "ageRange": [
      15,
      35
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "perio_necrotizing"
  },
  "gingival_fibromatosis": {
    "name": "遗传性牙龈纤维瘤病",
    "cat": "perio",
    "urgency": "green",
    "emoji": "🥩",
    "desc": "牙龈大范围增生把牙都快盖住了，质地很硬韧，颜色倒还正常，家里往往还有人有这个情况。",
    "advice": "需要做牙龈成形手术切掉增生的部分，术后一定得好好清洁不然容易复发。",
    "ageRange": [
      3,
      40
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "periodontitis"
    ],
    "exclusiveGroup": "perio_hyperplastic"
  },
  "epulis": {
    "name": "牙龈瘤",
    "cat": "perio",
    "urgency": "yellow",
    "emoji": "🔴",
    "desc": "牙龈上长了个孤立的肉疙瘩，常见在牙缝之间的牙龈，女性比较多见，跟局部刺激或激素有关。",
    "advice": "手术完整切掉（包括骨膜），把牙周膜刮干净防复发。要是反复复发可能得拔掉那颗牙。",
    "ageRange": [
      20,
      55
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "perio_hyperplastic"
  },
  "acute_gingival_papillitis": {
    "name": "急性龈乳头炎",
    "cat": "perio",
    "urgency": "green",
    "emoji": "🦷",
    "desc": "个别牙缝之间牙龈红肿跳着疼，一碰就很痛，常是食物塞牙或者牙签戳伤引起的。",
    "advice": "把塞着的东西弄出来，双氧水冲一下，涂点碘甘油，一般一两天就好了。",
    "ageRange": [
      6,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "perio_acute"
  },
  "perio_endo_lesion": {
    "name": "牙周-牙髓联合病变",
    "cat": "perio",
    "urgency": "red",
    "emoji": "⚠️",
    "desc": "同一颗牙同时有很深的牙周袋和牙髓问题，两个病互相通着，牙龈反复排脓，牙神经活力也不正常。",
    "advice": "需要根管治疗和牙周治疗一起做，多根牙的话预后不太乐观。",
    "ageRange": [
      25,
      75
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "apical_periodontitis"
    ],
    "exclusiveGroup": "perio_complex"
  },
  "furcation_involvement": {
    "name": "根分叉病变",
    "cat": "perio",
    "urgency": "yellow",
    "emoji": "🔱",
    "desc": "多根牙的根分叉部位骨头吸收了，用探针能伸进分叉里，常伴有牙龈反复鼓脓包。",
    "advice": "根据分叉受累程度，可能需要做成形术、隧道术、切半术甚至拔掉。",
    "ageRange": [
      35,
      75
    ],
    "genderBias": null,
    "causalParent": "periodontitis",
    "causalChildren": [
      "perio_endo_lesion"
    ],
    "exclusiveGroup": "perio_complex"
  },
  "periodontal_abscess": {
    "name": "牙周脓肿",
    "cat": "perio",
    "urgency": "red",
    "emoji": "🩹",
    "desc": "牙周袋的壁急性化脓了，牙龈鼓起半球形红肿，能摸到波动感，疼得厉害，牙有浮出感。",
    "advice": "挂急诊切开引流放脓，吃点抗生素，等炎症消了再做牙周系统治疗。",
    "ageRange": [
      25,
      75
    ],
    "genderBias": null,
    "causalParent": "periodontitis",
    "causalChildren": [],
    "exclusiveGroup": "perio_acute"
  },
  "gingival_recession": {
    "name": "牙龈退缩",
    "cat": "perio",
    "urgency": "green",
    "emoji": "🍂",
    "desc": "牙龈往牙根方向退了，牙根露出来，牙齿看起来\"变长了\"，可能伴有冷酸敏感和根面蛀牙。",
    "advice": "轻的脱敏治疗就好，重的可以做植牙龈手术把根面盖住。换个软毛牙刷用巴氏刷牙法。",
    "ageRange": [
      25,
      80
    ],
    "genderBias": null,
    "causalParent": "periodontitis",
    "causalChildren": [
      "dentin_hypersensitivity",
      "root_caries"
    ],
    "exclusiveGroup": "perio_spectrum"
  },
  "behcet_disease": {
    "name": "白塞病（口-眼-生殖器三联症）",
    "cat": "mucosa",
    "urgency": "red",
    "emoji": "🔴",
    "desc": "反反复复口腔溃疡，加上生殖器也长溃疡，眼睛反复发炎红肿（葡萄膜炎），还可能伴皮肤红斑、关节痛。",
    "advice": "需要风湿免疫科和口腔黏膜科一起看，用免疫调节剂全身治疗。口腔溃疡是这个病最基本的表现。",
    "ageRange": [
      20,
      45
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_systemic"
  },
  "erythema_multiforme": {
    "name": "多形红斑",
    "cat": "mucosa",
    "urgency": "red",
    "emoji": "🎯",
    "desc": "嘴里大面积糜烂、嘴唇上全是厚厚的血痂，皮肤上出现\"靶子一样的\"环形红斑。可能是吃了某种药或感染诱发的。",
    "advice": "赶紧停掉可疑的药！严重的（Stevens-Johnson综合征）需要住院用激素治疗。",
    "ageRange": [
      15,
      45
    ],
    "genderBias": "male",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_systemic"
  },
  "hfmd": {
    "name": "手-足-口病",
    "cat": "mucosa",
    "urgency": "yellow",
    "emoji": "🖐️",
    "desc": "发烧加上手心脚底长了红色疹子或小水疱，嘴里也有散在的小水疱溃疡。小朋友多见，是肠道病毒引起的。",
    "advice": "在家隔离休息，多喝水，一般7到10天自己就好了。需要和疱疹性口炎区分开来。",
    "ageRange": [
      0,
      12
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_vesicular"
  },
  "traumatic_ulcer": {
    "name": "创伤性溃疡",
    "cat": "mucosa",
    "urgency": "green",
    "emoji": "🪥",
    "desc": "溃疡的形状正好和创伤来源对得上（比如残根尖戳的、自己咬的），去掉刺激后一到两周就好了。",
    "advice": "把创伤来源去掉，局部抹点药保护一下。超过两周还不好就要去活检排除恶变了。",
    "ageRange": [
      0,
      99
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_ulcerative"
  },
  "allergic_stomatitis": {
    "name": "过敏性口炎",
    "cat": "mucosa",
    "urgency": "yellow",
    "emoji": "🤧",
    "desc": "换了新牙膏/漱口水/吃了某种食物或药之后，嘴里出现红斑、水肿、糜烂或水疱。",
    "advice": "马上停掉可疑的东西，吃点抗过敏药。严重的（比如嘴唇喉咙水肿呼吸困难）要挂急诊！",
    "ageRange": [
      6,
      70
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_allergic"
  },
  "lupus_erythematosus_oral": {
    "name": "盘状红斑狼疮（口腔型）",
    "cat": "mucosa",
    "urgency": "yellow",
    "emoji": "🦋",
    "desc": "嘴里有中央萎缩发红的斑、周围放射状白纹、边缘能看到扩张的小血管。唇红部位最多见。",
    "advice": "注意防晒，局部抹激素药膏。得去皮肤科或风湿科查一下有没有影响到全身。",
    "ageRange": [
      25,
      55
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_autoimmune"
  },
  "pemphigoid": {
    "name": "类天疱疮（瘢痕性/大疱性）",
    "cat": "mucosa",
    "urgency": "red",
    "emoji": "🫧",
    "desc": "牙龈大面积脱皮发红像被\"烫掉一层皮\"（剥脱性龈炎），水疱没那么容易破（和天疱疮不一样），眼睛也可能受影响留疤。",
    "advice": "口腔黏膜科加眼科一起看，需要用免疫抑制剂全身治疗。牙龈脱皮烂是口腔里最早出现的表现。",
    "ageRange": [
      40,
      80
    ],
    "genderBias": "female",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_autoimmune"
  },
  "radiation_stomatitis": {
    "name": "放射性口炎",
    "cat": "mucosa",
    "urgency": "red",
    "emoji": "☢️",
    "desc": "头颈部放疗后嘴里全部发红、糜烂、疼得吃不了东西、口干得厉害。",
    "advice": "放疗前一定要把口腔问题处理好！放疗期间做好口腔护理、止痛、营养支持。",
    "ageRange": [
      40,
      80
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "xerostomia",
      "caries_rampant",
      "candidiasis"
    ],
    "exclusiveGroup": "mucosa_infectious"
  },
  "mronj": {
    "name": "药物相关性颌骨坏死(MRONJ)",
    "cat": "joint",
    "urgency": "red",
    "emoji": "🦴",
    "desc": "正在用或曾用过双膦酸盐/地舒单抗（治疗骨质疏松或骨转移的药），颌骨露出来了超过8周不愈合，可能伴有疼痛流脓。",
    "advice": "马上去口腔颌面外科！用这类药之前一定要先完成所有口腔治疗，用药期间绝对不能拔牙。",
    "ageRange": [
      50,
      85
    ],
    "genderBias": null,
    "causalParent": null,
    "causalChildren": [
      "osteomyelitis_jaw"
    ],
    "exclusiveGroup": "osteomyelitis"
  },
  "garre_osteomyelitis": {
    "name": "Garré骨髓炎（增生性骨膜炎）",
    "cat": "joint",
    "urgency": "yellow",
    "emoji": "🦴",
    "desc": "下颌骨不疼但硬邦邦地肿起来了，拍片子看到骨皮质外面有\"洋葱皮\"一样的新骨。小孩和青少年比较多见。",
    "advice": "把感染来源的牙处理掉（通常是下排大牙的根尖周炎），配合用抗生素。",
    "ageRange": [
      5,
      20
    ],
    "genderBias": null,
    "causalParent": "apical_periodontitis",
    "causalChildren": [],
    "exclusiveGroup": "osteomyelitis"
  },
  "root_caries": {
    "name": "根面龋",
    "cat": "tooth",
    "urgency": "yellow",
    "emoji": "🪥",
    "desc": "牙龈退缩后露出来的牙根表面变软、颜色变黄褐色，发展起来很快，老年人和口干的人最容易得。",
    "advice": "涂含氟保护漆加树脂充填，控制好口干问题，加强牙根面的清洁。",
    "ageRange": [
      45,
      99
    ],
    "genderBias": null,
    "causalParent": "gingival_recession",
    "causalChildren": [
      "caries_deep",
      "pulp_necrosis"
    ],
    "exclusiveGroup": "caries_spectrum"
  },
  "oral_lymphoma": {
    "name": "口腔淋巴瘤（结外型）",
    "cat": "mucosa",
    "urgency": "red",
    "emoji": "🟣",
    "desc": "口腔黏膜或牙龈上不明原因肿起来、溃烂、坏死，质地偏软，按常规治疗怎么都不好，可能还发烧盗汗变瘦。",
    "advice": "赶紧做活检确诊，需要血液科或肿瘤科综合治疗。淋巴瘤有可能最先出现在口腔里。",
    "ageRange": [
      40,
      75
    ],
    "genderBias": "male",
    "causalParent": null,
    "causalChildren": [],
    "exclusiveGroup": "mucosa_malignant"
  }
};

const DISEASE_GRAPH = {
  "causalChains": [
    [
      "caries_shallow",
      "caries_deep",
      "irreversible_pulpitis",
      "apical_periodontitis"
    ],
    [
      "caries_deep",
      "irreversible_pulpitis",
      "pulp_necrosis",
      "apical_periodontitis"
    ],
    [
      "apical_periodontitis",
      "osteomyelitis_jaw"
    ],
    [
      "gingivitis",
      "periodontitis"
    ],
    [
      "leukoplakia",
      "oral_cancer"
    ],
    [
      "lichen_planus",
      "oral_cancer"
    ],
    [
      "osf",
      "oral_cancer"
    ],
    [
      "bruxism",
      "tmd",
      "cracked_tooth",
      "wedge_defect"
    ],
    [
      "xerostomia",
      "caries_rampant",
      "candidiasis"
    ],
    [
      "dental_erosion",
      "dentin_hypersensitivity"
    ],
    [
      "reversible_pulpitis",
      "irreversible_pulpitis",
      "apical_periodontitis"
    ],
    [
      "internal_resorption",
      "residual_root"
    ],
    [
      "dentinogenesis_imperfecta",
      "tooth_wear_attrition",
      "dentin_hypersensitivity"
    ],
    [
      "gingival_recession",
      "root_caries",
      "caries_deep",
      "pulp_necrosis"
    ],
    [
      "periodontitis",
      "furcation_involvement",
      "perio_endo_lesion"
    ],
    [
      "periodontitis",
      "periodontal_abscess"
    ],
    [
      "radiation_stomatitis",
      "xerostomia",
      "caries_rampant"
    ],
    [
      "apical_periodontitis",
      "garre_osteomyelitis"
    ],
    [
      "vertical_root_fracture",
      "apical_periodontitis"
    ],
    [
      "mronj",
      "osteomyelitis_jaw"
    ]
  ],
  "mutualExclusionGroups": [
    [
      "caries_shallow",
      "caries_deep",
      "residual_root",
      "caries_recurrent",
      "caries_rampant"
    ],
    [
      "irreversible_pulpitis",
      "dentin_hypersensitivity",
      "pulp_necrosis"
    ],
    [
      "gingivitis",
      "periodontitis",
      "aggressive_periodontitis",
      "puberty_gingivitis",
      "pregnancy_gingivitis"
    ],
    [
      "leukoplakia",
      "lichen_planus",
      "osf"
    ],
    [
      "oral_ulcer",
      "pemphigus",
      "herpes_stomatitis"
    ],
    [
      "tmd",
      "trigeminal_neuralgia",
      "atypical_odontalgia"
    ],
    [
      "fluorosis",
      "tetracycline_teeth",
      "enamel_hypoplasia"
    ],
    [
      "parotitis",
      "sialolithiasis"
    ],
    [
      "irreversible_pulpitis",
      "pulp_necrosis",
      "pulp_calcification"
    ],
    [
      "anug",
      "gingivitis",
      "periodontitis"
    ],
    [
      "gingival_hyperplasia",
      "gingival_fibromatosis",
      "epulis"
    ],
    [
      "behcet_disease",
      "erythema_multiforme",
      "pemphigus",
      "pemphigoid",
      "lupus_erythematosus_oral"
    ],
    [
      "traumatic_ulcer",
      "oral_ulcer",
      "behcet_disease",
      "oral_cancer"
    ],
    [
      "osteomyelitis_jaw",
      "garre_osteomyelitis",
      "mronj"
    ],
    [
      "dental_erosion",
      "tooth_wear_attrition",
      "wedge_defect"
    ],
    [
      "fluorosis",
      "tetracycline_teeth",
      "enamel_hypoplasia",
      "dentinogenesis_imperfecta"
    ],
    [
      "herpes_stomatitis",
      "pemphigus",
      "pemphigoid",
      "erythema_multiforme",
      "hfmd"
    ],
    [
      "periodontal_abscess",
      "perio_endo_lesion",
      "furcation_involvement"
    ],
    [
      "apical_periodontitis",
      "pulp_necrosis",
      "osteomyelitis_jaw"
    ],
    [
      "vertical_root_fracture",
      "cracked_tooth",
      "internal_resorption"
    ],
    [
      "root_resorption",
      "internal_resorption",
      "residual_root"
    ],
    [
      "caries_rampant",
      "caries_recurrent",
      "root_caries"
    ],
    [
      "tooth_wear_attrition",
      "dental_erosion",
      "wedge_defect"
    ],
    [
      "malocclusion",
      "enamel_hypoplasia",
      "dens_evaginatus"
    ],
    [
      "acute_gingival_papillitis",
      "gingival_hyperplasia",
      "gingival_recession"
    ],
    [
      "traumatic_ulcer",
      "oral_ulcer",
      "radiation_stomatitis"
    ],
    [
      "atypical_odontalgia",
      "trigeminal_neuralgia",
      "pulp_calcification"
    ],
    [
      "dentinogenesis_imperfecta",
      "fluorosis",
      "tetracycline_teeth"
    ]
  ],
  "comorbidityPairs": [
    [
      "periodontitis",
      "halitosis"
    ],
    [
      "xerostomia",
      "candidiasis"
    ],
    [
      "xerostomia",
      "burning_mouth"
    ],
    [
      "bruxism",
      "tmd"
    ],
    [
      "bruxism",
      "wedge_defect"
    ],
    [
      "gingival_hyperplasia",
      "periodontitis"
    ],
    [
      "pregnancy_gingivitis",
      "gingivitis"
    ],
    [
      "trigeminal_neuralgia",
      "atypical_odontalgia"
    ],
    [
      "periodontitis",
      "furcation_involvement"
    ],
    [
      "periodontitis",
      "gingival_recession"
    ],
    [
      "gingival_recession",
      "root_caries"
    ],
    [
      "gingival_recession",
      "dentin_hypersensitivity"
    ],
    [
      "radiation_stomatitis",
      "xerostomia"
    ],
    [
      "radiation_stomatitis",
      "candidiasis"
    ],
    [
      "anug",
      "periodontitis"
    ],
    [
      "perio_endo_lesion",
      "apical_periodontitis"
    ],
    [
      "bruxism",
      "tooth_wear_attrition"
    ],
    [
      "xerostomia",
      "root_caries"
    ],
    [
      "allergic_stomatitis",
      "lichen_planus"
    ],
    [
      "behcet_disease",
      "oral_ulcer"
    ]
  ]
};

const QUESTION_TREE = {
  "q_entry": {
    "id": "q_entry",
    "text": "你的牙齿或嘴巴最近主要在闹什么\"小情绪\"？",
    "stage": "complaint",
    "branches": [
      {
        "emoji": "🦷",
        "text": "牙疼 / 遇冷遇热疼 / 咬东西疼",
        "next": [
          "q_pain_spontaneous"
        ],
        "delta": {
          "caries_deep": 3,
          "irreversible_pulpitis": 2,
          "dentin_hypersensitivity": 2
        },
        "lock": [
          "gingivitis",
          "periodontitis",
          "leukoplakia",
          "oral_ulcer"
        ]
      },
      {
        "emoji": "🩸",
        "text": "牙龈出血 / 红肿 / 长脓包 / 牙齿松动",
        "next": [
          "q_perio_necrosis_smell"
        ],
        "delta": {
          "gingivitis": 4,
          "periodontitis": 3,
          "aggressive_periodontitis": 2
        },
        "lock": [
          "dentin_hypersensitivity",
          "cracked_tooth",
          "pemphigus"
        ]
      },
      {
        "emoji": "👄",
        "text": "长溃疡了 / 有白斑 / 糜烂 / 舌头不对劲 / 嘴角裂",
        "next": [
          "q_mucosa_can_scrape"
        ],
        "delta": {
          "oral_ulcer": 3,
          "leukoplakia": 2,
          "candidiasis": 2
        },
        "lock": [
          "caries_shallow",
          "caries_deep",
          "wedge_defect",
          "irreversible_pulpitis"
        ]
      },
      {
        "emoji": "🕳️",
        "text": "牙齿有个黑洞 / 缺了一块 / 变色 / 裂纹 / 形态不太对",
        "next": [
          "q_hard_acquired_or_dev"
        ],
        "delta": {
          "caries_shallow": 3,
          "wedge_defect": 2,
          "caries_recurrent": 2,
          "fluorosis": 1
        },
        "lock": [
          "gingivitis",
          "periodontitis",
          "oral_ulcer",
          "pemphigus"
        ]
      },
      {
        "emoji": "🗣️",
        "text": "下巴关节咔咔响 / 腮帮子酸 / 张嘴费劲 / 脸肿了",
        "next": [
          "q_jaw_recent_extraction"
        ],
        "delta": {
          "tmd": 3,
          "bruxism": 2,
          "sialolithiasis": 2,
          "parotitis": 2
        },
        "lock": [
          "caries_shallow",
          "dentin_hypersensitivity",
          "oral_ulcer",
          "leukoplakia"
        ]
      },
      {
        "emoji": "🏜️",
        "text": "口干得要命 / 口臭怎么也去不掉 / 嘴里烧得慌",
        "next": [
          "q_systemic_dry_or_burn"
        ],
        "delta": {
          "xerostomia": 3,
          "halitosis": 3,
          "burning_mouth": 2
        },
        "lock": [
          "caries_shallow",
          "wedge_defect",
          "pericoronitis"
        ]
      }
    ]
  },
  "q_pain_spontaneous": {
    "id": "q_pain_spontaneous",
    "text": "这种疼是自己突然就疼起来的，还是碰到什么东西才疼？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🔥",
        "text": "自己就疼——没刺激也疼，尤其晚上更严重",
        "next": [
          "q_pain_cold_relief"
        ],
        "delta": {
          "irreversible_pulpitis": 8,
          "apical_periodontitis": 2
        },
        "lock": [
          "dentin_hypersensitivity",
          "caries_shallow",
          "wedge_defect"
        ]
      },
      {
        "emoji": "🥶",
        "text": "碰到才疼——只有喝冷水/吃甜的/咬东西的时候才疼",
        "next": [
          "q_pain_cold_hot_diff"
        ],
        "delta": {
          "dentin_hypersensitivity": 3,
          "caries_deep": 3,
          "cracked_tooth": 2
        },
        "lock": [
          "irreversible_pulpitis",
          "pulp_necrosis"
        ]
      }
    ]
  },
  "q_pain_cold_relief": {
    "id": "q_pain_cold_relief",
    "text": "含一口冷水或者冷敷一下，疼痛会暂时好一点吗？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🧊",
        "text": "能缓解！含冷水后明显舒服一些",
        "delta": {
          "irreversible_pulpitis": 8
        },
        "lock": [
          "apical_periodontitis"
        ]
      },
      {
        "emoji": "🔥",
        "text": "没用，冷热都难受，热敷反而好一点",
        "next": [
          "q_pain_floating"
        ],
        "delta": {
          "irreversible_pulpitis": 4,
          "apical_periodontitis": 5
        },
        "lock": []
      }
    ]
  },
  "q_pain_trigger_main": {
    "id": "q_pain_trigger_main",
    "text": "哪种情况最容易把疼勾出来？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🍬",
        "text": "吃甜的或者喝冰的时酸痛，刺激去掉马上就好了",
        "next": [
          "q_pain_caries_depth"
        ],
        "delta": {
          "caries_shallow": 4,
          "caries_deep": 6,
          "dental_erosion": 3
        },
        "lock": [
          "cracked_tooth",
          "apical_periodontitis",
          "trigeminal_neuralgia"
        ]
      },
      {
        "emoji": "🪥",
        "text": "刷牙刷到牙根那儿的时候刺痛",
        "delta": {
          "wedge_defect": 8,
          "dentin_hypersensitivity": 6
        },
        "lock": [
          "caries_deep",
          "cracked_tooth"
        ]
      },
      {
        "emoji": "💢",
        "text": "咬到某个点突然像过电/刀割一样剧痛",
        "next": [
          "q_pain_lightning_duration"
        ],
        "delta": {
          "cracked_tooth": 7,
          "trigeminal_neuralgia": 5
        },
        "lock": [
          "caries_shallow",
          "dentin_hypersensitivity",
          "dental_erosion"
        ]
      },
      {
        "emoji": "🎈",
        "text": "不敢咬东西，感觉牙齿\"浮起来了\"，一碰就疼",
        "delta": {
          "apical_periodontitis": 8,
          "pulp_necrosis": 3,
          "vertical_root_fracture": 3
        },
        "lock": [
          "dentin_hypersensitivity",
          "caries_shallow",
          "wedge_defect"
        ]
      },
      {
        "emoji": "🤧",
        "text": "上排后牙疼，同时同侧鼻子堵、流黄色脓鼻涕",
        "delta": {
          "sinusitis_odontogenic": 12
        },
        "lock": [
          "caries_shallow",
          "caries_deep",
          "dentin_hypersensitivity",
          "wedge_defect",
          "cracked_tooth"
        ]
      }
    ]
  },
  "q_pain_caries_depth": {
    "id": "q_pain_caries_depth",
    "text": "那颗牙上的洞有多大？照镜子能看到明显的小洞吗？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🔍",
        "text": "只有一条黑线或针尖大的小黑点，舔上去基本感觉不到凹坑",
        "delta": {
          "caries_shallow": 10,
          "reversible_pulpitis": 3
        },
        "lock": [
          "caries_deep",
          "residual_root"
        ]
      },
      {
        "emoji": "🕳️",
        "text": "能看到明显的洞，舌头舔上去有个凹坑，吃东西容易塞进去",
        "delta": {
          "caries_deep": 10,
          "residual_root": 3
        },
        "lock": [
          "caries_shallow"
        ]
      }
    ]
  },
  "q_pain_floating": {
    "id": "q_pain_floating",
    "text": "有没有觉得这颗牙\"浮起来了\"，比别人高了一截？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🎈",
        "text": "对对对，明显浮起来，完全不敢咬",
        "delta": {
          "apical_periodontitis": 9,
          "pulp_necrosis": 2,
          "osteomyelitis_jaw": 3
        },
        "lock": [
          "irreversible_pulpitis"
        ]
      },
      {
        "emoji": "🦷",
        "text": "没有浮起感，就是纯疼",
        "delta": {
          "irreversible_pulpitis": 8
        },
        "lock": [
          "apical_periodontitis"
        ]
      }
    ]
  },
  "q_pain_lightning_duration": {
    "id": "q_pain_lightning_duration",
    "text": "这种\"过电\"一样的痛大概持续多久？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "⚡",
        "text": "几秒到几十秒，突然来突然走",
        "next": [
          "q_pain_xray_finding"
        ],
        "delta": {
          "trigeminal_neuralgia": 10
        },
        "lock": [
          "cracked_tooth",
          "caries_deep"
        ]
      },
      {
        "emoji": "💢",
        "text": "只有咬到那一下剧痛，松开就不疼了",
        "delta": {
          "cracked_tooth": 10
        },
        "lock": [
          "trigeminal_neuralgia"
        ]
      }
    ]
  },
  "q_perio_bleeding_type": {
    "id": "q_perio_bleeding_type",
    "text": "牙龈出血是哪种情况？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🍎",
        "text": "刷牙或者啃苹果时才出血，平时不出",
        "next": [
          "q_perio_location"
        ],
        "delta": {
          "gingivitis": 7,
          "puberty_gingivitis": 3,
          "pregnancy_gingivitis": 3,
          "acute_gingival_papillitis": 5
        },
        "lock": [
          "aggressive_periodontitis"
        ]
      },
      {
        "emoji": "🩸",
        "text": "不刷牙也自己出血，牙龈发红发紫",
        "next": [
          "q_perio_mobility"
        ],
        "delta": {
          "periodontitis": 6,
          "aggressive_periodontitis": 5,
          "gingival_hyperplasia": 3
        },
        "lock": [
          "gingivitis"
        ]
      },
      {
        "emoji": "🩹",
        "text": "牙龈反复鼓起一个脓包来，挤破了过几天又鼓起来",
        "delta": {
          "apical_periodontitis": 10,
          "pulp_necrosis": 6,
          "periodontal_abscess": 8
        },
        "lock": [
          "gingivitis",
          "periodontitis",
          "aggressive_periodontitis"
        ]
      },
      {
        "emoji": "⚠️",
        "text": "牙龈反复排脓，同时牙齿对冷热没感觉了（牙神经可能坏死了）",
        "delta": {
          "perio_endo_lesion": 12,
          "pulp_necrosis": 5
        },
        "lock": [
          "gingivitis",
          "periodontitis"
        ]
      }
    ]
  },
  "q_perio_location": {
    "id": "q_perio_location",
    "text": "肿痛主要在哪个位置？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🦷",
        "text": "最里面那颗牙（智齿）周围的牙龈肿了，吞咽都疼，嘴都有点张不开",
        "delta": {
          "pericoronitis": 12
        },
        "lock": [
          "gingivitis",
          "puberty_gingivitis",
          "pregnancy_gingivitis"
        ],
        "next": [
          "q_perio_mobility"
        ]
      },
      {
        "emoji": "🩸",
        "text": "前面或者侧面的牙龈，不是最里面的",
        "next": [
          "q_perio_mobility"
        ],
        "delta": {
          "gingivitis": 4
        }
      }
    ]
  },
  "q_perio_mobility": {
    "id": "q_perio_mobility",
    "text": "牙齿有没有松动的感觉？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🍂",
        "text": "有，好几颗牙明显松了",
        "next": [
          "q_perio_age_rapid"
        ],
        "delta": {
          "periodontitis": 8,
          "aggressive_periodontitis": 8,
          "furcation_involvement": 6
        },
        "lock": [
          "gingivitis",
          "puberty_gingivitis"
        ]
      },
      {
        "emoji": "🦷",
        "text": "没有明显松动，就是红肿出血",
        "delta": {
          "gingivitis": 6,
          "puberty_gingivitis": 4,
          "pregnancy_gingivitis": 5,
          "gingival_recession": 5
        },
        "lock": [
          "periodontitis",
          "aggressive_periodontitis"
        ]
      }
    ]
  },
  "q_perio_age_rapid": {
    "id": "q_perio_age_rapid",
    "text": "你多大年龄？牙齿松动是最近快速变严重的吗？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "⏩",
        "text": "不到35岁，近半年好几颗牙快速松了",
        "delta": {
          "aggressive_periodontitis": 12
        },
        "lock": [
          "periodontitis"
        ]
      },
      {
        "emoji": "🐢",
        "text": "35岁以上了，是逐年慢慢加重的",
        "delta": {
          "periodontitis": 10
        },
        "lock": [
          "aggressive_periodontitis"
        ]
      }
    ]
  },
  "q_mucosa_can_scrape": {
    "id": "q_mucosa_can_scrape",
    "text": "嘴巴里的异常东西能被擦掉或者刮掉吗？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🧀",
        "text": "能擦掉！擦掉后下面红红的，像一层奶酪膜",
        "delta": {
          "candidiasis": 10
        },
        "lock": [
          "leukoplakia",
          "lichen_planus",
          "osf",
          "oral_cancer"
        ]
      },
      {
        "emoji": "⬜",
        "text": "擦不掉，是长在肉上的斑块/条纹/糜烂",
        "next": [
          "q_mucosa_white_or_ulcer"
        ],
        "delta": {
          "leukoplakia": 4,
          "lichen_planus": 3,
          "osf": 3
        },
        "lock": [
          "candidiasis"
        ]
      }
    ]
  },
  "q_mucosa_white_or_ulcer": {
    "id": "q_mucosa_white_or_ulcer",
    "text": "它主要长什么样？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "⬜",
        "text": "白色的斑块或者白色条纹，没有破皮",
        "next": [
          "q_mucosa_white_risk"
        ],
        "delta": {
          "leukoplakia": 6,
          "lichen_planus": 5,
          "osf": 4
        },
        "lock": [
          "oral_ulcer",
          "herpes_stomatitis",
          "pemphigus"
        ]
      },
      {
        "emoji": "😖",
        "text": "凹陷的坑/糜烂面/水疱，碰到就很疼",
        "next": [
          "q_mucosa_ulcer_pattern"
        ],
        "delta": {
          "oral_ulcer": 6,
          "herpes_stomatitis": 4,
          "pemphigus": 3
        },
        "lock": [
          "leukoplakia",
          "osf"
        ]
      },
      {
        "emoji": "🗺️",
        "text": "舌头表面有游走的红斑白边，倒是不怎么疼",
        "delta": {
          "geographic_tongue": 12
        },
        "lock": [
          "leukoplakia",
          "oral_ulcer",
          "pemphigus",
          "oral_cancer"
        ]
      },
      {
        "emoji": "😬",
        "text": "就嘴角裂开/发红/起皮结痂",
        "delta": {
          "angular_cheilitis": 10
        },
        "lock": [
          "oral_ulcer",
          "leukoplakia",
          "pemphigus",
          "oral_cancer"
        ]
      }
    ]
  },
  "q_mucosa_ulcer_pattern": {
    "id": "q_mucosa_ulcer_pattern",
    "text": "有没有以下这些伴随情况？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🖐️",
        "text": "手脚也出现了红色疹子/小水疱，还有点发烧",
        "delta": {
          "hfmd": 12
        },
        "lock": [
          "herpes_stomatitis",
          "oral_ulcer",
          "pemphigus",
          "behcet_disease",
          "erythema_multiforme",
          "pemphigoid"
        ]
      },
      {
        "emoji": "🔴",
        "text": "下面（私处）也反复长溃疡，或者眼睛反复发红疼痛",
        "delta": {
          "behcet_disease": 12
        },
        "lock": [
          "oral_ulcer",
          "herpes_stomatitis",
          "hfmd"
        ],
        "forceRed": true
      },
      {
        "emoji": "💊",
        "text": "最近吃了新药后突然发作的，嘴唇上全是厚厚的血痂",
        "delta": {
          "erythema_multiforme": 12
        },
        "lock": [
          "pemphigus",
          "oral_ulcer",
          "herpes_stomatitis",
          "hfmd"
        ],
        "forceRed": true
      },
      {
        "emoji": "🩹",
        "text": "牙龈像被\"烫掉一层皮\"一样脱皮，大面积发红发烂",
        "delta": {
          "pemphigoid": 10,
          "pemphigus": 4,
          "lichen_planus": 3
        },
        "lock": [
          "gingivitis",
          "periodontitis",
          "anug"
        ]
      },
      {
        "emoji": "🤧",
        "text": "换了新牙膏/漱口水/吃了某种食物后出现的，有点过敏的感觉",
        "delta": {
          "allergic_stomatitis": 12
        },
        "lock": [
          "oral_ulcer",
          "herpes_stomatitis",
          "pemphigus",
          "behcet_disease"
        ]
      },
      {
        "emoji": "❌",
        "text": "没有以上这些情况，就是长溃疡/糜烂",
        "delta": {
          "oral_ulcer": 5
        },
        "next": [
          "q_mucosa_ulcer_duration"
        ]
      }
    ]
  },
  "q_mucosa_white_risk": {
    "id": "q_mucosa_white_risk",
    "text": "这个白斑/条纹有什么特点？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🚬",
        "text": "长期抽烟喝酒，白斑摸着粗糙不平",
        "delta": {
          "leukoplakia": 6,
          "oral_cancer": 4
        },
        "lock": [
          "lichen_planus"
        ]
      },
      {
        "emoji": "🫒",
        "text": "有嚼槟榔的习惯，嘴巴越来越张不开",
        "delta": {
          "osf": 12,
          "oral_cancer": 5
        },
        "lock": [
          "leukoplakia",
          "lichen_planus"
        ]
      },
      {
        "emoji": "🕸️",
        "text": "两颊内侧有白色网状条纹，有时候会糜烂",
        "delta": {
          "lichen_planus": 10
        },
        "lock": [
          "leukoplakia",
          "osf"
        ]
      }
    ]
  },
  "q_mucosa_ulcer_duration": {
    "id": "q_mucosa_ulcer_duration",
    "text": "这个溃疡/糜烂有多久了？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🔄",
        "text": "反复发作的，每次一两个星期自己就好了，圆形小坑",
        "delta": {
          "oral_ulcer": 10,
          "traumatic_ulcer": 3
        },
        "lock": [
          "oral_cancer",
          "pemphigus"
        ]
      },
      {
        "emoji": "⚠️",
        "text": "超过三个星期了还不愈合，边缘硬、基底不平",
        "next": [
          "q_mucosa_cancer_redflags"
        ],
        "delta": {
          "oral_cancer": 10,
          "pemphigus": 3
        },
        "lock": [
          "oral_ulcer"
        ]
      },
      {
        "emoji": "🫧",
        "text": "大面积糜烂，同时身上皮肤也有水疱",
        "delta": {
          "pemphigus": 12,
          "radiation_stomatitis": 5
        },
        "lock": [
          "oral_ulcer",
          "herpes_stomatitis"
        ]
      },
      {
        "emoji": "🦠",
        "text": "一簇簇小水疱，破了连成一片，之前有感冒的感觉",
        "delta": {
          "herpes_stomatitis": 10
        },
        "lock": [
          "oral_ulcer",
          "pemphigus",
          "oral_cancer"
        ]
      }
    ]
  },
  "q_mucosa_cancer_redflags": {
    "id": "q_mucosa_cancer_redflags",
    "text": "以下哪些危险信号符合你的情况？（可多选）",
    "stage": "symptom",
    "multiSelect": true,
    "branches": [
      {
        "emoji": "📏",
        "text": "溃疡边缘鼓起来、摸着硬邦邦的",
        "delta": {
          "oral_cancer": 8
        }
      },
      {
        "emoji": "🩸",
        "text": "不明原因反复出血",
        "delta": {
          "oral_cancer": 5
        }
      },
      {
        "emoji": "😵",
        "text": "那一块有麻木感",
        "delta": {
          "oral_cancer": 6
        }
      },
      {
        "emoji": "⚖️",
        "text": "最近没刻意减肥但体重在下降",
        "delta": {
          "oral_cancer": 4
        }
      }
    ]
  },
  "q_hard_acquired_or_dev": {
    "id": "q_hard_acquired_or_dev",
    "text": "牙齿的问题是哪来的——后天出现的，还是从小就这样？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "📅",
        "text": "后天出现的——以前好好的，近几年才有的",
        "next": [
          "q_hard_defect_type"
        ],
        "delta": {
          "caries_shallow": 2,
          "caries_recurrent": 2,
          "wedge_defect": 2,
          "dental_erosion": 2
        },
        "lock": [
          "fluorosis",
          "tetracycline_teeth",
          "enamel_hypoplasia",
          "dens_evaginatus"
        ]
      },
      {
        "emoji": "👶",
        "text": "从小就有——印象里牙齿一直就这样",
        "next": [
          "q_hard_dev_color_or_shape"
        ],
        "delta": {
          "fluorosis": 5,
          "tetracycline_teeth": 5,
          "enamel_hypoplasia": 5,
          "dens_evaginatus": 3
        },
        "lock": [
          "caries_shallow",
          "caries_recurrent",
          "wedge_defect",
          "dental_erosion"
        ]
      }
    ]
  },
  "q_hard_defect_type": {
    "id": "q_hard_defect_type",
    "text": "缺损主要是什么样子的？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🕳️",
        "text": "咬合面上有黑线或黑洞，容易塞东西",
        "delta": {
          "caries_shallow": 9,
          "caries_recurrent": 3,
          "root_resorption": 4,
          "internal_resorption": 3
        },
        "lock": [
          "wedge_defect",
          "dental_erosion",
          "trauma"
        ]
      },
      {
        "emoji": "🪥",
        "text": "牙齿靠牙龈那儿缺了一块，像V形槽",
        "delta": {
          "wedge_defect": 10
        },
        "lock": [
          "caries_shallow",
          "dental_erosion",
          "cracked_tooth"
        ]
      },
      {
        "emoji": "🥤",
        "text": "牙齿表面光滑凹陷/变透明了，舌头那面比较明显",
        "delta": {
          "dental_erosion": 10
        },
        "lock": [
          "caries_shallow",
          "wedge_defect"
        ]
      },
      {
        "emoji": "💥",
        "text": "撞到/摔倒/咬硬东西后崩掉一块",
        "next": [
          "q_hard_trauma_type"
        ],
        "delta": {
          "trauma": 10
        },
        "lock": [
          "caries_shallow",
          "wedge_defect",
          "dental_erosion"
        ]
      },
      {
        "emoji": "🔁",
        "text": "以前补过的牙边缘又黑了，补的材料有点晃",
        "delta": {
          "caries_recurrent": 11
        },
        "lock": [
          "caries_shallow",
          "wedge_defect"
        ]
      },
      {
        "emoji": "🪥",
        "text": "牙龈退了，露出来的牙根面变软/有洞/发黄",
        "delta": {
          "root_caries": 10,
          "gingival_recession": 5
        },
        "lock": [
          "caries_shallow"
        ]
      }
    ]
  },
  "q_hard_trauma_type": {
    "id": "q_hard_trauma_type",
    "text": "外伤后牙齿现在是什么状态？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🦷",
        "text": "整颗牙掉出来了！",
        "delta": {
          "trauma": 10
        },
        "advice": "把牙齿泡在牛奶或清水里，30分钟内赶去急诊！",
        "forceRed": true
      },
      {
        "emoji": "📏",
        "text": "牙齿裂了/断了但还长在嘴里",
        "delta": {
          "trauma": 8,
          "cracked_tooth": 6
        }
      },
      {
        "emoji": "🤏",
        "text": "只是松动了，没掉也没断",
        "delta": {
          "trauma": 8
        }
      }
    ]
  },
  "q_hard_dev_color_or_shape": {
    "id": "q_hard_dev_color_or_shape",
    "text": "是对颜色不满意，还是牙齿形状上多长了个小尖尖？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🎨",
        "text": "颜色不对——白垩色/黄褐色/灰黄色斑块",
        "next": [
          "q_hard_dev_color_detail"
        ],
        "delta": {
          "fluorosis": 5,
          "tetracycline_teeth": 5,
          "enamel_hypoplasia": 4,
          "dentinogenesis_imperfecta": 5
        },
        "lock": [
          "dens_evaginatus"
        ]
      },
      {
        "emoji": "🔺",
        "text": "形态异常——牙齿上多长了一个小尖尖",
        "delta": {
          "dens_evaginatus": 10
        },
        "lock": [
          "fluorosis",
          "tetracycline_teeth",
          "enamel_hypoplasia"
        ]
      }
    ]
  },
  "q_hard_dev_color_detail": {
    "id": "q_hard_dev_color_detail",
    "text": "牙齿的颜色问题是哪种情况造成的？",
    "stage": "history",
    "branches": [
      {
        "emoji": "💧",
        "text": "小时候（8岁前）住的地方水里含氟量偏高，牙齿有白/褐色斑",
        "delta": {
          "fluorosis": 10
        },
        "lock": [
          "tetracycline_teeth",
          "enamel_hypoplasia"
        ]
      },
      {
        "emoji": "💊",
        "text": "小时候生病吃过四环素类抗生素",
        "delta": {
          "tetracycline_teeth": 10
        },
        "lock": [
          "fluorosis",
          "enamel_hypoplasia"
        ]
      },
      {
        "emoji": "👶",
        "text": "婴幼儿时期得过重病或严重营养不良",
        "delta": {
          "enamel_hypoplasia": 10
        },
        "lock": [
          "fluorosis",
          "tetracycline_teeth"
        ]
      }
    ]
  },
  "q_jaw_recent_extraction": {
    "id": "q_jaw_recent_extraction",
    "text": "最近一周内有没有拔过牙？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "💀",
        "text": "刚拔完牙两三天！突然疼得要命，止痛药完全没用，有臭味",
        "delta": {
          "dry_socket": 12
        },
        "lock": [
          "tmd",
          "bruxism",
          "sialolithiasis",
          "parotitis",
          "trigeminal_neuralgia"
        ],
        "forceRed": true
      },
      {
        "emoji": "❌",
        "text": "没有拔牙，或者拔牙后正常恢复中",
        "next": [
          "q_jaw_bisphosphonate"
        ],
        "delta": {}
      }
    ]
  },
  "q_jaw_pain_or_noise": {
    "id": "q_jaw_pain_or_noise",
    "text": "主要是疼还是响？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🗣️",
        "text": "关节咔咔响/沙沙响，嚼东西时酸痛",
        "next": [
          "q_jaw_morning_stiff"
        ],
        "delta": {
          "tmd": 8,
          "bruxism": 4
        },
        "lock": [
          "sialolithiasis",
          "parotitis",
          "trigeminal_neuralgia",
          "osteomyelitis_jaw"
        ]
      },
      {
        "emoji": "🐹",
        "text": "腮帮子/下巴下面突然肿起来，吃饭的时候更严重",
        "next": [
          "q_jaw_swelling_meal"
        ],
        "delta": {
          "sialolithiasis": 6,
          "parotitis": 6
        },
        "lock": [
          "tmd",
          "bruxism"
        ]
      },
      {
        "emoji": "😵",
        "text": "脸上像过电/刀割一样突然剧痛，洗脸刮胡子都能触发",
        "delta": {
          "trigeminal_neuralgia": 10
        },
        "lock": [
          "tmd",
          "bruxism",
          "sialolithiasis",
          "parotitis"
        ]
      }
    ]
  },
  "q_jaw_morning_stiff": {
    "id": "q_jaw_morning_stiff",
    "text": "早上醒来腮帮子有没有酸胀感？有没有人告诉过你晚上磨牙？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "😬",
        "text": "早上腮帮子酸！家人说我晚上磨牙或者紧咬牙",
        "delta": {
          "bruxism": 12,
          "tmd": 5
        },
        "lock": []
      },
      {
        "emoji": "🗣️",
        "text": "只有关节响和嚼东西疼，早上没有不舒服",
        "delta": {
          "tmd": 10
        },
        "lock": [
          "bruxism"
        ]
      }
    ]
  },
  "q_jaw_swelling_meal": {
    "id": "q_jaw_swelling_meal",
    "text": "肿胀跟吃东西有关系吗？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🪨",
        "text": "一吃饭就肿，吃完了过一会儿慢慢消掉",
        "delta": {
          "sialolithiasis": 10
        },
        "lock": [
          "parotitis"
        ]
      },
      {
        "emoji": "🦠",
        "text": "一直肿着，按压就疼，可能还发烧全身没劲",
        "delta": {
          "parotitis": 10
        },
        "lock": [
          "sialolithiasis"
        ]
      }
    ]
  },
  "q_systemic_dry_or_burn": {
    "id": "q_systemic_dry_or_burn",
    "text": "主要是口干、烧灼感还是口臭？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🏜️",
        "text": "长期口干舌燥，喝很多水还是干，说话久了难受",
        "next": [
          "q_systemic_dry_cause"
        ],
        "delta": {
          "xerostomia": 10
        },
        "lock": [
          "halitosis",
          "burning_mouth"
        ]
      },
      {
        "emoji": "🔥",
        "text": "嘴里持续火辣辣烧灼感，但照镜子看完全正常",
        "delta": {
          "burning_mouth": 10
        },
        "lock": [
          "halitosis",
          "xerostomia"
        ]
      },
      {
        "emoji": "🤢",
        "text": "刷牙很认真但还是口臭严重",
        "delta": {
          "halitosis": 10
        },
        "lock": [
          "burning_mouth"
        ]
      }
    ]
  },
  "q_systemic_dry_cause": {
    "id": "q_systemic_dry_cause",
    "text": "口干可能和以下哪个有关？",
    "stage": "history",
    "branches": [
      {
        "emoji": "💊",
        "text": "长期在吃抗抑郁药/抗过敏药/利尿类的药",
        "delta": {
          "xerostomia": 6
        }
      },
      {
        "emoji": "🧬",
        "text": "确诊过干燥综合征或红斑狼疮或类风湿",
        "delta": {
          "xerostomia": 8,
          "candidiasis": 3,
          "caries_rampant": 3
        }
      },
      {
        "emoji": "☢️",
        "text": "做过头部或颈部的放射治疗",
        "delta": {
          "xerostomia": 9,
          "caries_rampant": 12,
          "candidiasis": 5
        },
        "forceRed": true
      }
    ]
  },
  "q_universal_age": {
    "id": "q_universal_age",
    "text": "你现在处在哪个年龄段？",
    "stage": "history",
    "universal": true,
    "branches": [
      {
        "emoji": "👶",
        "text": "12岁以下",
        "riskTag": {},
        "ageGate": [
          0,
          12
        ]
      },
      {
        "emoji": "🧑",
        "text": "13-45岁",
        "riskTag": {},
        "ageGate": [
          13,
          45
        ]
      },
      {
        "emoji": "👨",
        "text": "46-60岁",
        "riskTag": {},
        "ageGate": [
          46,
          60
        ]
      },
      {
        "emoji": "👴",
        "text": "60岁以上",
        "riskTag": {
          "candidiasis": 2.5,
          "xerostomia": 2.5,
          "leukoplakia": 2,
          "oral_cancer": 2,
          "osteomyelitis_jaw": 1.5
        },
        "ageGate": [
          60,
          120
        ]
      }
    ]
  },
  "q_universal_gender": {
    "id": "q_universal_gender",
    "text": "你的性别是？",
    "stage": "history",
    "universal": true,
    "branches": [
      {
        "emoji": "♀️",
        "text": "女性",
        "riskTag": {
          "pregnancy_gingivitis": 2,
          "burning_mouth": 2,
          "tmd": 1.8,
          "lichen_planus": 1.5,
          "oral_ulcer": 1.5
        },
        "genderGate": "female"
      },
      {
        "emoji": "♂️",
        "text": "男性",
        "riskTag": {
          "leukoplakia": 1.8,
          "osf": 1.8,
          "oral_cancer": 2,
          "trauma": 1.5,
          "osteomyelitis_jaw": 1.3
        },
        "genderGate": "male"
      }
    ]
  },
  "q_universal_medical": {
    "id": "q_universal_medical",
    "text": "你有没有以下这些全身的健康状况？（可多选）",
    "stage": "history",
    "universal": true,
    "multiSelect": true,
    "branches": [
      {
        "emoji": "🍬",
        "text": "确诊糖尿病 / 血糖控制不太好",
        "riskTag": {
          "periodontitis": 2.5,
          "aggressive_periodontitis": 2,
          "gingivitis": 1.5,
          "candidiasis": 2,
          "halitosis": 1.5
        }
      },
      {
        "emoji": "🫀",
        "text": "高血压/心脏病，在吃降压药",
        "riskTag": {
          "gingival_hyperplasia": 4,
          "xerostomia": 1.5,
          "periodontitis": 1.3
        }
      },
      {
        "emoji": "🧬",
        "text": "干燥综合征/红斑狼疮/类风湿等自身免疫病",
        "riskTag": {
          "xerostomia": 3,
          "candidiasis": 2.5,
          "lichen_planus": 2,
          "pemphigus": 3,
          "burning_mouth": 2
        }
      },
      {
        "emoji": "💊",
        "text": "长期吃抗癫痫药/抗抑郁药/环孢素",
        "riskTag": {
          "gingival_hyperplasia": 4,
          "xerostomia": 2
        }
      },
      {
        "emoji": "☢️",
        "text": "做过头部或颈部放射治疗",
        "riskTag": {
          "xerostomia": 5,
          "caries_rampant": 6,
          "candidiasis": 4,
          "radiation_stomatitis": 18,
          "osteomyelitis_jaw": 3,
          "mronj": 5
        },
        "forceRed": true
      },
      {
        "emoji": "🦴",
        "text": "在用或曾用过双膦酸盐/地舒单抗（治骨质疏松/骨转移的）",
        "riskTag": {
          "mronj": 8,
          "osteomyelitis_jaw": 3
        },
        "forceRed": true
      },
      {
        "emoji": "✅",
        "text": "以上都没有",
        "riskTag": {}
      }
    ]
  },
  "q_universal_family": {
    "id": "q_universal_family",
    "text": "你的直系亲属（爸妈/兄弟姐妹）有没有以下口腔问题？（可多选）",
    "stage": "history",
    "universal": true,
    "multiSelect": true,
    "branches": [
      {
        "emoji": "🦷",
        "text": "比较年轻（不到40岁）时牙齿就松动掉了好几颗",
        "riskTag": {
          "aggressive_periodontitis": 5,
          "periodontitis": 1.5
        }
      },
      {
        "emoji": "⚠️",
        "text": "得过口腔癌或头颈部恶性肿瘤",
        "riskTag": {
          "oral_cancer": 5,
          "leukoplakia": 2
        }
      },
      {
        "emoji": "🧩",
        "text": "有严重的牙齿排列不齐/地包天",
        "riskTag": {
          "malocclusion": 8
        }
      },
      {
        "emoji": "✅",
        "text": "以上都没有",
        "riskTag": {}
      }
    ]
  },
  "q_universal_smoking": {
    "id": "q_universal_smoking",
    "text": "你有这些生活习惯吗？（可多选）",
    "stage": "lifestyle",
    "universal": true,
    "multiSelect": true,
    "branches": [
      {
        "emoji": "🚬",
        "text": "经常抽烟（每天半包以上）",
        "riskTag": {
          "periodontitis": 3,
          "leukoplakia": 5,
          "oral_cancer": 4,
          "halitosis": 2,
          "gingivitis": 1.5
        }
      },
      {
        "emoji": "🍺",
        "text": "经常喝酒（一周三四次以上）",
        "riskTag": {
          "leukoplakia": 2.5,
          "oral_cancer": 3,
          "halitosis": 2
        }
      },
      {
        "emoji": "🫒",
        "text": "经常嚼槟榔",
        "riskTag": {
          "osf": 8,
          "oral_cancer": 6,
          "leukoplakia": 3,
          "periodontitis": 1.5
        },
        "forceRed": true
      },
      {
        "emoji": "✅",
        "text": "不抽烟不喝酒不嚼槟榔",
        "riskTag": {}
      }
    ]
  },
  "q_universal_brush": {
    "id": "q_universal_brush",
    "text": "你平时怎么刷牙的？",
    "stage": "lifestyle",
    "universal": true,
    "branches": [
      {
        "emoji": "🪚",
        "text": "喜欢用力横着来回拉锯式刷",
        "riskTag": {
          "wedge_defect": 4,
          "dentin_hypersensitivity": 3
        }
      },
      {
        "emoji": "⏱️",
        "text": "随便刷刷不到一分钟，基本不用牙线",
        "riskTag": {
          "periodontitis": 3,
          "gingivitis": 3,
          "caries_shallow": 2,
          "caries_deep": 1.5
        }
      },
      {
        "emoji": "✨",
        "text": "巴氏刷牙法刷够两分钟，也用牙线或冲牙器",
        "riskTag": {
          "gingivitis": 0.4,
          "periodontitis": 0.4,
          "caries_shallow": 0.5
        },
        "protect": true
      }
    ]
  },
  "q_universal_stress": {
    "id": "q_universal_stress",
    "text": "最近的精神状态和生活作息怎么样？",
    "stage": "lifestyle",
    "universal": true,
    "branches": [
      {
        "emoji": "😫",
        "text": "压力山大、常常焦虑/失眠/情绪紧绷",
        "riskTag": {
          "oral_ulcer": 4,
          "bruxism": 5,
          "tmd": 3,
          "burning_mouth": 3,
          "pericoronitis": 2
        }
      },
      {
        "emoji": "😬",
        "text": "注意到自己会不自觉紧咬牙关/咬嘴唇/咬指甲",
        "riskTag": {
          "bruxism": 5,
          "tmd": 3,
          "wedge_defect": 2
        },
        "delta": {
          "tooth_wear_attrition": 4
        }
      },
      {
        "emoji": "🧘",
        "text": "作息规律、情绪平稳、压力不大",
        "riskTag": {
          "oral_ulcer": 0.5,
          "bruxism": 0.3,
          "tmd": 0.5,
          "burning_mouth": 0.4
        },
        "protect": true
      }
    ]
  },
  "q_universal_diet": {
    "id": "q_universal_diet",
    "text": "你的饮食习惯偏向哪种？（可多选）",
    "stage": "lifestyle",
    "universal": true,
    "multiSelect": true,
    "branches": [
      {
        "emoji": "🍰",
        "text": "爱吃甜的/甜饮料/零食",
        "riskTag": {
          "caries_shallow": 3,
          "caries_deep": 2.5,
          "caries_recurrent": 2
        }
      },
      {
        "emoji": "🍋",
        "text": "爱吃酸的/喝碳酸饮料/喝果醋",
        "riskTag": {
          "dental_erosion": 5,
          "dentin_hypersensitivity": 2
        }
      },
      {
        "emoji": "🥩",
        "text": "爱吃硬的（坚果/啃骨头/嚼冰块）",
        "riskTag": {
          "cracked_tooth": 4,
          "wedge_defect": 2,
          "trauma": 2,
          "tooth_wear_attrition": 3
        }
      },
      {
        "emoji": "🥗",
        "text": "啥都吃、不偏食",
        "riskTag": {}
      }
    ]
  },
  "q_universal_dental_visit": {
    "id": "q_universal_dental_visit",
    "text": "你多久看一次牙医？",
    "stage": "lifestyle",
    "universal": true,
    "branches": [
      {
        "emoji": "📅",
        "text": "每年至少洗牙一次，定期检查",
        "riskTag": {
          "gingivitis": 0.3,
          "periodontitis": 0.3,
          "caries_shallow": 0.4,
          "caries_deep": 0.5,
          "oral_cancer": 0.5
        },
        "protect": true
      },
      {
        "emoji": "😰",
        "text": "好几年没去过牙科了",
        "riskTag": {
          "periodontitis": 1.8,
          "caries_deep": 1.8,
          "oral_cancer": 1.5
        }
      }
    ]
  },
  "q_universal_fluoride": {
    "id": "q_universal_fluoride",
    "text": "你平常用的牙膏含氟吗？",
    "stage": "lifestyle",
    "universal": true,
    "branches": [
      {
        "emoji": "🪥",
        "text": "每天都用含氟牙膏",
        "riskTag": {
          "caries_shallow": 0.5,
          "caries_deep": 0.5,
          "caries_recurrent": 0.6,
          "dentin_hypersensitivity": 0.7
        },
        "protect": true
      },
      {
        "emoji": "❓",
        "text": "不太清楚 / 没用含氟牙膏",
        "riskTag": {}
      }
    ]
  },
  "q_pain_cold_hot_diff": {
    "id": "q_pain_cold_hot_diff",
    "text": "碰到冷水或热水的时候，疼痛持续多久？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "⏱️",
        "text": "刺激一拿掉疼痛马上消失（几秒内就不疼了）",
        "delta": {
          "reversible_pulpitis": 10,
          "dentin_hypersensitivity": 3
        },
        "lock": [
          "irreversible_pulpitis",
          "pulp_necrosis"
        ],
        "next": [
          "q_pain_trigger_main"
        ]
      },
      {
        "emoji": "🔥",
        "text": "刺激拿走之后疼痛还持续好几十秒甚至几分钟",
        "delta": {
          "irreversible_pulpitis": 8,
          "reversible_pulpitis": 2
        },
        "lock": [
          "reversible_pulpitis",
          "dentin_hypersensitivity"
        ],
        "next": [
          "q_pain_cold_relief"
        ]
      }
    ]
  },
  "q_pain_xray_finding": {
    "id": "q_pain_xray_finding",
    "text": "有没有拍过牙片，医生有没有说牙髓腔里有异常钙化或者\"小石头\"？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🪨",
        "text": "有，医生说过髓腔里有钙化/髓石",
        "delta": {
          "pulp_calcification": 10
        },
        "lock": [
          "trigeminal_neuralgia",
          "atypical_odontalgia"
        ]
      },
      {
        "emoji": "❓",
        "text": "没拍过 / 不清楚",
        "delta": {
          "trigeminal_neuralgia": 3,
          "pulp_calcification": 2,
          "atypical_odontalgia": 6
        }
      }
    ]
  },
  "q_perio_necrosis_smell": {
    "id": "q_perio_necrosis_smell",
    "text": "牙龈有没有溃烂、像被\"挖掉\"一块似的，而且嘴里有一股特别难闻的腐败臭味？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "☠️",
        "text": "有！牙龈烂了、疼得要死、口臭特别重",
        "delta": {
          "anug": 12
        },
        "lock": [
          "gingivitis",
          "periodontitis",
          "puberty_gingivitis",
          "pregnancy_gingivitis"
        ],
        "forceRed": true
      },
      {
        "emoji": "❌",
        "text": "没有，就是普通红肿出血",
        "delta": {},
        "next": [
          "q_perio_bleeding_type"
        ]
      }
    ]
  },
  "q_mucosa_hand_foot_rash": {
    "id": "q_mucosa_hand_foot_rash",
    "text": "嘴里长水疱或溃疡的同时，手心脚底有没有出现红色疹子或小水疱？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🖐️",
        "text": "有！手脚都有红色疹子/小水疱，可能还有点发烧",
        "delta": {
          "hfmd": 12
        },
        "lock": [
          "herpes_stomatitis",
          "oral_ulcer",
          "pemphigus"
        ]
      },
      {
        "emoji": "❌",
        "text": "没有，只有嘴里的问题",
        "delta": {
          "herpes_stomatitis": 5
        },
        "lock": [
          "hfmd"
        ],
        "next": [
          "q_mucosa_behcet_triad"
        ]
      }
    ]
  },
  "q_mucosa_behcet_triad": {
    "id": "q_mucosa_behcet_triad",
    "text": "除了嘴里反复长溃疡，私密部位是不是也反复出现溃疡？眼睛有没有反反复复发红疼痛或者视力模糊？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🔴",
        "text": "私处也有反复溃疡，或眼睛反复发炎",
        "delta": {
          "behcet_disease": 12
        },
        "lock": [
          "oral_ulcer"
        ],
        "forceRed": true
      },
      {
        "emoji": "❌",
        "text": "都没有",
        "delta": {
          "oral_ulcer": 5
        },
        "lock": [
          "behcet_disease"
        ],
        "next": [
          "q_mucosa_drug_trigger"
        ]
      }
    ]
  },
  "q_mucosa_drug_trigger": {
    "id": "q_mucosa_drug_trigger",
    "text": "嘴里大面积糜烂/血痂是不是最近吃了什么新药之后出现的？皮肤上有\"靶子形的\"环形红斑吗？",
    "stage": "history",
    "branches": [
      {
        "emoji": "💊",
        "text": "是的！吃新药后突然发作，嘴唇上全是血痂",
        "delta": {
          "erythema_multiforme": 12
        },
        "lock": [
          "pemphigus",
          "oral_ulcer",
          "herpes_stomatitis"
        ],
        "forceRed": true
      },
      {
        "emoji": "❌",
        "text": "没有明显的药物诱因",
        "delta": {
          "pemphigus": 3,
          "pemphigoid": 3
        },
        "next": [
          "q_mucosa_gingival_desquamation"
        ]
      }
    ]
  },
  "q_mucosa_gingival_desquamation": {
    "id": "q_mucosa_gingival_desquamation",
    "text": "牙龈是不是大面积发红、像被\"烫掉一层皮\"一样脱皮，轻轻一碰就破或脱落？",
    "stage": "symptom",
    "branches": [
      {
        "emoji": "🩹",
        "text": "是的，牙龈脱皮、一碰就疼，烂得很广泛",
        "delta": {
          "pemphigoid": 10,
          "pemphigus": 4,
          "lichen_planus": 3
        },
        "lock": [
          "gingivitis",
          "periodontitis",
          "anug"
        ]
      },
      {
        "emoji": "❌",
        "text": "牙龈没有脱皮烂皮",
        "lock": [
          "pemphigoid"
        ],
        "next": [
          "q_mucosa_ulcer_duration"
        ]
      }
    ]
  },
  "q_jaw_bisphosphonate": {
    "id": "q_jaw_bisphosphonate",
    "text": "有没有在用或者用过双膦酸盐类药物？（治骨质疏松、骨转移、多发性骨髓瘤的那种针或药）",
    "stage": "history",
    "branches": [
      {
        "emoji": "💊",
        "text": "是的，在打针或者吃过这类药（打静脉的尤其要注意）",
        "delta": {
          "mronj": 10
        },
        "lock": [
          "osteomyelitis_jaw",
          "garre_osteomyelitis"
        ],
        "forceRed": true
      },
      {
        "emoji": "❌",
        "text": "没有用过",
        "delta": {},
        "next": [
          "q_jaw_pain_or_noise"
        ]
      }
    ]
  }
};

class OralTriageEngine {
        constructor() {
          this.scores = {};
          this.rawScores = {};
          this.riskAccum = {};
          this.protectAccum = {};
          this.lockedDiseases = new Set();
          this.userAge = null;
          this.userGender = null;
          this.currentNode = 'q_entry';
          this.visitedNodes = [];
          this.universalQueue = [];
          this.hasRedFlag = false;
          this.totalNodesEstimate = 0;
          this.answeredCount = 0;
        }

        init() {
          this.scores = {};
          this.rawScores = {};
          this.riskAccum = {};
          this.protectAccum = {};
          this.lockedDiseases = new Set();
          this.currentNode = 'q_entry';
          this.visitedNodes = [];
          this.hasRedFlag = false;
          this.answeredCount = 0;
          this.universalQueue = Object.values(QUESTION_TREE).filter(q => q.universal).map(q => q.id);
          this.totalNodesEstimate = 5 + this.universalQueue.length;
          return QUESTION_TREE[this.currentNode];
        }

        getProgress() {
          const total = Math.max(1, this.totalNodesEstimate);
          return Math.min(95, Math.round((this.answeredCount / total) * 100));
        }

        answerBranch(branchIndex) {
          const node = QUESTION_TREE[this.currentNode];
          if (!node) return null;
          const branch = node.branches[branchIndex];
          if (!branch) return null;

          this.answeredCount++;
          this.visitedNodes.push(this.currentNode);

          if (branch.delta) {
            Object.entries(branch.delta).forEach(([diseaseId, value]) => {
              this.rawScores[diseaseId] = (this.rawScores[diseaseId] || 0) + value;
            });
          }
          if (branch.lock) {
            branch.lock.forEach(d => this.lockedDiseases.add(d));
          }
          if (branch.ageGate) this.userAge = branch.ageGate;
          if (branch.genderGate) this.userGender = branch.genderGate;
          if (branch.riskTag) {
            Object.entries(branch.riskTag).forEach(([diseaseId, multiplier]) => {
              this.riskAccum[diseaseId] = (this.riskAccum[diseaseId] || 1) * multiplier;
            });
          }
          if (branch.protect && branch.riskTag) {
            Object.entries(branch.riskTag).forEach(([diseaseId, multiplier]) => {
              this.protectAccum[diseaseId] = (this.protectAccum[diseaseId] || 1) * multiplier;
            });
          }
          if (branch.forceRed) this.hasRedFlag = true;

          let nextNodes = branch.next || [];
          if (nextNodes.length === 0 && this.universalQueue.length > 0) {
            nextNodes = [this.universalQueue.shift()];
          }
          this.totalNodesEstimate = this.answeredCount + nextNodes.length + this.universalQueue.length;

          if (nextNodes.length === 0) {
            this.currentNode = null;
            return this.finalize();
          }
          this.currentNode = nextNodes[0];
          return QUESTION_TREE[this.currentNode];
        }

        finalize() {
          let scores = {};
          Object.keys(this.rawScores).forEach(diseaseId => {
            if (this.lockedDiseases.has(diseaseId)) { scores[diseaseId] = 0; return; }
            let s = this.rawScores[diseaseId] || 0;
            if (this.riskAccum[diseaseId]) s *= this.riskAccum[diseaseId];
            if (this.protectAccum[diseaseId]) s *= this.protectAccum[diseaseId];
            const disease = DISEASES[diseaseId];
            if (disease && disease.ageRange && this.userAge) {
              const [minA, maxA] = disease.ageRange;
              const [uMin, uMax] = this.userAge;
              const mid = (uMin + uMax) / 2;
              if (uMax < minA || uMin > maxA) s *= 0.15;
              else if (mid >= minA && mid <= maxA) {
                const center = (minA + maxA) / 2;
                const dist = Math.abs(mid - center) / ((maxA - minA || 1) / 2);
                s *= Math.max(0.35, 1.3 - dist * 0.6);
              } else s *= 0.6;
            }
            if (disease && disease.genderBias && this.userGender)
              s *= (disease.genderBias === this.userGender) ? 1.35 : 0.55;
            scores[diseaseId] = Math.round(s * 10) / 10;
          });

          DISEASE_GRAPH.mutualExclusionGroups.forEach(group => {
            const present = group.filter(k => scores[k] > 0);
            if (present.length <= 1) return;
            present.sort((a, b) => scores[b] - scores[a]);
            const top = scores[present[0]];
            if (top <= 0) return;
            for (let i = 1; i < present.length; i++) {
              const k = present[i];
              const ratio = scores[k] / top;
              scores[k] *= Math.max(0.08, 0.40 + ratio * 0.35);
            }
          });

          DISEASE_GRAPH.causalChains.forEach(chain => {
            for (let i = 0; i < chain.length - 1; i++) {
              const up = chain[i], down = chain[i + 1];
              if (!DISEASES[up] || !DISEASES[down]) continue;
              if ((scores[up] || 0) > 6) scores[down] = (scores[down] || 0) + (scores[up] || 0) * 0.25;
              if ((scores[down] || 0) > 8) scores[up] = (scores[up] || 0) + (scores[down] || 0) * 0.12;
            }
          });

          DISEASE_GRAPH.comorbidityPairs.forEach(([a, b]) => {
            const sa = scores[a] || 0, sb = scores[b] || 0;
            if (sa > 8 && sb > 0) scores[b] *= 1.18;
            if (sb > 8 && sa > 0) scores[a] *= 1.18;
          });

          const s = k => scores[k] || 0;
          if (s('root_caries') > 8 && s('caries_shallow') > 8) {
            scores['root_caries'] *= 0.7; scores['caries_shallow'] *= 0.7;
          }
          if (s('reversible_pulpitis') > s('irreversible_pulpitis') && s('reversible_pulpitis') > 5)
            scores['irreversible_pulpitis'] *= 0.25;
          else if (s('irreversible_pulpitis') > s('reversible_pulpitis') && s('irreversible_pulpitis') > 5)
            scores['reversible_pulpitis'] *= 0.35;
          if (s('caries_shallow') > 20 && s('caries_deep') > 0) scores['caries_deep'] *= 0.65;
          if (s('caries_deep') > 20 && s('caries_shallow') > 0) scores['caries_shallow'] *= 0.55;
          if (s('anug') > 15)
            ['gingivitis','periodontitis','puberty_gingivitis'].forEach(k => { scores[k] *= 0.18; });
          if (s('pemphigus') > 10 && s('pemphigoid') > 10) {
            if (s('pemphigus') > s('pemphigoid')) scores['pemphigoid'] *= 0.25;
            else scores['pemphigus'] *= 0.25;
          }
          if (s('periodontal_abscess') > 8) scores['perio_endo_lesion'] = (s('perio_endo_lesion') || 0) * 0.3;
          if (s('vertical_root_fracture') > 8) scores['cracked_tooth'] = (s('cracked_tooth') || 0) * 0.35;

          Object.keys(scores).forEach(k => { scores[k] = Math.round(scores[k] * 10) / 10; });
          this.scores = scores;
          return this.ranking();
        }

        ranking(topN = 8) {
          const sorted = Object.entries(this.scores)
            .filter(([_, score]) => score > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, topN);
          return sorted.map(([diseaseId, score]) => {
            const d = DISEASES[diseaseId];
            return { id: diseaseId, name: d?.name || diseaseId, score, urgency: d?.urgency || 'green', advice: d?.advice || '', desc: d?.desc || '', cat: d?.cat || 'other', emoji: d?.emoji || '🦷' };
          });
        }
      }

module.exports = { DISEASE_CATEGORIES, DISEASES, DISEASE_GRAPH, QUESTION_TREE, OralTriageEngine };
