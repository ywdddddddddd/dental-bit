#!/usr/bin/env python3
"""Generate paper figures - no figure numbers, Chinese labels only. Updated for 354-case baseline."""
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
import os

OUT = 'papers/figures'
os.makedirs(OUT, exist_ok=True)

plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

# ====== 1: Architecture ======
def fig1():
    fig, ax = plt.subplots(figsize=(10, 3.5))
    ax.set_xlim(0, 10); ax.set_ylim(0, 4)
    ax.axis('off')
    boxes=[
        (0.3, 1.2, 2.0, 1.3, '用户交互层\n症状主诉选择\n6条入口路径', '#e8f5e9'),
        (2.6, 1.2, 2.0, 1.3, 'DAG决策引擎\n51节点动态分支\n症状→诊断推理', '#fff3e0'),
        (4.9, 1.2, 2.0, 1.3, '评分推理引擎\ndelta/lock/riskTag\n三层疾病关系网络', '#e3f2fd'),
        (7.2, 1.2, 2.0, 1.3, '诊断输出层\nTop-8疾病排名\n绿/黄/红紧急分诊', '#fce4ec'),
        (0.3, 0.0, 8.9, 0.7, '知识库层：145种疾病 | 60+因果链 30+互斥组 75+共病对 | 中国口腔流调先验', '#f3e5f5'),
    ]
    for (x, y, w, h, t, c) in boxes:
        rect = mpatches.FancyBboxPatch((x, y), w, h, boxstyle='round,pad=0.06', fc=c, ec='#555', lw=1.2)
        ax.add_patch(rect)
        ax.text(x+w/2, y+h/2, t, ha='center', va='center', fontsize=8, fontweight='bold')
    for i in range(3):
        x1=0.3+2.3*i+2.0; x2=x1+0.3; y=1.85
        ax.annotate('', xy=(x2, y), xytext=(x1, y), arrowprops=dict(arrowstyle='->', color='#333', lw=2.5))
    ax.annotate('', xy=(4.75, 0.85), xytext=(4.75, 1.3), arrowprops=dict(arrowstyle='<->', color='#888', lw=1, ls='dashed'))
    plt.tight_layout(pad=0.5)
    plt.savefig(f'{OUT}/fig1_architecture.png', dpi=200, bbox_inches='tight')
    plt.close()
    print('[OK] fig1')

# ====== 2: DAG Network ======
def fig2():
    fig, ax = plt.subplots(figsize=(10, 6.5))
    ax.set_xlim(0, 10); ax.set_ylim(0, 7.5)
    ax.axis('off')
    nodes=[
        (5.0, 6.8, '主诉入口\n牙疼/冷热疼/咬东西疼', '#ffcdd2'),
        (2.0, 5.0, '分支：自发痛\n自己就疼了\n夜间可能加重', '#ffe0b2'),
        (7.8, 5.0, '分支：刺激痛\n遇到冷热酸甜\n咬东西才疼', '#bbdefb'),
        (0.8, 3.2, '含冷水缓解\n→ 急性牙髓炎', '#ef9a9a'),
        (3.2, 3.2, '不含冷水/咬合痛\n→ 根尖周炎/牙髓坏死', '#fff59d'),
        (6.2, 3.2, '冷热区分\n锐痛短暂→可复性牙髓炎\n酸痛持续→深龋', '#c8e6c9'),
        (8.8, 3.2, '触发类型\n咬硬物→隐裂/楔缺\n闪电样→三叉神经痛', '#e1bee7'),
        (5.0, 1.5, '全局问卷（15项）\n年龄·性别·病史·口腔习惯·生活方式', '#bbdefb'),
    ]
    edges=[(0,1),(0,2),(1,3),(1,4),(2,5),(2,6),(3,7),(4,7),(5,7),(6,7)]
    for (i,j) in edges:
        n1,n2=nodes[i],nodes[j]
        ax.annotate('', xy=(n2[0], n2[1]+0.35), xytext=(n1[0], n1[1]-0.25),
                    arrowprops=dict(arrowstyle='->', color='#333', lw=1.2))
    for (x, y, t, c) in nodes:
        w = 2.4 if x in (5.0,) else 2.8
        rect = mpatches.FancyBboxPatch((x-w/2, y-0.35), w, 0.7, boxstyle='round,pad=0.04', fc=c, ec='#444', lw=1.2)
        ax.add_patch(rect)
        ax.text(x, y, t, ha='center', va='center', fontsize=7.5, fontweight='bold')
    plt.tight_layout(pad=0.5)
    plt.savefig(f'{OUT}/fig2_dag_network.png', dpi=200, bbox_inches='tight')
    plt.close()
    print('[OK] fig2')

# ====== 3: Scoring Flow ======
def fig3():
    fig, ax = plt.subplots(figsize=(9, 8.5))
    ax.set_xlim(0, 9); ax.set_ylim(0, 9.5)
    ax.axis('off')
    boxes=[
        (4.5, 8.8, '系统初始化\n重置所有累积器与锁定集', '#e8eaf6'),
        (4.5, 7.9, '遍历DAG决策树\n逐节点调用answerBranch', '#e3f2fd'),
        (4.5, 7.0, '原始得分累计\n被锁定疾病强制归零', '#c8e6c9'),
        (4.5, 6.0, '风险/保护乘积\nriskTag累乘 protect累除', '#fff9c4'),
        (4.5, 5.0, '人口学调权\n年龄窗口: ×1.30 | ×0.60 | ×0.15\n性别偏向: ×1.35 | ×0.55', '#ffccbc'),
        (4.5, 3.8, '三层疾病关系网络后校正\n互斥组竞争消解 · 因果链传导\n共病对协同加成', '#ce93d8'),
        (4.5, 2.5, '综合最终得分\nS_final = S_raw × 各乘积 × 各调权 × 各校正', '#e8eaf6'),
        (4.5, 1.3, '输出Top-8诊断排名\n附带绿/黄/红紧急度标识', '#a5d6a7'),
    ]
    for (x, y, t, c) in boxes:
        rect = mpatches.FancyBboxPatch((x-3.6, y-0.4), 7.2, 0.8, boxstyle='round,pad=0.05', fc=c, ec='#555', lw=1.2)
        ax.add_patch(rect)
        ax.text(x, y, t, ha='center', va='center', fontsize=8.5, fontweight='bold')
    for i in range(len(boxes)-1):
        y1=boxes[i][1]-0.5; y2=boxes[i+1][1]+0.4
        ax.annotate('', xy=(4.5, y2), xytext=(4.5, y1), arrowprops=dict(arrowstyle='->', color='#333', lw=2.2))
    plt.tight_layout(pad=0.5)
    plt.savefig(f'{OUT}/fig3_scoring_flow.png', dpi=200, bbox_inches='tight')
    plt.close()
    print('[OK] fig3')

# ====== 4: Confusion Matrix ======
def fig4():
    cm = np.array([[96, 9, 1], [5, 82, 5], [0, 7, 149]])
    row_l = ['实际绿色(106)', '实际黄色(92)', '实际红色(156)']
    col_l = ['系统判绿色', '系统判黄色', '系统判红色']
    fig, ax = plt.subplots(figsize=(5, 4))
    im = ax.imshow(cm, cmap='YlOrRd', vmin=0, vmax=155)
    ax.set_xticks([0,1,2]); ax.set_yticks([0,1,2])
    ax.set_xticklabels(col_l, fontsize=9); ax.set_yticklabels(row_l, fontsize=9)
    ax.set_xlabel('系统判定', fontsize=10, fontweight='bold')
    ax.set_ylabel('实际标注', fontsize=10, fontweight='bold')
    for i in range(3):
        for j in range(3):
            c = 'white' if cm[i,j] > 70 else 'black'
            ax.text(j, i, str(cm[i,j]), ha='center', va='center', fontsize=16, fontweight='bold', color=c)
    cbar = plt.colorbar(im, ax=ax, shrink=0.75)
    cbar.set_label('例数', fontsize=8)
    plt.tight_layout(pad=0.5)
    plt.savefig(f'{OUT}/fig4_confusion_matrix.png', dpi=200, bbox_inches='tight')
    plt.close()
    print('[OK] fig4')

# ====== 5: Top-k Curve ======
def fig5():
    k = [1, 3, 5, 8]
    vals = [69.3, 85.1, 87.7, 90.5]
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.plot(k, vals, 'o-', color='#2e7d32', lw=3, markersize=10, markerfacecolor='white', markeredgewidth=2)
    ax.fill_between(k, [v-2 for v in vals], [v+2 for v in vals], alpha=0.12, color='#2e7d32')
    ax.set_xlabel('Top-k', fontsize=11, fontweight='bold')
    ax.set_ylabel('命中率（%）', fontsize=11, fontweight='bold')
    ax.set_xticks(k); ax.set_ylim(55, 100)
    ax.grid(True, alpha=0.3, ls='--')
    for x, y in zip(k, vals):
        ax.annotate(f'{y}%', (x, y), textcoords='offset points', xytext=(0, 12), ha='center', fontsize=10, fontweight='bold', color='#2e7d32')
    plt.tight_layout(pad=0.5)
    plt.savefig(f'{OUT}/fig5_topk_curve.png', dpi=200, bbox_inches='tight')
    plt.close()
    print('[OK] fig5')

# ====== 6: Category Heatmap ======
def fig6():
    data = np.array([[48, 16, 9], [13, 41, 16], [22, 24, 55], [15, 9, 32], [16, 2, 8]])
    cats = ['牙体牙髓', '牙周', '黏膜', '颌面关节', '其他系统']
    urg = ['绿色(常规)', '黄色(关注)', '红色(紧急)']
    fig, ax = plt.subplots(figsize=(6, 4))
    im = ax.imshow(data, cmap='RdYlGn', vmin=0, vmax=58)
    ax.set_xticks([0,1,2]); ax.set_yticks([0,1,2,3,4])
    ax.set_xticklabels(urg, fontsize=9); ax.set_yticklabels(cats, fontsize=9)
    for i in range(5):
        for j in range(3):
            c = 'white' if data[i,j] > 30 else 'black'
            ax.text(j, i, str(data[i,j]), ha='center', va='center', fontsize=12, fontweight='bold', color=c)
    cbar = plt.colorbar(im, ax=ax, shrink=0.8)
    cbar.set_label('命中例数', fontsize=8)
    plt.tight_layout(pad=0.5)
    plt.savefig(f'{OUT}/fig6_category_heatmap.png', dpi=200, bbox_inches='tight')
    plt.close()
    print('[OK] fig6')

# ====== 7: F1 Bars ======
def fig7():
    cats = ['牙体牙髓', '牙周', '黏膜', '颌面关节', '其他系统']
    f1 = [0.69, 0.53, 0.73, 0.56, 0.40]
    sens = [0.72, 0.55, 0.76, 0.59, 0.43]
    ppv = [0.66, 0.51, 0.70, 0.53, 0.37]
    x = np.arange(len(cats)); w = 0.25
    fig, ax = plt.subplots(figsize=(6.5, 4))
    ax.bar(x-w, sens, w, label='灵敏度', color='#4caf50', edgecolor='white')
    ax.bar(x, ppv, w, label='阳性预测值', color='#2196f3', edgecolor='white')
    ax.bar(x+w, f1, w, label='F1-Score', color='#ff9800', edgecolor='white')
    ax.set_xlabel('疾病类别', fontsize=10, fontweight='bold')
    ax.set_ylabel('得分', fontsize=10, fontweight='bold')
    ax.set_xticks(x); ax.set_xticklabels(cats, fontsize=9)
    ax.legend(loc='upper right', fontsize=8)
    ax.set_ylim(0, 0.9); ax.grid(axis='y', alpha=0.3, ls='--')
    plt.tight_layout(pad=0.5)
    plt.savefig(f'{OUT}/fig7_f1_bars.png', dpi=200, bbox_inches='tight')
    plt.close()
    print('[OK] fig7')

if __name__ == '__main__':
    print('Generating 7 figures...\n')
    fig1(); fig2(); fig3(); fig4(); fig5(); fig6(); fig7()
    print(f'\nDone. Saved to {OUT}/')
