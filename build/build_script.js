// Renders script/presentation_script.md from script_data.js (same text as the speaker notes).
const fs = require("fs");
const path = require("path");
const { SPEAKERS, SLIDES, QA } = require("./script_data");

const OUT = path.join(__dirname, "..", "script", "presentation_script.md");
const L = [];
const p = (...a) => L.push(...a, "");

p("# Presentation script · 演讲稿", "**Numbers That Talk — divisibility rules and the modular arithmetic behind them**", "**数字会说话 —— 整除速判规则背后的模运算**");
p("Zhiheng Li (slides A1–A5) · Yueran (slides B1–B5) · MATH 5248 · 5 minutes each · 每人 5 分钟");
p("Slides: [`slides/presentation.pptx`](../slides/presentation.pptx). The English text below is also in each slide's speaker notes.",
  "下面的英文稿同时放在每页的演讲者备注里。中文稿是口语版，不是逐字翻译，照着说顺口就行。");
p("## Before we start · 开场前",
  "- Zhiheng needs nothing. Yueran needs **three people with calculators** (phones are fine) — spot them while Zhiheng is talking.",
  "- Zhiheng 不需要道具。Yueran 需要三位有计算器的同学（手机就行），在 Zhiheng 讲的时候先物色好。",
  "- Hand-off: Zhiheng's last slide ends with a question (\"what if 10ᵏ ≡ −1?\"); Yueran answers it with a trick, not with a definition.",
  "- 交接：Zhiheng 最后一页抛出问题，Yueran 用魔术回答，不要用定义回答。",
  "- Don't read the slides. Each slide has one idea; say it in your own words and point at the picture.",
  "- 不要念 slides。每页只有一个点，用自己的话说，手指着图讲。",
  "- Timing below is the target. Rehearse with a phone timer; the magic slides are the ones that run long.",
  "- 下面的时间是目标值。用手机计时排练，魔术那两页最容易超时。");

for (const s of SLIDES) {
  p(`## ${s.id} · ${s.time} · ${s.title}`, `**Speaker 讲者: ${SPEAKERS[s.speaker]}**`);
  p("**EN**", ...s.en.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => l));
  p("**中文**", ...s.zh.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => l));
  if (s.actions) p(...s.actions.map((a) => `> ${a}`));
  if (s.backup) p("**Backup numbers · 备用数字**", ...s.backup.map((b) => `- ${b}`));
}

p("## Likely questions · 可能被问到的问题");
for (const q of QA) p(`**${q.q}**`, `- ${q.en}`, `- ${q.zh}`);

p("## Word counts · 字数");
L.push("| slide | EN words | 中文字数 |", "|---|---|---|");
for (const s of SLIDES) L.push(`| ${s.id} | ${s.en.split(/\s+/).filter(Boolean).length} | ${s.zh.replace(/\s/g, "").length} |`);
L.push("");

fs.writeFileSync(OUT, L.join("\n"));
console.log("wrote", OUT);
