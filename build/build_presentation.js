// Presentation deck: 10 slides, 5 per speaker, ~5 minutes each.
const path = require("path");
const { THEME, newPres, bi, txt, blocks, clock9, cycle, signChain, pill, formulaBox, table } = require("./theme");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");
const { SLIDES } = require("./script_data");

const OUT = path.join(__dirname, "..", "slides", "presentation.pptx");
const notes = Object.fromEntries(SLIDES.map((s) => [s.id, s.en]));

async function main() {
  const { pres, col } = newPres();
  const S = pres.ShapeType;

  // ───────────────────────── A1  cover ─────────────────────────
  pres.addSection({ title: "Zhiheng" });
  let s = pres.addSlide({ masterName: "BOARD_HERO", sectionTitle: "Zhiheng" });
  txt(s, col, "2026", { x: 0.5, y: 0.9, w: 4.2, h: 1.7, size: 110, bold: true, color: col.chalk, fontFace: "Cambria", align: "left" });
  txt(s, col, "2 + 0 + 2 + 6 = {y:10} → {y:1}", { x: 0.55, y: 2.6, w: 4.2, h: 0.5, size: 22, color: col.chalk, fontFace: "Cambria" });
  txt(s, col, "so 2026 leaves remainder {y:1} when divided by 9", { x: 0.55, y: 3.05, w: 4.4, h: 0.35, size: 14, color: col.mutedChalk, italic: true });
  txt(s, col, "2026 除以 9 余 1", { x: 0.55, y: 3.38, w: 4.2, h: 0.3, size: 12, color: col.mutedChalk });

  txt(s, col, "Numbers That Talk", { x: 5.0, y: 0.95, w: 4.6, h: 0.7, size: 36, bold: true, color: col.yellow, fontFace: "Cambria" });
  txt(s, col, "数字会说话", { x: 5.0, y: 1.6, w: 4.6, h: 0.5, size: 22, color: col.yellow, fontFace: "Cambria" });
  bi(s, col, [
    { en: "Divisibility shortcuts, and the modular arithmetic hiding behind them", zh: "整除速判规则，以及藏在背后的模运算" },
  ], { x: 5.0, y: 2.2, w: 4.5, h: 1.0, size: 15 });
  bi(s, col, [
    { en: "Zhiheng Li  ·  Yueran", zh: "MATH 5248 · Fall 2026 · final mini project" },
  ], { x: 5.0, y: 3.2, w: 4.5, h: 0.7, size: 15 });

  pill(s, pres, col, "Is 2026 divisible by 9?   /   2026 能被 9 整除吗？", { x: 0.5, y: 4.3, w: 9.0, h: 0.62, size: 18, fill: col.yellow });
  s.addNotes(notes.A1);

  // ───────────────────────── A2  magic: vanishing digit ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD", sectionTitle: "Zhiheng" });
  s.addText([{ text: "Magic trick 1: the vanishing digit  ", options: {} }, { text: "魔术一：消失的数字", options: { fontSize: 18, color: col.mutedChalk, bold: false } }], { placeholder: "title" });
  const steps = [
    { en: "Think of a 4-digit number (not all digits the same).", zh: "心里想一个四位数（各位不能全相同）" },
    { en: "Shuffle its digits into a new number.", zh: "把数字打乱，拼成另一个数" },
    { en: "Subtract: bigger minus smaller.", zh: "大的减小的" },
    { en: "Circle one {y:non-zero} digit of the result. Hide it.", zh: "在结果里圈一个非零数字，藏起来" },
    { en: "Read me the other digits, in any order.", zh: "其余数字按任意顺序念给我" },
  ];
  steps.forEach((st, i) => {
    const y = 1.25 + i * 0.74;
    s.addShape(S.ellipse, { x: 0.5, y: y + 0.04, w: 0.42, h: 0.42, fill: { color: col.yellow }, line: { color: col.yellow, width: 0 }, objectName: "step-dot" });
    s.addText(String(i + 1), { x: 0.5, y: y + 0.04, w: 0.42, h: 0.42, fontSize: 16, bold: true, color: col.board, align: "center", valign: "middle", isTextBox: true, margin: 0, objectName: "step-num" });
    bi(s, col, [st], { x: 1.08, y, w: 4.6, h: 0.7, size: 15, zhSize: 12 });
  });

  // example column
  txt(s, col, "example / 例子", { x: 6.1, y: 1.2, w: 3.4, h: 0.3, size: 12, color: col.mutedChalk });
  const bA2 = blocks(s, pres, col, [{ text: "5274", fill: col.chalk }, { text: "7425", fill: col.chalk }], { x: 6.1, y: 1.55, size: 20, h: 0.5, gap: 0.55 });
  txt(s, col, "→", { x: bA2.boxes[0].x + bA2.boxes[0].w, y: 1.55, w: 0.55, h: 0.5, size: 18, color: col.mutedChalk, align: "center" });
  txt(s, col, "7425 − 5274 =", { x: 6.1, y: 2.2, w: 2.2, h: 0.5, size: 18, color: col.chalk, fontFace: "Cambria" });
  // 2151 with 5 circled
  const digits2151 = ["2", "1", "5", "1"];
  digits2151.forEach((d, i) => {
    const x = 8.15 + i * 0.36;
    if (d === "5") s.addShape(S.ellipse, { x: x - 0.02, y: 2.22, w: 0.4, h: 0.46, fill: { color: col.board }, line: { color: col.pink, width: 2.25 }, objectName: "circled" });
    txt(s, col, d, { x, y: 2.2, w: 0.36, h: 0.5, size: 20, bold: true, color: d === "5" ? col.pink : col.chalk, fontFace: "Cambria", align: "center" });
  });
  bi(s, col, [
    { en: "They read: 2, 1, 1  →  sum 4", zh: "念出 2、1、1，和是 4" },
    { en: "4 needs {y:5} to reach 9. The hidden digit is {y:5}.", zh: "4 补到 9 还差 5，藏的就是 5" },
    { en: "If the sum is already a multiple of 9, the answer is 9.", zh: "和本身是 9 的倍数时，答案是 9" },
  ], { x: 6.1, y: 2.85, w: 3.5, h: 2.1, size: 13, zhSize: 11, gap: 5 });
  s.addNotes(notes.A2);

  // ───────────────────────── A3  clock ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD", sectionTitle: "Zhiheng" });
  s.addText([{ text: "A clock with only 9 marks  ", options: {} }, { text: "只有 9 个刻度的钟", options: { fontSize: 18, color: col.mutedChalk, bold: false } }], { placeholder: "title" });
  clock9(s, pres, col, 2.1, 3.0, 1.55, { highlight: [1, 9], hand: 1 });
  txt(s, col, "walk {y:10} steps = walk {y:1} step", { x: 0.3, y: 4.68, w: 3.6, h: 0.3, size: 13, color: col.chalk, align: "center" });
  txt(s, col, "走 10 格 = 走 1 格；100 格、1000 格也一样", { x: 0.3, y: 4.95, w: 3.6, h: 0.28, size: 11, color: col.mutedChalk, align: "center" });

  formulaBox(s, pres, col, "2026 = 2·{y:10^{3}} + 0·{y:10^{2}} + 2·{y:10} + 6", { x: 4.3, y: 1.3, w: 5.2, h: 0.62, size: 20 });
  txt(s, col, "on the 9-clock every {y:10^{k}} is just {y:1}  ·  钟上每个 10 的幂都只是 1", { x: 4.3, y: 1.98, w: 5.2, h: 0.32, size: 12, color: col.mutedChalk, align: "center" });
  formulaBox(s, pres, col, "2026 ≡ 2 + 0 + 2 + 6 = 10 ≡ {y:1}   (mod 9)", { x: 4.3, y: 2.35, w: 5.2, h: 0.62, size: 20 });

  bi(s, col, [
    { en: "Same digits  ⇒  same spot on the clock.", zh: "数字一样 ⇒ 停在同一个刻度" },
    { en: "Subtract  ⇒  land on the top, that is 0 (mod 9).", zh: "一减 ⇒ 回到顶上，也就是 0" },
    { en: "So the digits of the result add to a multiple of 9. You read all but one; I fill in the gap.", zh: "所以结果的各位数字之和是 9 的倍数。你念了其余的，我补上缺的那个" },
  ], { x: 4.3, y: 3.15, w: 5.2, h: 2.0, size: 14, zhSize: 11, gap: 5 });
  s.addNotes(notes.A3);

  // ───────────────────────── A4  99 / 999 ─────────────────────────
  s = pres.addSlide({ masterName: "PAPER", sectionTitle: "Zhiheng" });
  s.addText([{ text: "Bigger chunks: 99 and 999  ", options: {} }, { text: "两位一组、三位一组", options: { fontSize: 18, color: col.mutedInk, bold: false } }], { placeholder: "title" });

  formulaBox(s, pres, col, "100 = 99 + 1   ⇒   {g:100 ≡ 1 (mod 99)}", { x: 0.5, y: 1.25, w: 4.3, h: 0.55, size: 17, dark: false });
  bi(s, col, [{ en: "add 2-digit chunks → remainder mod 99 (and 11, 33)", zh: "两位一组相加 → 除以 99 的余数（顺便 11、33）" }], { x: 0.5, y: 1.88, w: 4.3, h: 0.7, size: 13, zhSize: 11, dark: false });
  const b99 = blocks(s, pres, col, [{ text: "12", fill: col.yellow }, { text: "34", fill: col.green }, { text: "53", fill: col.yellow }], { x: 0.5, y: 2.6, size: 18, h: 0.45, gap: 0.1 });
  txt(s, col, "12 + 34 + 53 = 99 ✓  so 99 | 123453", { x: b99.x2 + 0.15, y: 2.6, w: 4.8 - b99.x2 - 0.15, h: 0.45, size: 13, color: col.ink });

  formulaBox(s, pres, col, "1000 = 999 + 1,   999 = {g:27 × 37}", { x: 5.2, y: 1.25, w: 4.3, h: 0.55, size: 17, dark: false });
  bi(s, col, [{ en: "add 3-digit chunks → tests 27 and 37", zh: "三位一组相加 → 判断 27 和 37" }], { x: 5.2, y: 1.88, w: 4.3, h: 0.7, size: 13, zhSize: 11, dark: false });
  const b999 = blocks(s, pres, col, [{ text: "45", fill: col.yellow }, { text: "658", fill: col.green }], { x: 5.2, y: 2.6, size: 18, h: 0.45, gap: 0.1 });
  txt(s, col, "45 + 658 = 703 = 19 × 37 ✓", { x: b999.x2 + 0.15, y: 2.6, w: 9.5 - b999.x2 - 0.15, h: 0.45, size: 13, color: col.ink });

  // the big worked example
  s.addShape(S.roundRect, { x: 0.5, y: 3.3, w: 9.0, h: 1.05, fill: { color: "EEF4F0" }, line: { color: "EEF4F0", width: 0 }, rectRadius: 0.1, objectName: "example-bg" });
  txt(s, col, "45658", { x: 0.7, y: 3.38, w: 1.9, h: 0.9, size: 40, bold: true, color: col.board, fontFace: "Cambria" });
  bi(s, col, [
    { en: "37 divides 45658, no long division needed. (It is 37 × 1234. We checked.)", zh: "不用长除法就知道 37 整除 45658。（它等于 37 × 1234，我们验算过。）" },
    { en: "Same trick, 2026 → 2 + 026 = 28, so 2026 ≡ 28 (mod 37).", zh: "同样地，2026 → 2 + 026 = 28，所以 2026 除以 37 余 28" },
  ], { x: 2.7, y: 3.4, w: 6.6, h: 0.9, size: 13, zhSize: 11, dark: false, gap: 3 });

  pill(s, pres, col, "Always chunk from the right:  45 | 658, not 456 | 58   ·   一定从个位开始分组", { x: 0.5, y: 4.55, w: 9.0, h: 0.5, size: 14, fill: col.pink, color: col.paper });
  s.addNotes(notes.A4);

  // ───────────────────────── A5  transition ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD_HERO", sectionTitle: "Zhiheng" });
  txt(s, col, "Family one:  {y:10^{k} ≡ 1}", { x: 0.6, y: 0.5, w: 5, h: 0.6, size: 26, bold: true, color: col.chalk, fontFace: "Cambria" });
  bi(s, col, [
    { en: "10 ≡ 1 (mod 9)   →   digit sum", zh: "数字和" },
    { en: "100 ≡ 1 (mod 99)   →   2-digit chunks", zh: "两位一组" },
    { en: "1000 ≡ 1 (mod 999 = 27 × 37)   →   3-digit chunks", zh: "三位一组" },
  ], { x: 0.6, y: 1.2, w: 5.2, h: 2.2, size: 16, zhSize: 12, gap: 8 });

  txt(s, col, "7 ?   13 ?", { x: 5.9, y: 0.9, w: 3.8, h: 1.3, size: 72, bold: true, color: col.pink, fontFace: "Cambria", align: "center" });
  bi(s, col, [
    { en: "999 = 27 × 37. No 7, no 13 anywhere.", zh: "999 = 27 × 37，里面没有 7，也没有 13" },
    { en: "Does 7 even have a rule?", zh: "7 到底有没有规则？" },
  ], { x: 5.9, y: 2.25, w: 3.8, h: 1.3, size: 15, zhSize: 12, align: "center" });

  formulaBox(s, pres, col, "What if   {p:10^{k} ≡ −1}   instead?", { x: 0.6, y: 3.7, w: 8.8, h: 0.7, size: 26, bold: true });
  txt(s, col, "如果 10 的某个次方等于 −1 呢？  →  Yueran", { x: 0.6, y: 4.45, w: 8.8, h: 0.4, size: 14, color: col.mutedChalk, align: "center" });
  s.addNotes(notes.A5);

  // ───────────────────────── B1  magic: 1001 ─────────────────────────
  pres.addSection({ title: "Yueran" });
  s = pres.addSlide({ masterName: "BOARD", sectionTitle: "Yueran" });
  s.addText([{ text: "Magic trick 2: 1001 brings it back  ", options: {} }, { text: "魔术二：1001 回到原数", options: { fontSize: 18, color: col.mutedChalk, bold: false } }], { placeholder: "title" });

  // flow: 572 → 572572 → ÷7 → 81796 → ÷11 → 7436 → ÷13 → 572
  const flow = [
    { text: "572", fill: col.yellow, cap: "any 3-digit number\n任意三位数" },
    { text: "572572", fill: col.chalk, cap: "write it twice\n写两遍" },
    { text: "81796", fill: col.chalk, cap: "calculator 1: ÷ 7\n第一位同学 ÷ 7" },
    { text: "7436", fill: col.chalk, cap: "calculator 2: ÷ 11\n第二位 ÷ 11" },
    { text: "572", fill: col.yellow, cap: "calculator 3: ÷ 13\n第三位 ÷ 13" },
  ];
  const fx = [0.5, 2.15, 4.05, 5.95, 7.85];
  const fw = [1.3, 1.6, 1.6, 1.6, 1.3];
  flow.forEach((f, i) => {
    const x = fx[i], w = fw[i];
    s.addShape(S.roundRect, { x, y: 1.5, w, h: 0.75, fill: { color: f.fill }, line: { color: f.fill, width: 0 }, rectRadius: 0.1, objectName: "flow-box" });
    s.addText(f.text, { x, y: 1.5, w, h: 0.75, fontSize: 26, bold: true, color: col.board, align: "center", valign: "middle", isTextBox: true, margin: 0, fontFace: "Cambria", objectName: "flow-text" });
    const [en, zh] = f.cap.split("\n");
    bi(s, col, [{ en, zh }], { x: x - 0.15, y: 2.32, w: w + 0.3, h: 0.7, size: 11, zhSize: 10, align: "center" });
    if (i < flow.length - 1) {
      const ax = x + w + 0.08, aw = fx[i + 1] - ax - 0.08;
      s.addShape(S.line, { x: ax, y: 1.875, w: aw, h: 0.001, line: { color: col.chalk, width: 2, endArrowType: "triangle" }, objectName: "flow-arrow" });
    }
  });

  bi(s, col, [
    { en: "Every division comes out exact. The last one gives back the number you started with. Try your own number.", zh: "每一步都能整除，最后一步回到你最初的数。用你自己的数试试。" },
  ], { x: 0.5, y: 3.25, w: 9.0, h: 0.8, size: 14, zhSize: 12 });
  s.addShape(S.roundRect, { x: 0.5, y: 4.1, w: 9.0, h: 0.9, fill: { color: "2A4A3C" }, line: { color: "2A4A3C", width: 0 }, rectRadius: 0.1, objectName: "live-bg" });
  txt(s, col, "live  现场", { x: 0.7, y: 4.15, w: 1.5, h: 0.3, size: 11, color: col.mutedChalk });
  txt(s, col, "______  →  ____________  →  ÷ 7  →  ÷ 11  →  ÷ 13  →  ______", { x: 0.7, y: 4.4, w: 8.6, h: 0.5, size: 18, color: col.yellow, fontFace: "Cambria", align: "center" });
  s.addNotes(notes.B1);

  // ───────────────────────── B2  reveal ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD", sectionTitle: "Yueran" });
  s.addText([{ text: "Why it works: 1000 acts like −1  ", options: {} }, { text: "揭秘：1000 就是 −1", options: { fontSize: 18, color: col.mutedChalk, bold: false } }], { placeholder: "title" });
  formulaBox(s, pres, col, "abcabc = abc·1000 + abc = abc · 1001 = abc · {p:7 · 11 · 13}", { x: 0.5, y: 1.25, w: 9.0, h: 0.6, size: 20 });

  // left: one digit at a time (mod 11)
  txt(s, col, "one digit at a time:  10 = 11 − 1,  so  {p:10 ≡ −1 (mod 11)}", { x: 0.5, y: 2.05, w: 4.6, h: 0.35, size: 14, color: col.chalk });
  txt(s, col, "一位一位看：10 ≡ −1 (mod 11)，从个位起正负交替", { x: 0.5, y: 2.36, w: 4.6, h: 0.3, size: 11, color: col.mutedChalk });
  signChain(s, pres, col, ["2", "0", "2", "6"], { x: 0.75, y: 3.05, size: 30, cell: 0.65, gap: 0.3, powers: ["10^{3}≡−1", "10^{2}≡+1", "10≡−1", "1"] });
  // powers via runs can't be in plain addText; replace labels after: simpler, draw separately
  txt(s, col, "6 − 2 + 0 − 2 = {y:2}   ⇒   2026 ≡ 2 (mod 11) ✓", { x: 0.5, y: 4.25, w: 4.6, h: 0.4, size: 16, color: col.chalk, fontFace: "Cambria" });
  txt(s, col, "start the + from the units digit  ·  从个位开始取正号", { x: 0.5, y: 4.65, w: 4.6, h: 0.3, size: 11, color: col.mutedChalk });

  // right: three digits at a time (mod 1001)
  txt(s, col, "3 digits at a time:  1000 = 1001 − 1,  so  {p:1000 ≡ −1}", { x: 5.3, y: 2.05, w: 4.3, h: 0.35, size: 14, color: col.chalk });
  txt(s, col, "三位一组：1000 ≡ −1 (mod 1001)，交替相加", { x: 5.3, y: 2.36, w: 4.3, h: 0.3, size: 11, color: col.mutedChalk });
  const bB2 = blocks(s, pres, col, [{ text: "2", fill: col.pink, op: "−" }, { text: "026", fill: col.yellow }], { x: 5.5, y: 2.95, size: 28, h: 0.7, gap: 0.4 });
  txt(s, col, "=  {y:24}", { x: bB2.x2 + 0.2, y: 2.95, w: 9.6 - bB2.x2 - 0.2, h: 0.7, size: 26, color: col.chalk, fontFace: "Cambria" });
  bi(s, col, [
    { en: "24 ≡ 3 (mod 7),  24 ≡ 11 (mod 13). Both are the true remainders of 2026.", zh: "24 除以 7 余 3、除以 13 余 11，和 2026 的余数完全一样" },
    { en: "572572 → 572 − 572 = 0  ⇒  7, 11, 13 all divide it.", zh: "572572 → 572 − 572 = 0，所以 7、11、13 都整除它" },
  ], { x: 5.3, y: 3.8, w: 4.3, h: 1.3, size: 13, zhSize: 11, gap: 4 });
  s.addNotes(notes.B2);

  // ───────────────────────── B3  one idea ─────────────────────────
  s = pres.addSlide({ masterName: "PAPER", sectionTitle: "Yueran" });
  s.addText([{ text: "One idea, every rule  ", options: {} }, { text: "一个想法，所有规则", options: { fontSize: 18, color: col.mutedInk, bold: false } }], { placeholder: "title" });
  formulaBox(s, pres, col, "find k with  10^{k} ≡ {g:+1}  or  {p:−1}   (mod d)", { x: 0.5, y: 1.2, w: 9.0, h: 0.6, size: 22, dark: false, bold: true });
  bi(s, col, [
    { en: "{g:+1}  →  cut into k-digit chunks from the right and {g:add} them", zh: "+1 → 从个位起 k 位一组，相加" },
    { en: "{p:−1}  →  same chunks, {p:alternate} + − + −", zh: "−1 → 同样分组，正负交替相加" },
    { en: "The result is the remainder mod d, not just yes/no.", zh: "得到的不只是能否整除，连余数都对" },
  ], { x: 0.5, y: 1.9, w: 4.0, h: 2.2, size: 14, zhSize: 11, dark: false, gap: 6 });
  table(s, col, [
    ["d", "k", "10ᵏ ≡", "rule / 规则"],
    ["3, 9", "1", "+1", "digit sum · 数字和"],
    ["11", "1", "−1", "alternate digits · 一位交错"],
    ["101", "2", "−1", "alternate 2-chunks · 两位交错"],
    ["37 (and 27)", "3", "+1", "add 3-chunks · 三位相加"],
    ["7, 13 (and 77)", "3", "−1", "alternate 3-chunks · 三位交错"],
    ["41", "5", "+1", "add 5-chunks · 五位相加"],
  ], { x: 4.8, y: 1.9, w: 4.7, h: 2.6, colW: [1.25, 0.45, 0.7, 2.3], dark: false, size: 12, headSize: 12 });
  txt(s, col, "{b:2026}: 2+0+2+6 = 10 → mod 9 = 1 · 6−2+0−2 → mod 11 = 2 · 026−2 = 24 → mod 7 = 3, mod 13 = 11 · 2+026 → mod 37 = 28", { x: 0.5, y: 4.65, w: 9.0, h: 0.4, size: 12, color: col.mutedInk });
  s.addNotes(notes.B3);

  // ───────────────────────── B4  Fermat, order, 142857 ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD", sectionTitle: "Yueran" });
  s.addText([{ text: "Why every prime gets a rule  ", options: {} }, { text: "为什么一定有规则", options: { fontSize: 18, color: col.mutedChalk, bold: false } }], { placeholder: "title" });
  formulaBox(s, pres, col, "Fermat:  10^{p−1} ≡ 1 (mod p)   for every prime p ≠ 2, 5", { x: 0.5, y: 1.2, w: 5.3, h: 0.55, size: 17 });
  bi(s, col, [
    { en: "So (p − 1)-digit chunks always work.", zh: "所以 (p − 1) 位一组一定可以" },
    { en: "Shortest {y:additive} chunk = ord_{p}(10), the order of 10 mod p.", zh: "最短的相加组长 = 10 模 p 的阶" },
    { en: "And that same number is the period of 1/p.", zh: "这个数也正好是 1/p 的循环节长度" },
  ], { x: 0.5, y: 1.9, w: 5.3, h: 1.7, size: 14, zhSize: 11, gap: 5 });
  formulaBox(s, pres, col, "1/7 = 0.{y:142857} 142857 …     ord_{7}(10) = {y:6}", { x: 0.5, y: 3.55, w: 5.3, h: 0.55, size: 17 });
  bi(s, col, [
    { en: "142857 × 2 = 285714,  × 3 = 428571,  × 6 = 857142. Same digits, rotated. 10 is a primitive root mod 7.", zh: "乘 2、3、…、6 都是同一串数字转圈。因为 10 是模 7 的原根" },
  ], { x: 0.5, y: 4.2, w: 5.3, h: 0.9, size: 13, zhSize: 11 });

  cycle(s, pres, col, 7.75, 2.85, 1.2, [
    { label: "1", hot: true, note: "digit 1" }, { label: "3", note: "digit 4" }, { label: "2", note: "digit 2" },
    { label: "6", note: "digit 8" }, { label: "4", note: "digit 5" }, { label: "5", note: "digit 7" },
  ], { arrow: col.yellow });
  txt(s, col, "remainders of 1 ÷ 7 = powers of 10 mod 7", { x: 5.95, y: 4.72, w: 3.6, h: 0.28, size: 11, color: col.chalk, align: "center" });
  txt(s, col, "长除法的余数 = 10 的各次幂模 7，6 步回到 1", { x: 5.95, y: 4.98, w: 3.6, h: 0.26, size: 10, color: col.mutedChalk, align: "center" });
  s.addNotes(notes.B4);

  // ───────────────────────── B5  closing ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD_HERO", sectionTitle: "Yueran" });
  txt(s, col, "If you know what {y:10} is mod d,", { x: 0.6, y: 0.7, w: 8.8, h: 0.6, size: 30, bold: true, color: col.chalk, fontFace: "Cambria" });
  txt(s, col, "you can build the rule for d yourself.", { x: 0.6, y: 1.3, w: 8.8, h: 0.6, size: 30, bold: true, color: col.chalk, fontFace: "Cambria" });
  txt(s, col, "只要知道 10 模 d 等于几，你就能自己造出 d 的整除规则。", { x: 0.6, y: 1.95, w: 8.8, h: 0.45, size: 18, color: col.mutedChalk });
  bi(s, col, [
    { en: "Fermat says the rule exists.  The order of 10 says how short it can be.", zh: "费马小定理保证规则存在；10 的阶决定它最短有多短，也等于 1/d 的循环节长度" },
  ], { x: 0.6, y: 2.55, w: 8.8, h: 0.9, size: 16, zhSize: 12 });

  s.addShape(S.roundRect, { x: 0.6, y: 3.5, w: 8.8, h: 1.0, fill: { color: "2A4A3C" }, line: { color: "2A4A3C", width: 0 }, rectRadius: 0.1, objectName: "more-bg" });
  bi(s, col, [
    { en: "In the full deck: chop-the-last-digit rule for 7 (x − 2y), why ISBN uses 11, Midy's 142 + 857 = 999, and every proof.", zh: "完整版里还有：7 的砍个位法、ISBN 为什么用 11、Midy 定理、以及每一步的证明" },
    { en: "github.com/ZhihengLi0/math5248", zh: "" },
  ], { x: 0.8, y: 3.58, w: 8.4, h: 0.85, size: 13, zhSize: 11, gap: 3 });
  txt(s, col, "Thank you  ·  谢谢   ·   now go try the 1001 trick on a friend", { x: 0.6, y: 4.7, w: 8.8, h: 0.45, size: 16, color: col.yellow, align: "center" });
  s.addNotes(notes.B5);

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
}
main().catch((e) => { console.error(e); process.exit(1); });
