// Renders presentation/演讲稿.md from script_data.js, in the same layout as the
// SNOLAB talks (speech_script.md there): per slide, 中文 first, then English; bold = said while
// pointing at the screen; italic = private reminder.  build_speech_pdf.py turns it into the PDFs.
const fs = require("fs");
const path = require("path");
const { SPEAKERS, SLIDES, QA, GLOSSARY } = require("./script_data");

const OUT = path.join(__dirname, "..", "..", "presentation", "演讲稿.md");
const L = [];
const p = (...a) => L.push(...a, "");

const total = SLIDES.reduce((s, x) => s + x.secs, 0);
p("# Speaker Script / 演讲稿 — Numbers That Talk: divisibility rules and the modular arithmetic behind them");
p(`两人共 ${Math.round(total / 60)} 分钟，10 页正片（Zhiheng 第 1–5 页，Yueran 第 6–10 页），完整版 22 页另交。每页先中文、后英文，意思一样，**英文可以直接照着念**。全部是短句、口语。斜体是给自己的提示，不用念。**加粗的英文**是指着屏幕说的句子。`);
p("一句话主线：**10 ≡ 1 → 数字和 → 10ᵏ ≡ 1 → k 位一组相加 → 10ᵏ ≡ −1 → 交错相加 → 费马小定理保证规则存在，10 的阶 = 最短相加组长 = 1/p 的循环节。**");
p("时间（秒）：" + SLIDES.map((s) => `${s.n} ${s.title.split(":")[0]} ${s.secs}`).join(" · ") + ` → 共 ${total} 秒（约 ${Math.round(total / 60)} 分钟）。`);
p("道具：Zhiheng 不需要。Yueran 需要三位有计算器的同学（手机就行），Zhiheng 讲的时候先物色好。两人交接：第 5 页抛出\"10ᵏ ≡ −1 呢？\"，第 6 页用魔术回答，不用定义回答。");
p("---");

for (const s of SLIDES) {
  p(`## Slide ${s.n} — ${s.title}（${SPEAKERS[s.speaker]}，约 ${s.secs} 秒）`);
  p(`**中文**：${s.zh}`);
  p(`**English**: ${s.en}`);
  if (s.hints) p(...s.hints.map((h) => `*${h}*`));
  p("---");
}

p("## 可能被问的问题 / Likely questions（回答一两句就够）");
QA.forEach((q, i) => p(`**Q${i + 1}. ${q.zh} / ${q.en}**`, `中文：${q.azh}`, `English: ${q.aen}`));
p("---");
p("## 术语自查表（只给自己，不进 PPT）", ...GLOSSARY.map((g) => `- ${g}`));

fs.writeFileSync(OUT, L.join("\n"));
console.log("wrote", OUT);
