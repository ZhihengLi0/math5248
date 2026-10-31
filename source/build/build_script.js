// Renders script/presentation_script.md from script_data.js (same text as the speaker notes).
const fs = require("fs");
const path = require("path");
const { SPEAKERS, SLIDES, QA } = require("./script_data");

const OUT = path.join(__dirname, "..", "..", "presentation", "presentation_script.md");
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

// Also an HTML copy (LibreOffice turns it into the PDF in export_pdf.sh).
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`(.+?)`/g, "<code>$1</code>").replace(/\[(.+?)\]\((.+?)\)/g, "$1");
const H = [];
let inList = false, inTable = false;
const closeAll = () => { if (inList) { H.push("</ul>"); inList = false; } if (inTable) { H.push("</table>"); inTable = false; } };
for (const line of L) {
  if (/^# /.test(line)) { closeAll(); H.push(`<h1>${inline(line.slice(2))}</h1>`); }
  else if (/^## /.test(line)) { closeAll(); H.push(`<h2>${inline(line.slice(3))}</h2>`); }
  else if (/^- /.test(line)) { if (!inList) { closeAll(); H.push("<ul>"); inList = true; } H.push(`<li>${inline(line.slice(2))}</li>`); }
  else if (/^> /.test(line)) { closeAll(); H.push(`<p class="dir">${inline(line.slice(2))}</p>`); }
  else if (/^\|/.test(line)) { if (/^\|---/.test(line)) continue; if (!inTable) { closeAll(); H.push("<table>"); inTable = true; } const cells = line.split("|").slice(1, -1).map((c) => inline(c.trim())); H.push("<tr>" + cells.map((c) => `<td>${c}</td>`).join("") + "</tr>"); }
  else if (line.trim() === "") { closeAll(); }
  else { closeAll(); H.push(`<p>${inline(line)}</p>`); }
}
closeAll();
const html = `<!doctype html><html><head><meta charset="utf-8"><title>Presentation script</title>
<style>body{font-family:"Helvetica Neue",Helvetica,"PingFang SC","Microsoft YaHei",sans-serif;font-size:11pt;line-height:1.45;margin:1in}
h1{font-size:18pt}h2{font-size:14pt;margin-top:18pt;border-bottom:1px solid #999;padding-bottom:2pt}
p{margin:4pt 0}.dir{color:#555;font-style:italic}code{font-family:Menlo,monospace}
table{border-collapse:collapse}td{border:1px solid #bbb;padding:2pt 8pt}</style></head><body>${H.join("\n")}</body></html>`;
fs.writeFileSync(OUT.replace(/\.md$/, ".html"), html);
console.log("wrote", OUT.replace(/\.md$/, ".html"));
