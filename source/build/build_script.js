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
p("# 演讲稿 · MATH 5248 final talk");
p(`共 ${total} 秒。Zhiheng 讲 1–5，Yueran 讲 6–9。每页先中文后英文，英文照着念就行。**加粗**是指着屏幕说的，*斜体*是提醒自己的，不用念。`);
p("主线：只把 10 ≡ 1 (mod 9) 讲透，后面都是结论，证明让大家看 worksheet 背面。");
p("时间（秒）：" + SLIDES.map((s) => `${s.n} ${s.title.split(":")[0]} ${s.secs}`).join(" · ") + ` → 共 ${total} 秒（约 ${Math.round(total / 60)} 分钟）。`);
p("准备：worksheet 双面打印，开讲前发。魔术二用手机计算器。第 5 页问\"10ᵏ ≡ −1 呢？\"，Yueran 直接用魔术接。");
p("---");

for (const s of SLIDES) {
  p(`## Slide ${s.n} · ${s.title}（${SPEAKERS[s.speaker]}，约 ${s.secs} 秒）`);
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
