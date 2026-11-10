// Presentation deck: 9 slides. Zhiheng 1-5 (10 ≡ 1, trick 1), Yueran 6-9 (trick 2, the general result).
const path = require("path");
const { THEME, finalize, newPres, title, bi, txt, blocks, clock9, cycle, pill, formulaBox } = require("./theme");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");
const { SLIDES } = require("./script_data");

const OUT = path.join(__dirname, "..", "..", "presentation", "PPT演讲版.pptx");
const notes = Object.fromEntries(SLIDES.map((s) => [s.id, s.en.replace(/\*\*/g, "")]));

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
    { en: "Divisibility rules and why they work", zh: "整除规则和它们背后的原理" },
  ], { x: 5.0, y: 2.2, w: 4.5, h: 1.0, size: 15 });
  bi(s, col, [
    { en: "Zhiheng Li and Yueran" }, { en: "MATH 5248, Fall 2026" },
  ], { x: 5.0, y: 3.2, w: 4.5, h: 0.7, size: 15 });

  pill(s, pres, col, "Is 2026 divisible by 9?   ·   2026 能被 9 整除吗？", { x: 0.5, y: 4.3, w: 9.0, h: 0.62, size: 18, fill: col.yellow });
  s.addNotes(notes.A1);

  // ───────────────────────── A2  magic: vanishing digit ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD", sectionTitle: "Zhiheng" });
  title(s, col, "Magic trick 1: the vanishing digit", "魔术一：消失的数字", true);
  const steps = [
    { en: "Think of a 4-digit number (not all digits the same).", zh: "心里想一个四位数（各位不能全相同）" },
    { en: "Shuffle its digits into a new number.", zh: "把数字打乱，拼成另一个数" },
    { en: "Subtract: bigger minus smaller.", zh: "大的减小的" },
    { en: "Circle one {y:non-zero} digit of the result. Hide it.", zh: "在结果里圈一个非零数字，藏起来" },
    { en: "Read me the other digits, in any order.", zh: "其余数字按任意顺序念给我" },
  ];
  steps.forEach((st, i) => {
    const y = 1.25 + i * 0.64;
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
  ], { x: 6.1, y: 2.85, w: 3.5, h: 1.55, size: 13, zhSize: 11, gap: 5 });
  pill(s, pres, col, "Write along in box 1 of your worksheet", { x: 0.5, y: 4.55, w: 9.0, h: 0.45, size: 14, fill: col.yellow });
  s.addNotes(notes.A2);

  // ───────────────────────── A3  999 / 99 / 9 breakdown + clock ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD", sectionTitle: "Zhiheng" });
  title(s, col, "A clock with only 9 marks", "只有 9 个刻度的钟", true);
  clock9(s, pres, col, 1.75, 2.75, 1.2, { highlight: [1, 9], hand: 1 });
  txt(s, col, "walk {y:10} steps = walk {y:1} step", { x: 0.3, y: 4.1, w: 2.9, h: 0.3, size: 13, color: col.chalk, align: "center" });

  // the breakdown: 2026 = 2·(999+1) + 0·(99+1) + 2·(9+1) + 6
  s.addShape(S.roundRect, { x: 3.35, y: 1.25, w: 6.15, h: 1.95, fill: { color: "2A4A3C" }, line: { color: "2A4A3C", width: 0 }, rectRadius: 0.1, objectName: "derivation-bg" });
  const L = { x: 3.5, w: 0.85 }, R = { x: 4.4, w: 5.0 };
  const rows = [
    ["2026", "= 2·1000 + 0·100 + 2·10 + 6"],
    ["", "= 2·({y:999} + 1) + 0·({y:99} + 1) + 2·({y:9} + 1) + 6"],
    ["", "= ({y:2·999 + 0·99 + 2·9}) + ({p:2 + 0 + 2 + 6})"],
  ];
  rows.forEach(([l, r], i) => {
    const y = 1.33 + i * 0.44;
    if (l) txt(s, col, l, { x: L.x, y, w: L.w, h: 0.42, size: 18, color: col.chalk, fontFace: "Cambria", align: "right" });
    txt(s, col, r, { x: R.x, y, w: R.w, h: 0.42, size: 18, color: col.chalk, fontFace: "Cambria" });
  });
  txt(s, col, "{y:a multiple of 9}   +   {p:the digit sum}", { x: R.x, y: 2.68, w: R.w, h: 0.35, size: 14, color: col.mutedChalk });

  formulaBox(s, pres, col, "so  2026 ≡ 2 + 0 + 2 + 6 = 10 ≡ {y:1}   (mod 9)", { x: 3.35, y: 3.32, w: 6.15, h: 0.55, size: 19 });
  bi(s, col, [
    { en: "Same digits  ⇒  same digit sum  ⇒  same remainder.", zh: "数字一样 ⇒ 数字和一样 ⇒ 余数一样" },
    { en: "Subtract  ⇒  remainder 0, so the answer's digits add up to a multiple of 9.", zh: "一减余数是 0，所以答案的数字和是 9 的倍数" },
  ], { x: 3.4, y: 4.0, w: 6.1, h: 1.1, size: 14, zhSize: 11, gap: 5 });
  s.addNotes(notes.A3);

  // ───────────────────────── A4  999 = 27 × 37 ─────────────────────────
  s = pres.addSlide({ masterName: "PAPER", sectionTitle: "Zhiheng" });
  title(s, col, "What about 37?", "三位一组", false);
  formulaBox(s, pres, col, "1000 = 999 + 1   ⇒   {g:1000 ≡ 1 (mod 999)},     999 = {g:27 × 37}", { x: 0.5, y: 1.25, w: 9.0, h: 0.6, size: 20, dark: false });
  bi(s, col, [{ en: "So cut a number into three-digit chunks from the right and add them. That tests 27 and 37.", zh: "从个位起三位一组相加，就能判断 27 和 37" }], { x: 0.5, y: 2.0, w: 9.0, h: 0.5, size: 15, zhSize: 12, dark: false });

  s.addShape(S.roundRect, { x: 0.5, y: 2.6, w: 9.0, h: 1.6, fill: { color: "EEF4F0" }, line: { color: "EEF4F0", width: 0 }, rectRadius: 0.1, objectName: "example-bg" });
  txt(s, col, "45658", { x: 0.75, y: 2.75, w: 2.3, h: 0.8, size: 40, bold: true, color: col.board, fontFace: "Cambria" });
  const b37 = blocks(s, pres, col, [{ text: "45", fill: col.yellow, op: "+" }, { text: "658", fill: col.green }], { x: 3.3, y: 2.8, size: 26, h: 0.7, gap: 0.45, opColor: col.board });
  txt(s, col, "=  703  =  19 × 37 ✓", { x: b37.x2 + 0.25, y: 2.8, w: 9.3 - b37.x2 - 0.25, h: 0.7, size: 24, color: col.board, fontFace: "Cambria" });
  bi(s, col, [
    { en: "37 divides 45658, no long division. (It is 37 × 1234. We checked.)", zh: "不用长除法就知道 37 整除 45658（它等于 37 × 1234）" },
  ], { x: 0.75, y: 3.65, w: 8.5, h: 0.45, size: 14, zhSize: 11, dark: false });

  pill(s, pres, col, "Always chunk from the right:  45 | 658, not 456 | 58", { x: 0.5, y: 4.45, w: 9.0, h: 0.5, size: 15, fill: col.pink, color: col.paper });
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
  txt(s, col, "over to Yueran  ·  如果 10 的某个次方等于 −1 呢？", { x: 0.6, y: 4.45, w: 8.8, h: 0.4, size: 14, color: col.mutedChalk, align: "center" });
  s.addNotes(notes.A5);

  // ───────────────────────── B1  magic: 1001 ─────────────────────────
  pres.addSection({ title: "Yueran" });
  s = pres.addSlide({ masterName: "BOARD", sectionTitle: "Yueran" });
  title(s, col, "Magic trick 2: 1001 brings it back", "魔术二：1001 回到原数", true);

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
  txt(s, col, "box 2 of your worksheet", { x: 0.7, y: 4.15, w: 3.0, h: 0.3, size: 11, color: col.mutedChalk });
  txt(s, col, "______  →  ____________  →  ÷ 7  →  ÷ 11  →  ÷ 13  →  ______", { x: 0.7, y: 4.4, w: 8.6, h: 0.5, size: 18, color: col.yellow, fontFace: "Cambria", align: "center" });
  s.addNotes(notes.B1);

  // ───────────────────────── B2  reveal ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD", sectionTitle: "Yueran" });
  title(s, col, "Why trick 2 works", "揭秘：1000 就是 −1", true);
  formulaBox(s, pres, col, "abcabc = abc·1000 + abc = abc · 1001 = abc · {p:7 · 11 · 13}", { x: 0.5, y: 1.25, w: 9.0, h: 0.6, size: 20 });

  bi(s, col, [
    { en: "And 1000 = 1001 − 1, so {p:1000 ≡ −1 (mod 1001)}.", zh: "1000 = 1001 − 1，所以模 1001 时 1000 就是 −1" },
    { en: "Cut into three-digit chunks from the right and alternate + − + −. You get the remainder mod 7, 11 and 13 at once.", zh: "从个位起三位一组，正负交替相加，一次得到模 7、11、13 的余数" },
  ], { x: 0.5, y: 2.05, w: 9.0, h: 1.0, size: 16, zhSize: 12, gap: 4 });
  txt(s, col, "2026", { x: 0.6, y: 3.15, w: 1.6, h: 0.8, size: 34, bold: true, color: col.chalk, fontFace: "Cambria" });
  const bB2 = blocks(s, pres, col, [{ text: "026", fill: col.yellow, op: "−" }, { text: "2", fill: col.pink }], { x: 2.35, y: 3.2, size: 28, h: 0.72, gap: 0.45 });
  txt(s, col, "=  {y:24}", { x: bB2.x2 + 0.2, y: 3.2, w: 1.4, h: 0.72, size: 28, color: col.chalk, fontFace: "Cambria" });
  bi(s, col, [
    { en: "24 ≡ {y:3} (mod 7)", zh: "" },
    { en: "24 ≡ {y:11} (mod 13)", zh: "" },
    { en: "Both are the true remainders of 2026.", zh: "和 2026 的真实余数一样" },
  ], { x: 6.2, y: 3.1, w: 3.4, h: 1.2, size: 15, zhSize: 11, gap: 2 });
  txt(s, col, "572572 → 572 − 572 = 0, so 7, 11 and 13 all divide it. That's the trick again.", { x: 0.5, y: 4.55, w: 9.0, h: 0.4, size: 13, color: col.mutedChalk });
  s.addNotes(notes.B2);

  // ───────────────────────── B3  one idea + Fermat + order = period ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD", sectionTitle: "Yueran" });
  title(s, col, "Does every prime have a rule?", "每个素数都有规则吗", true);
  formulaBox(s, pres, col, "find k with  10^{k} ≡ {y:+1}  or  {p:−1}   (mod d)", { x: 0.5, y: 1.2, w: 5.4, h: 0.52, size: 17 });
  bi(s, col, [
    { en: "{y:+1}: add k-digit chunks.  9 (k = 1), 37 (k = 3)", zh: "+1：k 位一组相加" },
    { en: "{p:−1}: alternate them.  7 and 13 (k = 3)", zh: "−1：交替加减" },
  ], { x: 0.55, y: 1.8, w: 5.35, h: 0.8, size: 14, zhSize: 11, gap: 3 });
  formulaBox(s, pres, col, "Fermat:  10^{p−1} ≡ 1 (mod p)   for every prime p ≠ 2, 5", { x: 0.5, y: 2.68, w: 5.4, h: 0.52, size: 16 });
  bi(s, col, [
    { en: "So a rule always exists.", zh: "所以规则一定存在" },
    { en: "Shortest additive chunk = ord_{p}(10) = the period of 1/p.", zh: "最短相加组长 = 10 模 p 的阶 = 1/p 的循环节长度" },
  ], { x: 0.55, y: 3.28, w: 5.35, h: 0.8, size: 14, zhSize: 11, gap: 3 });
  formulaBox(s, pres, col, "1/7 = 0.{y:142857} 142857 …     ord_{7}(10) = {y:6}", { x: 0.5, y: 4.2, w: 5.4, h: 0.52, size: 16 });

  cycle(s, pres, col, 7.75, 2.75, 1.15, [
    { label: "1", hot: true, note: "digit 1" }, { label: "3", note: "digit 4" }, { label: "2", note: "digit 2" },
    { label: "6", note: "digit 8" }, { label: "4", note: "digit 5" }, { label: "5", note: "digit 7" },
  ], { arrow: col.yellow });
  txt(s, col, "remainders of 1 ÷ 7 = powers of 10 mod 7", { x: 5.95, y: 4.5, w: 3.6, h: 0.28, size: 11, color: col.chalk, align: "center" });
  txt(s, col, "142857 × 2 = 285714,  × 3 = 428571", { x: 5.95, y: 4.78, w: 3.6, h: 0.28, size: 11, color: col.mutedChalk, align: "center" });
  s.addNotes(notes.B3);

  // ───────────────────────── B4  closing ─────────────────────────
  s = pres.addSlide({ masterName: "BOARD_HERO", sectionTitle: "Yueran" });
  txt(s, col, "If you know what {y:10} is mod d,", { x: 0.6, y: 0.7, w: 8.8, h: 0.6, size: 30, bold: true, color: col.chalk, fontFace: "Cambria" });
  txt(s, col, "you can build the rule for d yourself.", { x: 0.6, y: 1.3, w: 8.8, h: 0.6, size: 30, bold: true, color: col.chalk, fontFace: "Cambria" });
  txt(s, col, "只要知道 10 模 d 等于几，你就能自己造出 d 的整除规则。", { x: 0.6, y: 1.95, w: 8.8, h: 0.45, size: 18, color: col.mutedChalk });
  bi(s, col, [
    { en: "Fermat says the rule exists.  The order of 10 says how short it can be.", zh: "费马小定理保证规则存在；10 的阶决定它最短有多短" },
  ], { x: 0.6, y: 2.55, w: 8.8, h: 0.6, size: 16, zhSize: 12 });

  s.addShape(S.roundRect, { x: 0.6, y: 3.3, w: 8.8, h: 0.95, fill: { color: "2A4A3C" }, line: { color: "2A4A3C", width: 0 }, rectRadius: 0.1, objectName: "more-bg" });
  bi(s, col, [
    { en: "The proofs are on the back of your worksheet.", zh: "证明在 worksheet 背面" },
    { en: "There is more (a quick rule for 7, why ISBN numbers use 11). Ask us after class!", zh: "更多内容下课可以问我们" },
  ], { x: 0.8, y: 3.42, w: 8.4, h: 0.75, size: 15, zhSize: 11, gap: 5 });
  txt(s, col, "Thank you. Now go try the 1001 trick on a friend.  ·  谢谢", { x: 0.6, y: 4.65, w: 8.8, h: 0.45, size: 16, color: col.yellow, align: "center" });
  s.addNotes(notes.B4);

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  await finalize(OUT);
  console.log("wrote", OUT);
}
main().catch((e) => { console.error(e); process.exit(1); });
