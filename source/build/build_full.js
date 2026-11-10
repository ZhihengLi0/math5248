// Full deck (the "product"): readable on its own, with proofs, all examples and the theorem map.
const path = require("path");
const { THEME, finalize, newPres, title: titleEn, bi, txt, blocks, clock9, cycle, signChain, pill, formulaBox, table } = require("./theme");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");

const OUT = path.join(__dirname, "..", "..", "presentation", "PPT完整版.pptx");

async function main() {
  const { pres, col } = newPres();
  const S = pres.ShapeType;
  let n = 0;
  const title = (s, en, zh, dark = true) => titleEn(s, col, en, zh, dark);
  const board = (sec) => pres.addSlide({ masterName: "BOARD", sectionTitle: sec });
  const paper = (sec) => pres.addSlide({ masterName: "PAPER", sectionTitle: sec });
  const tag = (s, text, x, y, dark = true) => pill(s, pres, col, text, { x, y, w: 1.0, h: 0.28, size: 10, fill: dark ? "3E6652" : "DCE8E0", color: dark ? col.chalk : col.board, r: 0.14 });

  // ───────── 1 cover ─────────
  pres.addSection({ title: "Intro" });
  let s = pres.addSlide({ masterName: "BOARD_HERO", sectionTitle: "Intro" });
  txt(s, col, "2026", { x: 0.5, y: 0.9, w: 4.2, h: 1.7, size: 110, bold: true, color: col.chalk, fontFace: "Cambria" });
  txt(s, col, "2 + 0 + 2 + 6 = {y:10} → {y:1}", { x: 0.55, y: 2.6, w: 4.2, h: 0.5, size: 22, color: col.chalk, fontFace: "Cambria" });
  txt(s, col, "6 − 2 + 0 − 2 = {p:2}      026 − 2 = {p:24}", { x: 0.55, y: 3.05, w: 4.4, h: 0.45, size: 18, color: col.chalk, fontFace: "Cambria" });
  txt(s, col, "mod 9 → 1  ·  mod 11 → 2  ·  mod 7 → 3  ·  mod 13 → 11", { x: 0.55, y: 3.5, w: 4.4, h: 0.3, size: 12, color: col.mutedChalk });
  txt(s, col, "Numbers That Talk", { x: 5.0, y: 0.95, w: 4.6, h: 0.7, size: 36, bold: true, color: col.yellow, fontFace: "Cambria" });
  txt(s, col, "数字会说话", { x: 5.0, y: 1.6, w: 4.6, h: 0.5, size: 22, color: col.yellow, fontFace: "Cambria" });
  bi(s, col, [
    { en: "Divisibility shortcuts, and the modular arithmetic hiding behind them", zh: "整除速判规则，以及藏在背后的模运算" },
    { en: "Full version: proofs, every example, and the theorem map", zh: "完整版：含证明、全部例子和定理总表" },
  ], { x: 5.0, y: 2.2, w: 4.5, h: 1.3, size: 14, zhSize: 11, gap: 5 });
  bi(s, col, [{ en: "Zhiheng Li  ·  Yueran" }, { en: "MATH 5248 · Fall 2026 · final mini project" }], { x: 5.0, y: 3.45, w: 4.5, h: 0.7, size: 15 });

  // ───────── 2 questions + roadmap ─────────
  s = board("Intro");
  title(s, "What we wanted to know", "我们想回答的问题");
  const qs = [
    { en: "Why does adding the digits tell you about 3 and 9?", zh: "为什么数字和能判断 3 和 9？" },
    { en: "Why does the alternating sum tell you about 11?", zh: "为什么交错和能判断 11？" },
    { en: "Do 7, 13, 37 have rules too? Does every number?", zh: "7、13、37 也有规则吗？每个数都有吗？" },
    { en: "How short can a rule be, and why does 1/7 repeat every 6 digits?", zh: "规则最短能多短？为什么 1/7 的循环节是 6 位？" },
  ];
  qs.forEach((q, i) => {
    const y = 1.25 + i * 0.78;
    s.addShape(S.ellipse, { x: 0.5, y: y + 0.05, w: 0.4, h: 0.4, fill: { color: col.yellow }, line: { color: col.yellow, width: 0 }, objectName: "q-dot" });
    s.addText("?", { x: 0.5, y: y + 0.05, w: 0.4, h: 0.4, fontSize: 16, bold: true, color: col.board, align: "center", valign: "middle", isTextBox: true, margin: 0, objectName: "q-mark" });
    bi(s, col, [q], { x: 1.05, y, w: 4.6, h: 0.75, size: 14, zhSize: 11 });
  });
  s.addShape(S.roundRect, { x: 5.95, y: 1.25, w: 3.55, h: 3.75, fill: { color: "2A4A3C" }, line: { color: "2A4A3C", width: 0 }, rectRadius: 0.1, objectName: "roadmap-bg" });
  txt(s, col, "roadmap  路线", { x: 6.15, y: 1.32, w: 3.2, h: 0.3, size: 11, color: col.mutedChalk });
  bi(s, col, [
    { en: "{y:1}  Foundation: 10 ≡ ? (mod d)", zh: "共同基础" },
    { en: "{y:2}  Family 10^{k} ≡ 1: digit sum, 99, 999 (Zhiheng)", zh: "10 ≡ 1 家族" },
    { en: "{y:3}  Family 10^{k} ≡ −1: 11, 101, 1001 (Yueran)", zh: "10 ≡ −1 家族" },
    { en: "{y:4}  Why rules always exist: Fermat, order, 1/p", zh: "一般结论：费马、阶、循环小数" },
    { en: "{y:5}  Extras: chop-a-digit, 2 and 5, ISBN", zh: "补充：砍个位法、2 和 5、ISBN" },
  ], { x: 6.15, y: 1.65, w: 3.2, h: 3.3, size: 12, zhSize: 10, gap: 5 });

  // ───────── 3 foundation ─────────
  s = paper("Intro");
  title(s, "The one idea: what is 10 mod d?", "共同基础：10 模 d 等于几？", false);
  formulaBox(s, pres, col, "n = d_{0} + d_{1}·10 + d_{2}·10^{2} + ⋯ + d_{k}·10^{k}        e.g.  2026 = 6 + 2·10 + 0·10^{2} + 2·10^{3}", { x: 0.5, y: 1.2, w: 9.0, h: 0.55, size: 16, dark: false });
  bi(s, col, [
    { en: "Congruence respects + and × (Day 3): if a ≡ b (mod m) then a^{k} ≡ b^{k}. So we can replace every 10 by whatever 10 is mod d.", zh: "同余对加法、乘法保持（课内 T2），所以 a ≡ b ⇒ aᵏ ≡ bᵏ。于是可以把展开式里的每个 10 换成它模 d 的值。" },
  ], { x: 0.5, y: 1.85, w: 9.0, h: 0.8, size: 13, zhSize: 11, dark: false });
  table(s, col, [
    ["10 mod d", "after substituting / 代入后", "rule / 规则", "d"],
    ["10 ≡ 1", "10ⁱ ≡ 1", "add the digits · 各位相加", "3, 9"],
    ["10 ≡ −1", "10ⁱ ≡ (−1)ⁱ", "alternate the digits · 正负交替", "11"],
    ["10 ≡ 0", "10ⁱ ≡ 0 (i ≥ 1)", "last digit only · 只看个位", "2, 5"],
    ["10ᵏ ≡ 1", "treat 10ᵏ as one 'digit'", "add k-digit chunks · 逐组相加", "99, 999, 37"],
    ["10ᵏ ≡ −1", "same", "alternate k-digit chunks · 逐组交错", "101, 1001, 7, 13"],
  ], { x: 0.5, y: 2.75, w: 9.0, h: 2.3, colW: [1.5, 2.4, 3.3, 1.8], dark: false, size: 12 });

  // ───────── 4 digit sum theorem ─────────
  pres.addSection({ title: "10 ≡ 1" });
  s = board("10 ≡ 1");
  title(s, "Digit sum: n ≡ S(n) (mod 9)", "数字和定理");
  tag(s, "new · 课外", 8.5, 0.38);
  formulaBox(s, pres, col, "n ≡ d_{0} + d_{1} + ⋯ + d_{k} = S(n)   (mod 9),   hence also (mod 3)", { x: 0.5, y: 1.2, w: 5.6, h: 0.55, size: 16 });
  bi(s, col, [
    { en: "{y:Proof.} 10 = 9 + 1, so 10 ≡ 1 (mod 9). Then 10^{i} ≡ 1^{i} = 1, so d_{i}·10^{i} ≡ d_{i}. Add up: n ≡ S(n). Since 3 | 9, the same holds mod 3. ∎", zh: "证明：10 = 9 + 1，所以 10 ≡ 1 (mod 9)。于是 10ⁱ ≡ 1，dᵢ·10ⁱ ≡ dᵢ，相加得 n ≡ S(n)。因为 3 | 9，模 3 也成立。" },
    { en: "It gives the {y:remainder}, not just yes/no, and you can repeat it: 2026 → 10 → 1.", zh: "得到的是余数，不只是能否整除；而且可以反复用：2026 → 10 → 1" },
  ], { x: 0.5, y: 1.9, w: 5.6, h: 2.4, size: 13, zhSize: 11, gap: 6 });
  clock9(s, pres, col, 8.0, 2.75, 1.2, { highlight: [1, 9], hand: 1 });
  txt(s, col, "10 steps on a 9-clock = 1 step", { x: 6.5, y: 4.05, w: 3.0, h: 0.28, size: 11, color: col.chalk, align: "center" });
  txt(s, col, "9 刻度的钟上，走 10 格 = 走 1 格", { x: 6.5, y: 4.3, w: 3.0, h: 0.26, size: 10, color: col.mutedChalk, align: "center" });
  s.addShape(S.roundRect, { x: 0.5, y: 4.4, w: 5.6, h: 0.65, fill: { color: "2A4A3C" }, line: { color: "2A4A3C", width: 0 }, rectRadius: 0.1, objectName: "ex-bg" });
  bi(s, col, [
    { en: "7452 → 7+4+5+2 = 18, so 9 | 7452 (= 9 × 828).    2026 → 10 → 1, so 2026 ≡ 1 (mod 9) and (mod 3).", zh: "7452 的数字和 18，所以 9 | 7452；2026 除以 9 余 1，除以 3 也余 1" },
  ], { x: 0.65, y: 4.45, w: 5.3, h: 0.6, size: 11, zhSize: 10 });

  // ───────── 5 magic A ─────────
  s = board("10 ≡ 1");
  title(s, "Magic trick 1: the vanishing digit", "魔术一：消失的数字");
  const stepsA = [
    { en: "Think of a 4-digit number (not all digits the same).", zh: "想一个四位数（各位不全相同）" },
    { en: "Shuffle its digits into a new number.", zh: "把数字打乱拼成另一个数" },
    { en: "Subtract: bigger minus smaller.", zh: "大的减小的" },
    { en: "Circle one {y:non-zero} digit of the result; hide it.", zh: "圈一个非零数字藏起来" },
    { en: "Read out the rest in any order. We name the hidden digit.", zh: "其余的念出来，我们说出藏的那个" },
  ];
  stepsA.forEach((st, i) => {
    const y = 1.2 + i * 0.6;
    s.addShape(S.ellipse, { x: 0.5, y: y + 0.05, w: 0.36, h: 0.36, fill: { color: col.yellow }, line: { color: col.yellow, width: 0 }, objectName: "step-dot" });
    s.addText(String(i + 1), { x: 0.5, y: y + 0.05, w: 0.36, h: 0.36, fontSize: 13, bold: true, color: col.board, align: "center", valign: "middle", isTextBox: true, margin: 0, objectName: "step-num" });
    bi(s, col, [st], { x: 1.0, y, w: 4.3, h: 0.6, size: 12, zhSize: 10 });
  });
  txt(s, col, "5274 → 7425 → 7425 − 5274 = 2151 → hide 5 → hear 2, 1, 1 → sum 4 → {y:5}", { x: 0.5, y: 4.25, w: 4.8, h: 0.3, size: 11, color: col.chalk });
  txt(s, col, "8317 → 1378 → 6939 → hide a 9 → hear 6, 3, 9 → sum 18 → {y:9}", { x: 0.5, y: 4.55, w: 4.8, h: 0.3, size: 11, color: col.chalk });
  s.addShape(S.roundRect, { x: 5.6, y: 1.2, w: 3.9, h: 3.85, fill: { color: "2A4A3C" }, line: { color: "2A4A3C", width: 0 }, rectRadius: 0.1, objectName: "why-bg" });
  txt(s, col, "why it works  原理", { x: 5.8, y: 1.27, w: 3.5, h: 0.3, size: 11, color: col.mutedChalk });
  bi(s, col, [
    { en: "Same digits ⇒ S(n) = S(n′) ⇒ n ≡ n′ (mod 9).", zh: "数字相同 ⇒ 数字和相同 ⇒ n ≡ n′ (mod 9)" },
    { en: "So the difference D = n − n′ ≡ 0, and by the theorem S(D) ≡ D ≡ 0 (mod 9).", zh: "所以差 D ≡ 0，再由定理，D 的数字和 ≡ 0 (mod 9)" },
    { en: "Hidden digit x, heard sum s: s + x ≡ 0 (mod 9). Exactly one x in 1…9 works.", zh: "藏的数字 x、念出的和 s 满足 s + x ≡ 0，1…9 里只有一个解" },
    { en: "If s is already a multiple of 9, the answer is 9. Hiding 0 is banned because 0 and 9 would look the same.", zh: "s 本身是 9 的倍数时答案是 9；不能圈 0，因为 0 和 9 分不出来" },
    { en: "If the difference is 0, they shuffled into the same number. Ask again.", zh: "差为 0 说明打乱后和原数一样，请重打乱" },
  ], { x: 5.8, y: 1.6, w: 3.5, h: 3.4, size: 11, zhSize: 10, gap: 4 });

  // ───────── 6 chunks 99 / 999 ─────────
  s = paper("10 ≡ 1");
  title(s, "Bigger chunks: 10ᵏ ≡ 1", "两位一组、三位一组", false);
  tag(s, "new · 课外", 8.5, 0.38, false);
  formulaBox(s, pres, col, "If 10^{k} ≡ 1 (mod d) and n = B_{0} + B_{1}·10^{k} + B_{2}·10^{2k} + ⋯ (blocks from the right), then  n ≡ B_{0} + B_{1} + B_{2} + ⋯ (mod d)", { x: 0.5, y: 1.2, w: 9.0, h: 0.6, size: 14, dark: false });
  bi(s, col, [{ en: "{g:Proof.} Writing n in base 10^{k} and using (10^{k})^{j} ≡ 1: the digit-sum proof with 10 replaced by 10^{k}. ∎", zh: "证明：把 n 写成 10ᵏ 进制，用 (10ᵏ)ʲ ≡ 1，和数字和的证明一模一样。" }], { x: 0.5, y: 1.88, w: 9.0, h: 0.6, size: 12, zhSize: 10, dark: false });
  const b1 = blocks(s, pres, col, [{ text: "12", fill: col.yellow }, { text: "34", fill: col.green }, { text: "53", fill: col.yellow }], { x: 0.5, y: 2.6, size: 16, h: 0.42, gap: 0.08 });
  bi(s, col, [{ en: "k = 2: 100 ≡ 1 (mod 99). 12 + 34 + 53 = 99, so 99 | 123453 (= 99 × 1247); also 3, 9, 11, 33.", zh: "两位一组相加判断 99 及其因数 3、9、11、33" }], { x: b1.x2 + 0.15, y: 2.55, w: 9.5 - b1.x2 - 0.15, h: 0.6, size: 12, zhSize: 10, dark: false });
  const b2 = blocks(s, pres, col, [{ text: "45", fill: col.yellow }, { text: "658", fill: col.green }], { x: 0.5, y: 3.25, size: 16, h: 0.42, gap: 0.08 });
  bi(s, col, [{ en: "k = 3: 1000 ≡ 1 (mod 999), 999 = 27 × 37. 45 + 658 = 703 = 19 × 37, so 37 | 45658 (= 37 × 1234).", zh: "三位一组相加判断 27、37（以及 3、9、111、333）" }], { x: b2.x2 + 0.15, y: 3.2, w: 9.5 - b2.x2 - 0.15, h: 0.6, size: 12, zhSize: 10, dark: false });
  const b3 = blocks(s, pres, col, [{ text: "116", fill: col.yellow }, { text: "667", fill: col.green }], { x: 0.5, y: 3.9, size: 16, h: 0.42, gap: 0.08 });
  bi(s, col, [{ en: "116 + 667 = 783 = 27 × 29, so 27 | 116667 (= 27 × 4321).   2026 → 2 + 026 = 28 ⇒ 2026 ≡ 28 (mod 37).", zh: "2026 除以 37 余 28" }], { x: b3.x2 + 0.15, y: 3.85, w: 9.5 - b3.x2 - 0.15, h: 0.6, size: 12, zhSize: 10, dark: false });
  pill(s, pres, col, "Chunk from the right (45 | 658, not 456 | 58).  3-block sums say nothing about 7 or 13 (they don't divide 999).  ·  从个位分组；三位相加判断不了 7、13", { x: 0.5, y: 4.55, w: 9.0, h: 0.5, size: 11, fill: col.pink, color: col.paper });

  // ───────── 7 alternating sum (11) ─────────
  pres.addSection({ title: "10 ≡ −1" });
  s = board("10 ≡ −1");
  title(s, "Alternating sum (mod 11)", "交错和定理");
  tag(s, "new · 课外", 8.5, 0.38);
  bi(s, col, [
    { en: "{p:Proof.} 10 = 11 − 1, so 10 ≡ −1 (mod 11) and 10^{i} ≡ (−1)^{i}. Substitute into the expansion. ∎", zh: "证明：10 ≡ −1 (mod 11)，所以 10ⁱ ≡ (−1)ⁱ，代入展开式即可。" },
    { en: "918082 → 2 − 8 + 0 − 8 + 1 − 9 = −22 = −2 × 11, so 11 | 918082 (= 11 × 83462).", zh: "918082 的交错和是 −22，所以 11 整除它" },
  ], { x: 0.5, y: 1.2, w: 5.2, h: 1.6, size: 13, zhSize: 11, gap: 6 });
  signChain(s, pres, col, ["2", "0", "2", "6"], { x: 0.8, y: 3.2, size: 28, cell: 0.6, gap: 0.3, powers: ["10^{3}≡−1", "10^{2}≡+1", "10≡−1", "1"] });
  txt(s, col, "6 − 2 + 0 − 2 = {y:2}  ⇒  2026 ≡ 2 (mod 11)", { x: 0.5, y: 4.35, w: 5.2, h: 0.4, size: 16, color: col.chalk, fontFace: "Cambria" });
  s.addShape(S.roundRect, { x: 6.0, y: 1.2, w: 3.5, h: 3.85, fill: { color: "2A4A3C" }, line: { color: "2A4A3C", width: 0 }, rectRadius: 0.1, objectName: "pit-bg" });
  txt(s, col, "easy to get wrong  易错", { x: 6.2, y: 1.27, w: 3.1, h: 0.3, size: 11, color: col.pink });
  bi(s, col, [
    { en: "For yes/no divisibility you may start from either end.", zh: "只判断能否整除，从哪边开始都行" },
    { en: "For the {p:remainder}, the + must start at the units digit. 2026 from the left: 2 − 0 + 2 − 6 = −2 ≡ 9, wrong sign.", zh: "要算余数，必须从个位取 +。2026 从左边算得 −2 ≡ 9，符号反了" },
    { en: "A negative result is fine: add a multiple of 11.", zh: "结果是负数没关系，加上 11 的倍数即可" },
  ], { x: 6.2, y: 1.6, w: 3.1, h: 3.4, size: 12, zhSize: 10, gap: 5 });

  // ───────── 8 101 and 1001 ─────────
  s = paper("10 ≡ −1");
  title(s, "10ᵏ ≡ −1: alternate the blocks", "两位交错、三位交错", false);
  formulaBox(s, pres, col, "If 10^{k} ≡ −1 (mod d):   n ≡ B_{0} − B_{1} + B_{2} − ⋯ (mod d)      (same proof, with (10^{k})^{j} ≡ (−1)^{j})", { x: 0.5, y: 1.2, w: 9.0, h: 0.55, size: 14, dark: false });
  const c1 = blocks(s, pres, col, [{ text: "46", fill: col.yellow }, { text: "12", fill: col.pink }, { text: "67", fill: col.yellow }], { x: 0.5, y: 1.95, size: 16, h: 0.42, gap: 0.08 });
  bi(s, col, [{ en: "k = 2: 100 ≡ −1 (mod 101). 67 − 12 + 46 = 101, so 101 | 461267 (= 101 × 4567).", zh: "两位一组交错，判断 101" }], { x: c1.x2 + 0.15, y: 1.9, w: 9.5 - c1.x2 - 0.15, h: 0.6, size: 12, zhSize: 10, dark: false });
  const c2 = blocks(s, pres, col, [{ text: "1", fill: col.yellow }, { text: "002", fill: col.pink }, { text: "001", fill: col.yellow }], { x: 0.5, y: 2.6, size: 16, h: 0.42, gap: 0.08 });
  bi(s, col, [{ en: "k = 3: 1000 ≡ −1 (mod 1001), 1001 = 7 × 11 × 13. 001 − 002 + 1 = 0, so 7, 11, 13 all divide 1002001 (= 1001²).", zh: "三位一组交错，一次判断 7、11、13，余数也对" }], { x: c2.x2 + 0.15, y: 2.55, w: 9.5 - c2.x2 - 0.15, h: 0.6, size: 12, zhSize: 10, dark: false });
  const c3 = blocks(s, pres, col, [{ text: "1", fill: col.yellow }, { text: "283", fill: col.pink }, { text: "945", fill: col.yellow }], { x: 0.5, y: 3.25, size: 16, h: 0.42, gap: 0.08 });
  bi(s, col, [{ en: "945 − 283 + 1 = 663 = 13 × 51, so 13 | 1283945. And 663 ≡ 5 (mod 7), so 7 ∤ 1283945. Indeed 1283945 ≡ 5 (mod 7).", zh: "13 整除 1283945；663 除以 7 余 5，1283945 除以 7 也余 5" }], { x: c3.x2 + 0.15, y: 3.2, w: 9.5 - c3.x2 - 0.15, h: 0.6, size: 12, zhSize: 10, dark: false });
  const c4 = blocks(s, pres, col, [{ text: "2", fill: col.pink }, { text: "026", fill: col.yellow }], { x: 0.5, y: 3.9, size: 16, h: 0.42, gap: 0.08 });
  bi(s, col, [{ en: "2026 → 026 − 2 = 24 ⇒ 2026 ≡ 3 (mod 7), ≡ 11 (mod 13), ≡ 2 (mod 11).", zh: "2026 除以 7 余 3、除以 13 余 11、除以 11 余 2" }], { x: c4.x2 + 0.15, y: 3.85, w: 9.5 - c4.x2 - 0.15, h: 0.6, size: 12, zhSize: 10, dark: false });
  pill(s, pres, col, "Pink block = minus sign. Blocks count from the right; the rightmost block is always +.  ·  粉色块取负号，最右边一块总是正号", { x: 0.5, y: 4.55, w: 9.0, h: 0.5, size: 11, fill: "DCE8E0", color: col.board, bold: false });

  // ───────── 9 magic B ─────────
  s = board("10 ≡ −1");
  title(s, "Magic trick 2: 1001 brings it back", "魔术二：1001 回到原数");
  const flow = [["572", col.yellow, "any 3-digit number", "任意三位数"], ["572572", col.chalk, "write it twice", "写两遍"], ["81796", col.chalk, "÷ 7 (person 1)", "第一位 ÷ 7"], ["7436", col.chalk, "÷ 11 (person 2)", "第二位 ÷ 11"], ["572", col.yellow, "÷ 13 (person 3)", "第三位 ÷ 13"]];
  const fx = [0.5, 2.15, 4.05, 5.95, 7.85], fw = [1.3, 1.6, 1.6, 1.6, 1.3];
  flow.forEach((f, i) => {
    s.addShape(S.roundRect, { x: fx[i], y: 1.35, w: fw[i], h: 0.7, fill: { color: f[1] }, line: { color: f[1], width: 0 }, rectRadius: 0.1, objectName: "flow-box" });
    s.addText(f[0], { x: fx[i], y: 1.35, w: fw[i], h: 0.7, fontSize: 24, bold: true, color: col.board, align: "center", valign: "middle", isTextBox: true, margin: 0, fontFace: "Cambria", objectName: "flow-text" });
    bi(s, col, [{ en: f[2], zh: f[3] }], { x: fx[i] - 0.15, y: 2.12, w: fw[i] + 0.3, h: 0.6, size: 11, zhSize: 10, align: "center" });
    if (i < 4) s.addShape(S.line, { x: fx[i] + fw[i] + 0.08, y: 1.7, w: fx[i + 1] - fx[i] - fw[i] - 0.16, h: 0.001, line: { color: col.chalk, width: 2, endArrowType: "triangle" }, objectName: "flow-arrow" });
  });
  formulaBox(s, pres, col, "abcabc = abc·1000 + abc = abc · 1001 = abc · {p:7 · 11 · 13}", { x: 0.5, y: 2.9, w: 9.0, h: 0.6, size: 20 });
  bi(s, col, [
    { en: "Dividing by 7, then 11, then 13 is dividing by 1001, so you get abc back. The trick cannot fail.", zh: "依次除以 7、11、13 就是除以 1001，所以回到 abc。这个魔术不会失败" },
    { en: "Link to the rule: 572572 → 572 − 572 = 0, so the 3-block alternating sum says 7, 11, 13 all divide it.", zh: "和三位交错的联系：572 − 572 = 0" },
    { en: "Works with a zero too: 205 → 205205 → 29315 → 2665 → 205.", zh: "含 0 也行：205 → 205205 → 29315 → 2665 → 205" },
  ], { x: 0.5, y: 3.6, w: 9.0, h: 1.5, size: 12, zhSize: 10, gap: 5 });

  // ───────── 10 unified ─────────
  pres.addSection({ title: "General" });
  s = paper("General");
  title(s, "One idea, every rule", "一个想法，所有规则", false);
  formulaBox(s, pres, col, "find k with  10^{k} ≡ {g:+1}  or  {p:−1}   (mod d)   ⇒   add, or alternate, the k-digit blocks", { x: 0.5, y: 1.2, w: 9.0, h: 0.6, size: 18, dark: false, bold: true });
  bi(s, col, [
    { en: "The block sum is congruent to n, so it gives the {b:remainder}, and you may repeat it until the number is small.", zh: "分组和与 n 同余，所以给出的是余数，可以反复做直到数很小" },
    { en: "The same idea in base b: digit sum tests b − 1, alternating sum tests b + 1. Octal 144₈ = 100: digit sum 9 ≡ 2 (mod 7) ✓, alternating 4 − 4 + 1 = 1 ≡ 100 (mod 9) ✓.", zh: "换进制同理：b 进制里数字和判断 b − 1，交错和判断 b + 1（八进制 144₈ = 100 的例子）" },
  ], { x: 0.5, y: 1.9, w: 4.1, h: 2.6, size: 12, zhSize: 10, dark: false, gap: 6 });
  table(s, col, [
    ["d", "k", "10ᵏ ≡", "rule / 规则"],
    ["3, 9", "1", "+1", "digit sum · 数字和"],
    ["11", "1", "−1", "alternate digits · 一位交错"],
    ["101", "2", "−1", "alternate 2-blocks · 两位交错"],
    ["27, 37, 111, 333", "3", "+1", "add 3-blocks · 三位相加"],
    ["7, 13, 77, 91", "3", "−1", "alternate 3-blocks · 三位交错"],
    ["41, 271", "5", "+1", "add 5-blocks · 五位相加"],
  ], { x: 4.8, y: 1.9, w: 4.7, h: 2.6, colW: [1.4, 0.4, 0.65, 2.25], dark: false, size: 11, headSize: 11 });
  txt(s, col, "99999 = 9 × 41 × 271,  999 = 27 × 37,  1001 = 7 × 11 × 13", { x: 0.5, y: 4.65, w: 9.0, h: 0.35, size: 11, color: col.mutedInk });

  // ───────── 11 existence: Fermat + order ─────────
  s = board("General");
  title(s, "Every prime p ≠ 2, 5 has a block rule", "存在性：费马小定理与阶");
  tag(s, "new · 课外", 8.5, 0.38);
  bi(s, col, [
    { en: "{y:(1)} Fermat (Day 11–12): p ∤ 10 ⇒ 10^{p−1} ≡ 1 (mod p). So (p − 1)-digit blocks, added, always work.", zh: "(1) 费马小定理：10ᵖ⁻¹ ≡ 1，所以 (p − 1) 位一组相加一定可以" },
    { en: "{y:(2)} The shortest {b:additive} block is k = ord_{p}(10) (Day 13), and k | p − 1. (A shorter {b:alternating} rule may exist: 7 has k = 6 but uses 3-blocks.)", zh: "(2) 最短的相加组长是 10 模 p 的阶 k，且 k | p − 1。（可能有更短的交错规则：7 的阶是 6，却用三位交错）" },
    { en: "{y:(3)} If k is even, 10^{k/2} ≡ −1 (mod p): put x = 10^{k/2}. Then p | x² − 1 = (x − 1)(x + 1). By Euclid's lemma p | x − 1 or p | x + 1; the first contradicts minimality of k. ∎", zh: "(3) k 为偶数时 10ᵏᐟ² ≡ −1：令 x = 10ᵏᐟ²，p | (x−1)(x+1)，由 Euclid 引理且 k 最小，必有 p | x + 1" },
    { en: "{p:Careful:} (3) needs p prime. For d = 33, ord(10) = 2 but 10 ≢ −1 (mod 33).", zh: "注意：(3) 只对素数成立。d = 33 时阶是 2，但 10 ≢ −1 (mod 33)" },
  ], { x: 0.5, y: 1.2, w: 6.0, h: 3.9, size: 12, zhSize: 10, gap: 6 });
  s.addShape(S.roundRect, { x: 6.8, y: 1.2, w: 2.7, h: 3.85, fill: { color: "2A4A3C" }, line: { color: "2A4A3C", width: 0 }, rectRadius: 0.1, objectName: "ex-bg" });
  txt(s, col, "p = 7  例", { x: 7.0, y: 1.27, w: 2.3, h: 0.3, size: 11, color: col.mutedChalk });
  bi(s, col, [
    { en: "10^{6} ≡ 1 (mod 7) by Fermat", zh: "" },
    { en: "ord_{7}(10) = 6 = p − 1", zh: "阶正好是 6" },
    { en: "6 is even ⇒ 10^{3} = 1000 ≡ −1", zh: "所以三位交错" },
    { en: "p = 13: ord = 6 | 12,  10^{3} ≡ −1", zh: "" },
    { en: "p = 37: ord = 3 | 36 (odd: no −1 rule)", zh: "阶为奇数，没有交错规则" },
    { en: "p = 41: ord = 5 | 40", zh: "" },
  ], { x: 7.0, y: 1.6, w: 2.4, h: 3.4, size: 11, zhSize: 10, gap: 5 });

  // ───────── 12 big table ─────────
  s = paper("General");
  title(s, "The table we built", "我们算出来的表", false);
  table(s, col, [
    ["d", "ordd(10)", "j with 10ʲ ≡ −1", "1/d (repeating block)", "most practical rule / 最实用的规则"],
    ["3, 9", "1", "none", "0.(3), 0.(1)", "digit sum · 数字和"],
    ["11", "2", "1", "0.(09)", "alternate digits · 一位交错"],
    ["37", "3", "none", "0.(027)", "add 3-blocks · 三位相加"],
    ["101", "4", "2", "0.(0099)", "alternate 2-blocks · 两位交错"],
    ["41", "5", "none", "0.(02439)", "add 5-blocks · 五位相加"],
    ["7", "6", "3", "0.(142857)", "alternate 3-blocks · 三位交错"],
    ["13", "6", "3", "0.(076923)", "alternate 3-blocks · 三位交错"],
    ["17", "16", "8", "0.(0588235294117647)", "too long → chop a digit · 改用砍个位法"],
    ["19", "18", "9", "18-digit block", "too long → chop a digit · 改用砍个位法"],
  ], { x: 0.5, y: 1.2, w: 9.0, h: 3.3, colW: [0.8, 0.9, 1.4, 2.4, 3.5], dark: false, size: 11, headSize: 11 });
  bi(s, col, [{ en: "In every row ord_{p}(10) divides p − 1 (7: 6 | 6; 13: 6 | 12; 37: 3 | 36; 41: 5 | 40), and the block length equals the length of the repeating decimal (next slide).", zh: "每一行都有 ordₚ(10) | p − 1，而且组长 = 循环节长度，见下一页" }], { x: 0.5, y: 4.55, w: 9.0, h: 0.55, size: 11, zhSize: 10, dark: false });

  // ───────── 13 repeating decimals ─────────
  s = board("General");
  title(s, "Block length = period of 1/d", "循环节长度 = 10 的阶");
  tag(s, "new · 课外", 8.5, 0.38);
  bi(s, col, [
    { en: "{y:Theorem.} If gcd(d, 10) = 1, d > 1, then 1/d is purely repeating with period ord_{d}(10).", zh: "定理：gcd(d, 10) = 1 时，1/d 是纯循环小数，循环节长度 = 10 模 d 的阶" },
    { en: "{y:Why.} Long division: start with remainder r_{0} = 1; each step multiplies the remainder by 10 and reduces mod d, so r_{i} ≡ 10^{i} (mod d). The digits repeat as soon as the remainder returns to 1, i.e. at i = ord_{d}(10).", zh: "长除法每一步是\"余数 × 10 再除以 d\"，所以 rᵢ ≡ 10ⁱ。余数第一次回到 1 时小数开始重复，这正好发生在 i = ord" },
    { en: "{y:Another view.} 10^{6}·(1/7) − 1/7 = 142857, so 999999 = 7 × 142857, i.e. 10^{6} ≡ 1 (mod 7).", zh: "另一种看法：10⁶/7 − 1/7 = 142857，所以 999999 = 7 × 142857" },
  ], { x: 0.5, y: 1.2, w: 5.6, h: 3.9, size: 12, zhSize: 10, gap: 6 });
  cycle(s, pres, col, 8.0, 2.8, 1.15, [
    { label: "1", hot: true, note: "digit 1" }, { label: "3", note: "digit 4" }, { label: "2", note: "digit 2" },
    { label: "6", note: "digit 8" }, { label: "4", note: "digit 5" }, { label: "5", note: "digit 7" },
  ], { arrow: col.yellow });
  txt(s, col, "remainders of 1 ÷ 7: 1, 3, 2, 6, 4, 5 → back to 1", { x: 6.3, y: 4.55, w: 3.4, h: 0.28, size: 10, color: col.chalk, align: "center" });
  txt(s, col, "digit = ⌊10·r / 7⌋ → 1, 4, 2, 8, 5, 7", { x: 6.3, y: 4.8, w: 3.4, h: 0.26, size: 10, color: col.mutedChalk, align: "center" });

  // ───────── 14 142857 + Midy ─────────
  s = board("General");
  title(s, "142857, and Midy's theorem", "彩蛋：循环数与 Midy 定理");
  const rot = ["142857", "285714", "428571", "571428", "714285", "857142"];
  cycle(s, pres, col, 2.4, 2.95, 1.3, rot.map((r, i) => ({ label: r, size: 11, hot: i === 0, note: "× " + (i + 1) })), { nodeR: 0.42, arrow: col.yellow });
  bi(s, col, [
    { en: "142857 × 1…6 are rotations of the same six digits; 142857 × 7 = 999999.", zh: "142857 乘 1 到 6 都是同一串数字的轮换，乘 7 得 999999" },
    { en: "{y:Why.} 10, 10², …, 10⁶ mod 7 are 3, 2, 6, 4, 5, 1, every non-zero remainder. So 10 is a {b:primitive root} mod 7 (Day 14), and 1/7, 2/7, …, 6/7 just start the same remainder cycle at different points.", zh: "原因：10 的各次幂模 7 跑遍所有非零余数，10 是模 7 的原根；k/7 的小数只是从循环的不同位置开始" },
    { en: "{y:Midy.} For prime p with 10^{j} ≡ −1 (period 2j), the two halves of the block add to 99…9: 142 + 857 = 999; 1/13: 076 + 923 = 999; 1/17: 05882352 + 94117647 = 99999999.", zh: "Midy 定理：循环节分两半相加全是 9。142 + 857 = 999，076 + 923 = 999" },
    { en: "Proof sketch: R = (10^{2j} − 1)/p = (10^{j} − 1)·c with c = (10^{j} + 1)/p an integer; R = (c − 1)·10^{j} + (10^{j} − c), halves A = c − 1, B = 10^{j} − c, A + B = 10^{j} − 1. (p = 7: c = 143, A = 142, B = 857.)", zh: "证明梗概：c = (10ʲ + 1)/p 是整数，前半 c − 1，后半 10ʲ − c，相加得 10ʲ − 1" },
  ], { x: 4.4, y: 1.2, w: 5.1, h: 3.9, size: 11, zhSize: 10, gap: 5 });

  // ───────── 15 composite d ─────────
  s = paper("General");
  title(s, "Composite d with gcd(d, 10) = 1", "推广到合数", false);
  bi(s, col, [
    { en: "Euler (Day 12–13): 10^{φ(d)} ≡ 1 (mod d), so φ(d)-digit blocks always work; the shortest additive block is still ord_{d}(10), which divides φ(d).", zh: "欧拉定理：10^{φ(d)} ≡ 1，所以 φ(d) 位一组一定可以；最短相加组长仍是 10 的阶，它整除 φ(d)" },
    { en: "{g:d = 27:} φ(27) = 18 but ord_{27}(10) = 3 since 999 = 27 × 37. 116667 → 116 + 667 = 783 = 27 × 29 ✓", zh: "d = 27：阶只有 3，三位一组就够" },
    { en: "{g:d = 77:} 77 | 1001, so 1000 ≡ −1 (mod 77): alternate 3-blocks. 950565 → 565 − 950 = −385 = −5 × 77 ✓ (950565 = 77 × 12345)", zh: "d = 77：1000 ≡ −1，三位交错" },
    { en: "CRT view (Day 10–11): mod 77 is mod 7 and mod 11 together, and 10³ ≡ −1 on both sides.", zh: "中国剩余定理的角度：模 77 等价于同时模 7 和模 11，10³ 两边都是 −1" },
  ], { x: 0.5, y: 1.2, w: 5.6, h: 3.9, size: 12, zhSize: 10, dark: false, gap: 6 });
  s.addShape(S.roundRect, { x: 6.4, y: 1.2, w: 3.1, h: 3.85, fill: { color: "EEF4F0" }, line: { color: "EEF4F0", width: 0 }, rectRadius: 0.1, objectName: "split-bg" });
  txt(s, col, "any d  任意 d", { x: 6.6, y: 1.27, w: 2.7, h: 0.3, size: 11, color: col.mutedInk });
  bi(s, col, [
    { en: "d = 2^{a} · 5^{b} · d′ with gcd(d′, 10) = 1", zh: "拆成 2 的幂、5 的幂和与 10 互素的部分" },
    { en: "2^{a}, 5^{b}: look at the last max(a, b) digits", zh: "看末几位" },
    { en: "d′: a block rule from this project", zh: "用本项目的分组规则" },
    { en: "coprime parts ⇒ test separately (next slides)", zh: "互素的部分分别判断" },
  ], { x: 6.6, y: 1.6, w: 2.7, h: 3.4, size: 11, zhSize: 10, dark: false, gap: 6 });

  // ───────── 16 chop the last digit ─────────
  pres.addSection({ title: "Extras" });
  s = board("Extras");
  title(s, "Chop the last digit: a practical rule for 7", "砍个位法");
  tag(s, "new · 课外", 8.5, 0.38);
  formulaBox(s, pres, col, "gcd(d, 10) = 1,  m = 10^{−1} (mod d),  n = 10x + y   ⇒   d | n  ⟺  d | x + m·y", { x: 0.5, y: 1.2, w: 9.0, h: 0.55, size: 15 });
  bi(s, col, [
    { en: "{y:Proof.} (⇐) 10(x + my) = 10x + (10m)y ≡ n. (⇒) m·n = (10m)x + my ≡ x + my. Both directions use only that m is the inverse of 10 (Day 4–5). ∎", zh: "证明：两个方向都只用到 m 是 10 的逆元" },
    { en: "d = 7: m = 5 ≡ −2, rule {y:x − 2y}.   2026 → 202 − 12 = 190 → 19 − 0 = 19, not a multiple of 7 ✓   343 → 34 − 6 = 28 ✓", zh: "7 的规则 x − 2y；2026 砍到 19，不是 7 的倍数；343 砍到 28" },
  ], { x: 0.5, y: 1.85, w: 5.15, h: 2.0, size: 12, zhSize: 10, gap: 5 });
  table(s, col, [
    ["d", "10⁻¹", "rule", "example"],
    ["7", "5 ≡ −2", "x − 2y", "2401 → 238 → 7 ✓"],
    ["13", "4", "x + 4y", "169 → 52 → 13 ✓"],
    ["17", "12 ≡ −5", "x − 5y", "289 → −17 ✓"],
    ["19", "2", "x + 2y", "361 → 38 ✓"],
  ], { x: 5.85, y: 1.85, w: 3.65, h: 2.0, colW: [0.45, 0.75, 0.75, 1.7], size: 11, headSize: 11 });
  pill(s, pres, col, "Keeps only yes/no: 2026 ≡ 3 (mod 7) but the chopped 19 ≡ 5. Say 'divisible or not', never 'same remainder'.  ·  只保留能否整除，余数会变", { x: 0.5, y: 4.1, w: 9.0, h: 0.5, size: 11, fill: col.pink, color: col.paper });

  // ───────── 17 2 and 5, coprime split ─────────
  s = paper("Extras");
  title(s, "2ᵏ, 5ᵏ, and coprime factors", "2 和 5；互素因子组合", false);
  bi(s, col, [
    { en: "{g:10 ≡ 0.} 10^{k} = 2^{k}·5^{k} ≡ 0 (mod 2^{k}), so n ≡ (last k digits) (mod 2^{k}); same for 5^{k}. 4 and 25: last two digits; 8 and 125: last three.", zh: "10ᵏ ≡ 0 (mod 2ᵏ)，所以只看末 k 位；5ᵏ 同理" },
    { en: "2026: last digit 6 → even, ≡ 1 (mod 5); last two 26 → ≡ 2 (mod 4); last three 026 → ≡ 2 (mod 8). All match.", zh: "2026 除以 4 余 2，除以 8 余 2，和末几位算的一样" },
    { en: "{g:Coprime factors.} a | n, b | n, gcd(a, b) = 1 ⇒ ab | n. Proof: Bézout gives ax + by = 1, so n = axn + byn, and ab divides both terms. ∎", zh: "互素因子组合：由 Bezout，ax + by = 1，n = axn + byn，两项都被 ab 整除" },
    { en: "So 6 = 2 × 3, 12 = 4 × 3, 66 = 2 × 3 × 11 are tested piece by piece.", zh: "所以 6、12、66 可以拆开分别判断" },
  ], { x: 0.5, y: 1.2, w: 5.6, h: 3.9, size: 12, zhSize: 10, dark: false, gap: 6 });
  s.addShape(S.roundRect, { x: 6.4, y: 1.2, w: 3.1, h: 3.85, fill: { color: "FBEAEA" }, line: { color: "FBEAEA", width: 0 }, rectRadius: 0.1, objectName: "counter-bg" });
  txt(s, col, "counterexample  反例", { x: 6.6, y: 1.27, w: 2.7, h: 0.3, size: 11, color: col.pink });
  txt(s, col, "4 | 12,  6 | 12,  but  24 ∤ 12", { x: 6.6, y: 1.65, w: 2.7, h: 0.5, size: 16, bold: true, color: col.ink, fontFace: "Cambria" });
  bi(s, col, [
    { en: "gcd(4, 6) = 2, not 1. The right statement is lcm(4, 6) = 12 | n.", zh: "4 和 6 不互素，正确的结论是 lcm(4, 6) = 12 | n" },
    { en: "Coprimality is what makes the Bézout step work.", zh: "互素是 Bezout 那一步的前提" },
  ], { x: 6.6, y: 2.3, w: 2.7, h: 2.6, size: 11, zhSize: 10, dark: false, gap: 6 });

  // ───────── 18 ISBN + other bases ─────────
  s = board("Extras");
  title(s, "In real life: ISBN-10 check digits", "实际应用：ISBN-10 校验码");
  formulaBox(s, pres, col, "10·d_{1} + 9·d_{2} + ⋯ + 2·d_{9} + 1·d_{10} ≡ 0 (mod 11)      (d_{10} = X means 10)", { x: 0.5, y: 1.2, w: 9.0, h: 0.55, size: 15 });
  bi(s, col, [
    { en: "0-306-40615-2:  0 + 27 + 0 + 42 + 24 + 0 + 24 + 3 + 10 + 2 = 132 = 12 × 11 ✓", zh: "例子：加权和 132 是 11 的倍数" },
    { en: "{y:Why 11?} It is prime, so every weight 1…10 is a unit mod 11. Change one digit, or swap two neighbours, and the weighted sum changes by a unit times a non-zero amount, never by a multiple of 11 (Euclid's lemma). The error is always caught.", zh: "为什么用 11：11 是素数，权重 1…10 都是模 11 的单位，所以抄错一位或交换相邻两位都会被发现（Euclid 引理）" },
    { en: "That is a divisibility rule running in reverse: instead of testing a number, you design it so the test passes.", zh: "这是整除规则的反向使用：不是检验一个数，而是设计一个数让检验通过" },
    { en: "Same ideas, bigger stage: the order of an element and primitive roots are the core of Diffie–Hellman and ElGamal (Day 14–15).", zh: "更大的舞台：阶和原根正是 Diffie–Hellman 和 ElGamal 的核心" },
  ], { x: 0.5, y: 1.9, w: 9.0, h: 3.2, size: 12, zhSize: 10, gap: 6 });

  // ───────── 19 what we got wrong ─────────
  s = paper("Extras");
  title(s, "Three things we got wrong at first", "我们一开始想错的三件事", false);
  const wrongs = [
    { en: "\"7 has no rule.\"", zh: "\"7 没有规则\"", fix: "It has several: 3-block alternating (1000 ≡ −1), and x − 2y. We had only ever seen the 10 ≡ 1 family.", fixzh: "其实有好几个：三位交错、x − 2y。我们之前只见过 10 ≡ 1 这一家" },
    { en: "\"The alternating sum can start from either end.\"", zh: "\"交错和从哪边算都一样\"", fix: "True for yes/no, false for the remainder: 2026 from the left gives −2 ≡ 9, the real remainder is 2.", fixzh: "判断整除可以，算余数不行：2026 从左算得 9，真实余数是 2" },
    { en: "\"The shortest rule is always the order of 10.\"", zh: "\"最短规则总是 10 的阶\"", fix: "The order gives the shortest additive block. If it is even, half of it works with alternating signs, but only for primes (d = 33 breaks it).", fixzh: "阶给出的是最短的相加组长；阶为偶数时一半长度可以交错，但只对素数成立（d = 33 是反例）" },
  ];
  wrongs.forEach((w, i) => {
    const y = 1.2 + i * 1.25;
    s.addShape(S.roundRect, { x: 0.5, y, w: 9.0, h: 1.12, fill: { color: "EEF4F0" }, line: { color: "EEF4F0", width: 0 }, rectRadius: 0.1, objectName: "wrong-bg" });
    s.addShape(S.ellipse, { x: 0.7, y: y + 0.36, w: 0.4, h: 0.4, fill: { color: col.pink }, line: { color: col.pink, width: 0 }, objectName: "x-dot" });
    s.addText("✕", { x: 0.7, y: y + 0.36, w: 0.4, h: 0.4, fontSize: 14, bold: true, color: col.paper, align: "center", valign: "middle", isTextBox: true, margin: 0, objectName: "x-mark" });
    bi(s, col, [{ en: w.en, zh: w.zh, bold: true }], { x: 1.3, y: y + 0.1, w: 3.0, h: 0.95, size: 13, zhSize: 11, dark: false, valign: "middle" });
    bi(s, col, [{ en: w.fix, zh: w.fixzh }], { x: 4.4, y: y + 0.1, w: 4.95, h: 0.95, size: 11, zhSize: 10, dark: false, valign: "middle" });
  });

  // ───────── 20 summary + 2026 table ─────────
  pres.addSection({ title: "Wrap-up" });
  s = board("Wrap-up");
  title(s, "One sentence, and one year", "一句话总结，一个例子");
  bi(s, col, [
    { en: "{y:If you know what 10 is mod d, you can build the rule for d yourself.} Fermat (and Euler) say the rule exists; the order of 10 says how short the additive block can be, and it equals the period of 1/d.", zh: "只要知道 10 模 d 等于几，就能自己造出 d 的整除规则；费马（和欧拉）保证规则存在，10 的阶决定最短相加组长，它也等于 1/d 的循环节长度" },
  ], { x: 0.5, y: 1.2, w: 9.0, h: 1.0, size: 13, zhSize: 11 });
  table(s, col, [
    ["d", "rule / 规则", "on 2026", "2026 mod d"],
    ["2, 5", "last digit · 个位", "6", "0, 1 ✓"],
    ["4, 8", "last 2 / 3 digits · 末两位/三位", "26, 026", "2, 2 ✓"],
    ["3, 9", "digit sum · 数字和", "2+0+2+6 = 10 → 1", "1, 1 ✓"],
    ["11", "alternating sum · 交错和", "6−2+0−2 = 2", "2 ✓"],
    ["7, 13", "alternate 3-blocks · 三位交错", "026 − 2 = 24", "3, 11 ✓"],
    ["37", "add 3-blocks · 三位相加", "2 + 026 = 28", "28 ✓"],
  ], { x: 0.5, y: 2.3, w: 9.0, h: 2.4, colW: [0.9, 3.6, 2.6, 1.9], size: 11, headSize: 11 });
  txt(s, col, "2026 = 2 × 1013, and 1013 is prime, so none of these divide it.  ·  2026 = 2 × 1013，1013 是素数", { x: 0.5, y: 4.75, w: 9.0, h: 0.3, size: 10, color: col.mutedChalk });

  // ───────── 21 theorem map ─────────
  s = paper("Wrap-up");
  title(s, "Theorem map", "定理总表：课内工具 vs 新内容", false);
  txt(s, col, "from class  课内", { x: 0.5, y: 1.15, w: 4.3, h: 0.3, size: 12, bold: true, color: col.board });
  bi(s, col, [
    { en: "T2 congruence respects +, ×, powers (Day 3)", zh: "同余的运算性质" },
    { en: "T3 units and inverses mod m (Day 4–5)", zh: "单位与逆元 → 砍个位法" },
    { en: "T4 Bézout; T5 Euclid's lemma (Day 5–6)", zh: "Bezout；Euclid 引理" },
    { en: "T7 Chinese remainder theorem (Day 10–11)", zh: "中国剩余定理 → 合数 d" },
    { en: "T8 Fermat's little theorem (Day 11–12)", zh: "费马小定理 → 存在性" },
    { en: "T9 Euler's theorem; T10 order; T11 primitive roots (Day 12–14)", zh: "欧拉定理；阶；原根" },
  ], { x: 0.5, y: 1.45, w: 4.3, h: 3.6, size: 13, zhSize: 10, dark: false, gap: 9 });
  txt(s, col, "new in this project  课外（本项目新学）", { x: 5.2, y: 1.15, w: 4.3, h: 0.3, size: 12, bold: true, color: col.pink });
  bi(s, col, [
    { en: "N2 / N3 digit sum and alternating sum, with remainders", zh: "数字和、交错和（含余数）" },
    { en: "N4 / N5 block rules for 99, 999, 101, 1001", zh: "分组主定理及 99、999、101、1001" },
    { en: "N6 / N7 existence via Fermat and Euler; order = shortest additive block", zh: "存在性；阶 = 最短相加组长" },
    { en: "N8 / N9 / N10 period of 1/d, cyclic 142857, Midy", zh: "循环节 = 阶；循环数；Midy 定理" },
    { en: "N11 chop-a-digit rule via 10⁻¹; N12 / N13 powers of 2, 5 and coprime splitting", zh: "砍个位法；2 和 5；互素拆分" },
    { en: "N14 other bases; N15 / N16 the two tricks; N18 ISBN-10", zh: "其他进制；两个魔术；ISBN-10" },
  ], { x: 5.2, y: 1.45, w: 4.3, h: 3.6, size: 13, zhSize: 10, dark: false, gap: 9 });

  // ───────── 22 references ─────────
  s = board("Wrap-up");
  title(s, "References", "参考资料");
  bi(s, col, [
    { en: "MATH 5248 course notes: Day 3 (congruences), Day 4–5 (units, inverses, Bézout), Day 6 (Euclid's lemma), Day 10–11 (CRT), Day 11–12 (Fermat), Day 12–13 (Euler), Day 13 (order), Day 14 (primitive roots).", zh: "课程讲义对应各天" },
    { en: "J. Hoffstein, J. Pipher, J. H. Silverman, An Introduction to Mathematical Cryptography, 2nd ed., Springer. Fermat's little theorem, pp. 30–32.", zh: "" },
    { en: "NTIC, Number Theory: In Context and Interactive (link on the course Canvas page).", zh: "" },
    { en: "Wikipedia: Divisibility rule; Repeating decimal; Multiplicative order; Cyclic number; Midy's theorem; International Standard Book Number.", zh: "" },
  ], { x: 0.5, y: 1.2, w: 9.0, h: 3.9, size: 13, zhSize: 11, gap: 8 });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  await finalize(OUT);
  console.log("wrote", OUT);
}
main().catch((e) => { console.error(e); process.exit(1); });
