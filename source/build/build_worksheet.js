// Two-page worksheet handed to the class. Page 1: do the two tricks along with us (blanks).
// Page 2: why it works, the general theorem with proofs, the table, references, link to the full deck.
// Writes presentation/Worksheet提交版.html; make_pdf.sh turns it into the PDF with headless Chrome.
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "..", "presentation", "Worksheet提交版.html");

// ---------- hand-drawn-style SVG figures ----------
const GREEN = "#1F3A2E", YELLOW = "#E0B33C", PINK = "#D96A6A", INK = "#2B2B2B", MUTED = "#6E6E6E";

function clock9() {
  const r = 52, cx = 60, cy = 60;
  let s = `<svg viewBox="0 0 120 120" width="120" height="120"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${GREEN}" stroke-width="2.2"/>`;
  for (let k = 1; k <= 9; k++) {
    const a = -Math.PI / 2 + (k % 9) * (2 * Math.PI / 9);
    const tx = cx + Math.cos(a) * r, ty = cy + Math.sin(a) * r, lx = cx + Math.cos(a) * (r - 13), ly = cy + Math.sin(a) * (r - 13);
    s += `<line x1="${tx}" y1="${ty}" x2="${cx + Math.cos(a) * (r - 5)}" y2="${cy + Math.sin(a) * (r - 5)}" stroke="${GREEN}" stroke-width="1.6"/>`;
    const hot = k === 1 || k === 9;
    if (hot) s += `<circle cx="${lx}" cy="${ly}" r="8" fill="${YELLOW}"/>`;
    s += `<text x="${lx}" y="${ly + 3.5}" font-size="9.5" font-weight="700" text-anchor="middle" fill="${hot ? GREEN : INK}">${k}</text>`;
  }
  const a1 = -Math.PI / 2 + 2 * Math.PI / 9;
  s += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a1) * (r - 22)}" y2="${cy + Math.sin(a1) * (r - 22)}" stroke="${YELLOW}" stroke-width="3" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="3" fill="${YELLOW}"/></svg>`;
  return s;
}

function cycle7() {
  const items = [["1", "1"], ["3", "4"], ["2", "2"], ["6", "8"], ["4", "5"], ["5", "7"]];
  const r = 42, cx = 85, cy = 70, R = 11;
  let s = `<svg viewBox="0 0 170 146" width="150" height="129">`;
  const pts = items.map((_, i) => { const a = -Math.PI / 2 + i * (2 * Math.PI / 6); return [cx + Math.cos(a) * r, cy + Math.sin(a) * r, a]; });
  s += `<defs><marker id="ah" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="${YELLOW}"/></marker></defs>`;
  for (let i = 0; i < 6; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % 6];
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    s += `<line x1="${x1 + ux * (R + 2)}" y1="${y1 + uy * (R + 2)}" x2="${x2 - ux * (R + 3)}" y2="${y2 - uy * (R + 3)}" stroke="${YELLOW}" stroke-width="1.8" marker-end="url(#ah)"/>`;
  }
  pts.forEach(([x, y, a], i) => {
    const hot = i === 0;
    s += `<circle cx="${x}" cy="${y}" r="${R}" fill="${hot ? YELLOW : "#fff"}" stroke="${hot ? YELLOW : GREEN}" stroke-width="1.8"/>`;
    s += `<text x="${x}" y="${y + 3.5}" font-size="10" font-weight="700" text-anchor="middle" fill="${GREEN}">${items[i][0]}</text>`;
    const c = Math.cos(a), sn = Math.sin(a);
    const anchor = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
    const lx = x + (anchor === "middle" ? 0 : Math.sign(c) * (R + 4));
    const ly = anchor === "middle" ? y + sn * (R + 9) + 3 : y + sn * 14 + 3;
    s += `<text x="${lx}" y="${ly}" font-size="7.5" text-anchor="${anchor}" fill="${MUTED}">digit ${items[i][1]}</text>`;
  });
  return s + `</svg>`;
}

const blank = (w = 70) => `<span class="blank" style="width:${w}px"></span>`;
const box = () => `<span class="box"></span>`;

// ---------- page 1 ----------
const page1 = `
<section class="page">
  <header>
    <div class="title">Numbers That Talk</div>
    <div class="sub">Divisibility rules and why they work</div>
    <div class="by">Zhiheng Li and Yueran, MATH 5248, December 2026</div>
    <div class="lead">Do this with us during the talk. The <b>why</b> is on the back.</div>
  </header>

  <div class="warm">
    <b>Warm-up.</b> This year is 2026. Is it divisible by 9? Add the digits: 2 + 0 + 2 + 6 = ${blank(40)}.
    Is that a multiple of 9? ${box()} yes &nbsp;${box()} no. &nbsp; So the remainder of 2026 &divide; 9 is ${blank(40)}.
  </div>

  <div class="trick">
    <h2><span class="num">1</span> The vanishing digit <span class="who">(Zhiheng)</span></h2>
    <ol>
      <li>Think of a four-digit number. Not all four digits the same. Don't tell us.&nbsp; <b>My number:</b> ${blank(90)}</li>
      <li>Shuffle its digits into a new number.&nbsp; <b>Shuffled:</b> ${blank(90)}</li>
      <li>Subtract the smaller one from the bigger one.&nbsp; ${blank(80)} &minus; ${blank(80)} = ${blank(90)}</li>
      <li>Circle <b>one non-zero digit</b> of the result. Keep it hidden.</li>
      <li>Read us the other digits, in any order. We name the hidden one.&nbsp; <b>We said</b> ${blank(30)} ${box()} right</li>
    </ol>
    <div class="ex"><b>Example.</b> 5274 &rarr; shuffle 7425 &rarr; 7425 &minus; 5274 = 2151 &rarr; hide the 5 &rarr; you read 2, 1, 1 &rarr; we say <b>5</b>.</div>
  </div>

  <div class="trick">
    <h2><span class="num">2</span> 1001 brings it back <span class="who">(Yueran)</span></h2>
    <ol>
      <li>Think of a three-digit number.&nbsp; <b>My number:</b> ${blank(70)}</li>
      <li>Write it twice, so it becomes a six-digit number.&nbsp; ${blank(110)}</li>
      <li>Divide by 7. &nbsp;= ${blank(90)} &nbsp;(it divides evenly, promise)</li>
      <li>Divide that by 11. &nbsp;= ${blank(90)}</li>
      <li>Divide that by 13. &nbsp;= ${blank(90)} &nbsp; ${box()} my number is back</li>
    </ol>
    <div class="ex"><b>Example.</b> 572 &rarr; 572572 &rarr; &divide; 7 = 81796 &rarr; &divide; 11 = 7436 &rarr; &divide; 13 = <b>572</b>.</div>
  </div>

  <div class="trick try">
    <h2><span class="num">3</span> Try it after the talk</h2>
    <ol>
      <li>Is 45658 divisible by 37? Cut it into three-digit chunks from the right: 45 | 658. Add: 45 + 658 = ${blank(50)}. Is that a multiple of 37? ${box()} yes &nbsp;${box()} no</li>
      <li>What is 2026 mod 7? Chunks 2 | 026. Alternate: 026 &minus; 2 = ${blank(40)}. That mod 7 is ${blank(30)}, and mod 13 it is ${blank(30)}.</li>
      <li>1/7 = 0.142857 142857&hellip; Multiply 142857 by 2: ${blank(70)}. By 3: ${blank(70)}. Same digits?</li>
    </ol>
  </div>

  <div class="turn">Why does any of this work? &rarr; turn over</div>
</section>`;

// ---------- page 2 ----------
const page2 = `
<section class="page p2">
  <header class="small">
    <div class="title2">Why it works</div>
    <div class="by">Everything below only uses things from class: congruences, Fermat and Euler, and the order of an element.</div>
  </header>

  <div class="cols">
  <div class="col">
    <h3>A. Trick 1 is "10 &equiv; 1 (mod 9)"</h3>
    <div class="fig">${clock9()}<div class="cap">A clock with only 9 marks. 10 steps land where 1 step lands. So do 100 and 1000.</div></div>
    <p><b>Theorem.</b> For any n with digits d<sub>0</sub>, d<sub>1</sub>, &hellip; (units first), n &equiv; d<sub>0</sub> + d<sub>1</sub> + &hellip; (mod 9), hence also mod 3.</p>
    <p><b>Proof.</b> n = d<sub>0</sub> + d<sub>1</sub>&middot;10 + d<sub>2</sub>&middot;10<sup>2</sup> + &hellip;. Since 10 = 9 + 1, 10 &equiv; 1 (mod 9), so 10<sup>i</sup> &equiv; 1 and d<sub>i</sub>&middot;10<sup>i</sup> &equiv; d<sub>i</sub>. Add up. 3 | 9 gives the mod 3 version. &#8718;</p>
    <p><b>The trick.</b> Your number n and the shuffled n&prime; have the same digits, so n &equiv; n&prime; (mod 9) and 9 | n &minus; n&prime;. By the theorem the digits of the difference add to a multiple of 9. You read all but one digit x; the sum s you read satisfies s + x &equiv; 0 (mod 9), and exactly one x in 1&hellip;9 does that. (A 0 is banned because 0 and 9 would look the same.)</p>
    <p class="ex2">2026 &rarr; 2+0+2+6 = 10 &rarr; 1, so 2026 &equiv; 1 (mod 9). &nbsp; 7452 &rarr; 18, so 9 | 7452.</p>

    <h3>B. Trick 2 is "1000 &equiv; &minus;1 (mod 1001)"</h3>
    <p>abcabc = abc&middot;1000 + abc = abc&middot;1001, and <b>1001 = 7 &times; 11 &times; 13</b>. Dividing by 7, 11, 13 in turn is dividing by 1001, so abc comes back. It cannot fail.</p>
    <p>More useful: 1000 = 1001 &minus; 1, so 1000 &equiv; &minus;1 (mod 1001). Cut n into three-digit blocks B<sub>0</sub>, B<sub>1</sub>, B<sub>2</sub>, &hellip; from the right. Then n = B<sub>0</sub> + B<sub>1</sub>&middot;1000 + B<sub>2</sub>&middot;1000<sup>2</sup> + &hellip; &equiv; B<sub>0</sub> &minus; B<sub>1</sub> + B<sub>2</sub> &minus; &hellip; (mod 1001), hence mod 7, 11 and 13 at once.</p>
    <p class="ex2">2026 &rarr; 026 &minus; 2 = 24 &rarr; 24 &equiv; 3 (mod 7), &equiv; 11 (mod 13), &equiv; 2 (mod 11). All three are the true remainders.</p>

    <h3>C. One idea, every rule</h3>
    <p><b>Block theorem.</b> If 10<sup>k</sup> &equiv; 1 (mod d), then n &equiv; B<sub>0</sub> + B<sub>1</sub> + B<sub>2</sub> + &hellip; (mod d) for k-digit blocks from the right. If 10<sup>k</sup> &equiv; &minus;1, then n &equiv; B<sub>0</sub> &minus; B<sub>1</sub> + B<sub>2</sub> &minus; &hellip;. Proof: write n in base 10<sup>k</sup> and use (10<sup>k</sup>)<sup>j</sup> &equiv; (&plusmn;1)<sup>j</sup>, exactly as in A. &#8718;</p>
    <table>
      <tr><th>d</th><th>k</th><th style="white-space:nowrap">10<sup>k</sup> &equiv;</th><th>rule</th><th>example</th></tr>
      <tr><td>3, 9</td><td>1</td><td>+1</td><td>digit sum</td><td>2026 &rarr; 10 &rarr; 1</td></tr>
      <tr><td>11</td><td>1</td><td>&minus;1</td><td>alternate digits</td><td>2026 &rarr; 6&minus;2+0&minus;2 = 2</td></tr>
      <tr><td>101</td><td>2</td><td>&minus;1</td><td>alternate 2-blocks</td><td>461267 &rarr; 67&minus;12+46 = 101 &#10003;</td></tr>
      <tr><td>27, 37</td><td>3</td><td>+1</td><td>add 3-blocks (999 = 27&times;37)</td><td>45658 &rarr; 45+658 = 703 = 19&times;37 &#10003;</td></tr>
      <tr><td>7, 13, 77</td><td>3</td><td>&minus;1</td><td>alternate 3-blocks</td><td>1283945 &rarr; 945&minus;283+1 = 663 = 13&times;51 &#10003;</td></tr>
      <tr><td>41, 271</td><td>5</td><td>+1</td><td>add 5-blocks (99999 = 9&times;41&times;271)</td><td>ord<sub>41</sub>(10) = 5</td></tr>
    </table>
  </div>

  <div class="col">
    <h3>D. Every prime p &ne; 2, 5 gets a rule</h3>
    <p><b>Theorem.</b> (1) (p &minus; 1)-digit blocks, added, always work. (2) The shortest <i>additive</i> block is k = ord<sub>p</sub>(10), and k | p &minus; 1. (3) If k is even, 10<sup>k/2</sup> &equiv; &minus;1 (mod p), so (k/2)-blocks with alternating signs work too.</p>
    <p><b>Proof.</b> (1) p does not divide 10, so Fermat gives 10<sup>p&minus;1</sup> &equiv; 1 (mod p); apply the block theorem. (2) By definition of the order, k is the least exponent with 10<sup>k</sup> &equiv; 1, and a<sup>n</sup> &equiv; 1 &rArr; ord | n gives k | p &minus; 1. (3) Put x = 10<sup>k/2</sup>. Then p | x<sup>2</sup> &minus; 1 = (x &minus; 1)(x + 1). By Euclid's lemma p | x &minus; 1 or p | x + 1; the first contradicts the minimality of k. &#8718;</p>
    <p><b>Careful.</b> (3) needs p prime: for d = 33, ord(10) = 2 but 10 is not &equiv; &minus;1 (mod 33). For composite d with gcd(d, 10) = 1, Euler gives 10<sup>&phi;(d)</sup> &equiv; 1, so &phi;(d)-blocks work and the shortest additive block is still ord<sub>d</sub>(10). Example: &phi;(27) = 18 but ord<sub>27</sub>(10) = 3, since 999 = 27 &times; 37.</p>
    <p class="ex2">7: ord = 6 | 6, even, so 10<sup>3</sup> &equiv; &minus;1. &nbsp; 13: ord = 6 | 12. &nbsp; 37: ord = 3 | 36 (odd, no &minus;1 rule). &nbsp; 41: ord = 5 | 40.</p>

    <h3>E. Block length = period of 1/p</h3>
    <div class="fig">${cycle7()}<div class="cap">Remainders of 1 &divide; 7: 1, 3, 2, 6, 4, 5, back to 1. They are 10<sup>i</sup> mod 7. Six steps, so six digits.</div></div>
    <p><b>Theorem.</b> If gcd(d, 10) = 1, d &gt; 1, then 1/d is purely repeating with period ord<sub>d</sub>(10).</p>
    <p><b>Proof.</b> Long division starts with remainder r<sub>0</sub> = 1 and each step replaces r by 10r mod d, so r<sub>i</sub> &equiv; 10<sup>i</sup> (mod d). The digits repeat from the first i with r<sub>i</sub> = 1, which is i = ord<sub>d</sub>(10). &#8718; &nbsp; Also directly: 10<sup>6</sup>/7 &minus; 1/7 = 142857, so 999999 = 7 &times; 142857.</p>
    <p><b>So "how many digits per block for 7" and "how long is the period of 1/7" are the same question.</b> Both answers are 6.</p>
    <p><b>Bonus.</b> 142857 &times; 1, 2, &hellip;, 6 = 142857, 285714, 428571, 571428, 714285, 857142: the same digits rotated, and &times; 7 = 999999. Reason: the powers of 10 mod 7 hit every non-zero remainder, so 10 is a <i>primitive root</i> mod 7, and k/7 just enters the same cycle at a different point. <b>Midy:</b> 142 + 857 = 999 and 076 + 923 = 999 (for 1/13), because 10<sup>3</sup> &equiv; &minus;1.</p>

    <h3>F. More, if you are curious</h3>
    <p class="more">Chop-the-last-digit rules from 10<sup>&minus;1</sup> mod d (7: x &minus; 2y; 13: x + 4y). &nbsp; 2<sup>k</sup> and 5<sup>k</sup>: last k digits, since 10 &equiv; 0. &nbsp; Coprime factors combine (6 = 2 &times; 3), non-coprime do not (4 and 6 divide 12, but 24 does not). &nbsp; Other bases: digit sum tests b &minus; 1, alternating sum tests b + 1. &nbsp; ISBN-10 check digits use mod 11 because 11 is prime.</p>

  </div>
  </div>
</section>`;

const CSS = `
@page { size: Letter; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: ${INK}; }
.page { width: 8.5in; height: 11in; padding: 0.55in 0.6in 0.5in; page-break-after: always; position: relative; }
.page:last-child { page-break-after: auto; }
header { margin-bottom: 8pt; }
.title { font-family: Cambria, Georgia, serif; font-size: 26pt; font-weight: 700; color: ${GREEN}; line-height: 1.1; }
.title2 { font-family: Cambria, Georgia, serif; font-size: 18pt; font-weight: 700; color: ${GREEN}; }
.sub { font-size: 11pt; color: ${INK}; margin-top: 2pt; }
.by { font-size: 9pt; color: ${MUTED}; margin-top: 2pt; }
.lead { font-size: 11pt; margin-top: 8pt; }
.warm { background: #FBF3DC; border-radius: 6px; padding: 7pt 10pt; font-size: 10.5pt; line-height: 1.9; margin: 6pt 0 8pt; }
.trick { border: 1.4px solid ${GREEN}; border-radius: 8px; padding: 6pt 10pt 8pt; margin: 0 0 9pt; }
.trick.try { border-style: dashed; border-color: ${MUTED}; }
h2 { font-family: Cambria, Georgia, serif; font-size: 14pt; color: ${GREEN}; margin: 0 0 3pt; display: flex; align-items: center; gap: 7pt; }
.num { display: inline-flex; width: 20pt; height: 20pt; border-radius: 50%; background: ${YELLOW}; color: ${GREEN}; font-size: 11pt; align-items: center; justify-content: center; font-family: Helvetica, Arial, sans-serif; }
.who { font-size: 9.5pt; color: ${MUTED}; font-family: Helvetica, Arial, sans-serif; font-weight: 400; }
ol { margin: 0; padding-left: 18pt; font-size: 10.5pt; line-height: 2.15; }
.blank { display: inline-block; border-bottom: 1px solid ${INK}; height: 11pt; vertical-align: baseline; margin: 0 2pt; }
.box { display: inline-block; width: 9pt; height: 9pt; border: 1px solid ${INK}; vertical-align: -1pt; margin-right: 2pt; }
.ex { font-size: 9.5pt; color: ${MUTED}; margin-top: 3pt; }
.foot { position: absolute; left: 0.6in; bottom: 0.82in; font-size: 8.5pt; color: ${MUTED}; }
.turn { position: absolute; right: 0.6in; bottom: 0.45in; font-family: Cambria, Georgia, serif; font-size: 12pt; color: ${PINK}; font-weight: 700; }
.p2 { padding-top: 0.45in; }
header.small .by { margin-top: 3pt; font-size: 8.5pt; }
.cols { display: grid; grid-template-columns: 1fr 1fr; column-gap: 14pt; margin-top: 4pt; }
.col { font-size: 8.4pt; line-height: 1.32; }
h3 { font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: ${GREEN}; margin: 7pt 0 2pt; }
.col h3:first-child { margin-top: 0; }
p { margin: 0 0 3.5pt; }
.ex2 { color: ${MUTED}; }
.fig { float: right; width: 150px; margin: 0 0 3pt 6pt; text-align: center; }
.fig .cap { font-size: 7pt; color: ${MUTED}; line-height: 1.2; margin-top: 1pt; }
table { border-collapse: collapse; width: 100%; font-size: 7.6pt; margin: 2pt 0 2pt; }
th, td { border: 0.6px solid #C9D6CE; padding: 1.5pt 3pt; text-align: left; vertical-align: top; }
th { background: #E6EFE9; color: ${GREEN}; }
.more, .refs { font-size: 7.8pt; color: ${INK}; }
.refs { color: ${MUTED}; }
sub, sup { font-size: 75%; line-height: 0; }
`;

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Divisibility worksheet</title><style>${CSS}</style></head><body>${page1}${page2}</body></html>`;
fs.writeFileSync(OUT, html);
console.log("wrote", OUT);
