// Shared theme, layouts and drawing helpers for both decks.
// Chalkboard look: deep green board, cream chalk, yellow / pink highlights.
const pptxgen = require("pptxgenjs");

// Slide language. "en" (default) drops every Chinese string; "bi" keeps English + Chinese on each slide.
const LANG = process.env.SLIDE_LANG || "en";
const CJK = /[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]/;
// Cut a string at its first Chinese character and drop the separator before it (" · ", " / ").
function enOnly(str) {
  if (LANG !== "en" || typeof str !== "string") return str;
  const m = CJK.exec(str);
  if (!m) return str;
  let out = str.slice(0, m.index).replace(/[\s·/：:]+$/, "");
  if (!/[A-Za-z]/.test(out)) return ""; // a Chinese-only line (maybe with numbers)
  // drop a trailing " · 2026 ..." fragment that belonged to the Chinese part
  const parts = out.split(/\s+[·/]\s+/);
  if (parts.length > 1 && !/[A-Za-z]/.test(parts[parts.length - 1])) out = out.slice(0, out.lastIndexOf(parts[parts.length - 1])).replace(/[\s·/：:]+$/, "");
  return out;
}

const THEME = {
  name: "Chalkboard",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1F3A2E", // board green (background of dark slides)
    lt1: "FFFFFF", // paper white
    dk2: "2B2B2B", // ink (text on paper)
    lt2: "F2EBD9", // chalk cream (text on board)
    accent1: "F2C94C", // chalk yellow  (≡ 1, highlights)
    accent2: "E57373", // chalk pink    (≡ −1)
    accent3: "7FB3A0", // soft green    (boxes on paper)
    accent4: "5B8DB8", // blue (links / third colour)
    accent5: "BDB49E", // muted cream (Chinese on board)
    accent6: "6E6E6E", // muted ink (Chinese on paper)
    hlink: "5B8DB8",
    folHlink: "6E6E6E",
  },
};

function newPres() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10 x 5.625 in
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = "Zhiheng Li, Yueran";
  pres.subject = "MATH 5248";
  pres.company = "University of Minnesota";
  pres.title = "Divisibility Rules and Modular Arithmetic";
  const C = pres.SchemeColor;
  const col = {
    board: C.text1, // dk1
    paper: C.background1, // lt1
    ink: C.text2, // dk2
    chalk: C.background2, // lt2
    yellow: C.accent1,
    pink: C.accent2,
    green: C.accent3,
    blue: C.accent4,
    mutedChalk: C.accent5,
    mutedInk: C.accent6,
  };

  const TITLE = { x: 0.5, y: 0.32, w: 9.0, h: 0.75 };
  pres.defineSlideMaster({
    title: "BOARD",
    background: { color: col.board },
    objects: [
      { placeholder: { options: { name: "title", type: "title", ...TITLE, fontSize: 28, bold: true, color: col.chalk, valign: "middle", margin: 0 }, text: "" } },
    ],
    slideNumber: { x: 9.3, y: 5.2, w: 0.5, h: 0.3, fontSize: 9, color: col.mutedChalk, align: "right" },
  });
  pres.defineSlideMaster({
    title: "PAPER",
    background: { color: col.paper },
    objects: [
      { placeholder: { options: { name: "title", type: "title", ...TITLE, fontSize: 28, bold: true, color: col.board, valign: "middle", margin: 0 }, text: "" } },
    ],
    slideNumber: { x: 9.3, y: 5.2, w: 0.5, h: 0.3, fontSize: 9, color: col.mutedInk, align: "right" },
  });
  pres.defineSlideMaster({ title: "BOARD_HERO", background: { color: col.board } });
  pres.defineSlideMaster({ title: "PAPER_HERO", background: { color: col.paper } });

  return { pres, col };
}

// ---------- tiny markup → pptxgenjs runs ----------
// ^{x} superscript, _{x} subscript, {y:text} yellow, {p:text} pink, {g:green}, {b:bold}
function runs(str, base = {}) {
  str = enOnly(str);
  const out = [];
  const push = (text, extra) => { if (text) out.push({ text, options: { ...base, ...extra } }); };
  // find the matching close brace for an opening brace at position i
  const matchBrace = (i) => { let d = 0; for (let j = i; j < str.length; j++) { if (str[j] === "{") d++; else if (str[j] === "}") { d--; if (d === 0) return j; } } return -1; };
  let i = 0, plain = "";
  while (i < str.length) {
    const c = str[i], n = str[i + 1];
    let kind = null, open = -1;
    if ((c === "^" || c === "_") && n === "{") { kind = c; open = i + 1; }
    else if (c === "{" && /[ypgb]/.test(n) && str[i + 2] === ":") { kind = n; open = i; }
    if (kind) {
      const close = matchBrace(open);
      if (close > 0) {
        push(plain, {}); plain = "";
        const inner = kind === "^" || kind === "_" ? str.slice(open + 1, close) : str.slice(open + 3, close);
        const extra = { "^": { superscript: true }, "_": { subscript: true }, y: { color: "__Y__" }, p: { color: "__P__" }, g: { color: "__G__" }, b: { bold: true } }[kind];
        out.push(...runs(inner, { ...base, ...extra }));
        i = close + 1; continue;
      }
    }
    plain += c; i++;
  }
  push(plain, {});
  return out;
}

// Resolve colour placeholders once we know the scheme object.
function resolve(rs, col) {
  const map = { __Y__: col.yellow, __P__: col.pink, __G__: col.green };
  for (const r of rs) if (map[r.options.color]) r.options.color = map[r.options.color];
  return rs;
}

// Bilingual block: list of {en, zh} (zh optional). English line then Chinese line, muted.
function bi(slide, col, items, o) {
  const dark = o.dark !== false; // default: on board
  const enColor = o.color || (dark ? col.chalk : col.ink);
  const zhColor = o.zhColor || (dark ? col.mutedChalk : col.mutedInk);
  const size = o.size || 16;
  const zhSize = o.zhSize || size - 3;
  const gap = o.gap == null ? 8 : o.gap;
  const all = [];
  if (LANG === "en") items = items.map((it) => ({ ...it, zh: "" })).filter((it) => enOnly(it.en));
  items.forEach((it, i) => {
    const lastItem = i === items.length - 1;
    const en = resolve(runs(it.en, { fontSize: size, color: enColor, bold: !!it.bold }), col);
    if (it.bullet) en[0].options.bullet = it.bullet === true ? { indent: 14 } : it.bullet;
    if (o.align) en[0].options.align = o.align;
    if (it.zh) {
      en[en.length - 1].options.breakLine = true;
      en[0].options.paraSpaceAfter = 1;
      all.push(...en);
      const zh = resolve(runs(it.zh, { fontSize: zhSize, color: zhColor }), col);
      if (it.bullet) zh[0].options.bullet = { indent: 14, type: "none" }; // keep indent, hide bullet
      if (o.align) zh[0].options.align = o.align;
      zh[0].options.paraSpaceAfter = lastItem ? 0 : gap;
      if (!lastItem) zh[zh.length - 1].options.breakLine = true;
      all.push(...zh);
    } else {
      en[0].options.paraSpaceAfter = lastItem ? 0 : gap;
      if (!lastItem) en[en.length - 1].options.breakLine = true;
      all.push(...en);
    }
  });
  slide.addText(all, { x: o.x, y: o.y, w: o.w, h: o.h, valign: o.valign || "top", isTextBox: true, margin: o.margin == null ? 0 : o.margin, objectName: o.name || "text", fontFace: o.fontFace });
}

// One-line text with markup.
function txt(slide, col, str, o) {
  if (!enOnly(str)) return;
  const rs = resolve(runs(str, { fontSize: o.size || 16, color: o.color || col.chalk, bold: !!o.bold, italic: !!o.italic }), col);
  slide.addText(rs, { x: o.x, y: o.y, w: o.w, h: o.h, align: o.align || "left", valign: o.valign || "middle", isTextBox: true, margin: o.margin == null ? 0 : o.margin, objectName: o.name || "text", fontFace: o.fontFace, charSpacing: o.charSpacing, lineSpacingMultiple: o.lineSpacing });
}

// Digit groups drawn as rounded boxes:  [45] [658]
function blocks(slide, pres, col, groups, o) {
  const size = o.size || 24, h = o.h || 0.6, pad = 0.18, gap = o.gap || 0.18;
  const charW = size * 0.0125; // inches per digit (Cambria bold, approx)
  let x = o.x;
  const boxes = [];
  groups.forEach((g, i) => {
    const w = Math.max(0.5, g.text.length * charW + 2 * pad);
    const fill = g.fill || (i % 2 ? col.pink : col.yellow);
    slide.addShape(pres.ShapeType.roundRect, { x, y: o.y, w, h, fill: { color: fill }, line: { color: fill, width: 0 }, rectRadius: 0.08, objectName: "block" });
    slide.addText(g.text, { x, y: o.y, w, h, fontSize: size, bold: true, color: g.color || col.board, align: "center", valign: "middle", isTextBox: true, margin: 0, fontFace: "Cambria", objectName: "block-text" });
    boxes.push({ x, w });
    x += w + gap;
    if (g.op && i < groups.length - 1) {
      slide.addText(g.op, { x: x - gap, y: o.y, w: gap, h, fontSize: size, color: o.opColor || col.chalk, align: "center", valign: "middle", isTextBox: true, margin: 0, objectName: "op" });
    }
  });
  return { x1: boxes[0].x, x2: x - gap, boxes };
}

// Clock with 9 marks (9 at the top plays the role of 0).
function clock9(slide, pres, col, cx, cy, r, o = {}) {
  const dark = o.dark !== false;
  const stroke = dark ? col.chalk : col.board;
  slide.addShape(pres.ShapeType.ellipse, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: dark ? col.board : col.paper }, line: { color: stroke, width: 2.5 }, objectName: "clock" });
  for (let k = 1; k <= 9; k++) {
    const ang = -Math.PI / 2 + (k % 9) * (2 * Math.PI / 9);
    const lx = cx + Math.cos(ang) * (r - 0.3), ly = cy + Math.sin(ang) * (r - 0.3);
    const hot = o.highlight && o.highlight.includes(k);
    if (hot) slide.addShape(pres.ShapeType.ellipse, { x: lx - 0.2, y: ly - 0.2, w: 0.4, h: 0.4, fill: { color: col.yellow }, line: { color: col.yellow, width: 0 }, objectName: "clock-hot" });
    slide.addText(String(k), { x: lx - 0.2, y: ly - 0.2, w: 0.4, h: 0.4, fontSize: 13, bold: true, color: hot ? col.board : stroke, align: "center", valign: "middle", isTextBox: true, margin: 0, objectName: "clock-label" });
    // tick
    const tx1 = cx + Math.cos(ang) * r, ty1 = cy + Math.sin(ang) * r;
    const tx2 = cx + Math.cos(ang) * (r - 0.1), ty2 = cy + Math.sin(ang) * (r - 0.1);
    slide.addShape(pres.ShapeType.line, { x: Math.min(tx1, tx2), y: Math.min(ty1, ty2), w: Math.abs(tx1 - tx2) || 0.001, h: Math.abs(ty1 - ty2) || 0.001, flipH: (tx1 - tx2) * (ty1 - ty2) < 0, line: { color: stroke, width: 1.5 }, objectName: "tick" });
  }
  // hand pointing at `hand`
  if (o.hand) {
    const ang = -Math.PI / 2 + (o.hand % 9) * (2 * Math.PI / 9);
    const hx = cx + Math.cos(ang) * (r - 0.5), hy = cy + Math.sin(ang) * (r - 0.5);
    slide.addShape(pres.ShapeType.line, { x: Math.min(cx, hx), y: Math.min(cy, hy), w: Math.abs(cx - hx) || 0.001, h: Math.abs(cy - hy) || 0.001, flipH: (hx - cx) * (hy - cy) < 0 ? true : false, line: { color: col.yellow, width: 3, endArrowType: "triangle" }, objectName: "hand" });
    slide.addShape(pres.ShapeType.ellipse, { x: cx - 0.06, y: cy - 0.06, w: 0.12, h: 0.12, fill: { color: col.yellow }, line: { color: col.yellow, width: 0 }, objectName: "pivot" });
  }
}

// Cycle of remainders drawn on a circle with arrows between consecutive items.
function cycle(slide, pres, col, cx, cy, r, items, o = {}) {
  const dark = o.dark !== false;
  const stroke = dark ? col.chalk : col.board;
  const n = items.length;
  const pts = items.map((_, i) => {
    const ang = -Math.PI / 2 + i * (2 * Math.PI / n);
    return { x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r };
  });
  const R = o.nodeR || 0.27;
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[(i + 1) % n];
    const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    const x1 = a.x + ux * (R + 0.05), y1 = a.y + uy * (R + 0.05), x2 = b.x - ux * (R + 0.05), y2 = b.y - uy * (R + 0.05);
    slide.addShape(pres.ShapeType.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1) || 0.001, h: Math.abs(y2 - y1) || 0.001, flipH: x2 < x1, flipV: y2 < y1, line: { color: o.arrow || stroke, width: 1.75, endArrowType: "triangle" }, objectName: "arrow" });
  }
  pts.forEach((p, i) => {
    const it = items[i];
    const hot = it.hot;
    slide.addShape(pres.ShapeType.ellipse, { x: p.x - R, y: p.y - R, w: 2 * R, h: 2 * R, fill: { color: hot ? col.yellow : (dark ? col.board : col.paper) }, line: { color: hot ? col.yellow : stroke, width: 2 }, objectName: "node" });
    slide.addText(it.label, { x: p.x - R, y: p.y - R, w: 2 * R, h: 2 * R, fontSize: it.size || 14, bold: true, color: hot ? col.board : stroke, align: "center", valign: "middle", isTextBox: true, margin: 0, objectName: "node-label" });
    if (it.note) slide.addText(it.note, { x: p.x - 0.9, y: p.y + (p.y >= cy ? R + 0.02 : -R - 0.3), w: 1.8, h: 0.28, fontSize: 10, color: dark ? col.mutedChalk : col.mutedInk, align: "center", valign: "middle", isTextBox: true, margin: 0, objectName: "node-note" });
  });
}

// Digits with alternating signs:   6  −2  +0  −2  (right to left)
function signChain(slide, pres, col, digits, o) {
  // digits: array as written left→right; signs assigned from the right: + − + −
  const n = digits.length, size = o.size || 26, cell = o.cell || 0.62, gap = o.gap || 0.12;
  let x = o.x;
  const dark = o.dark !== false;
  const ink = dark ? col.chalk : col.ink;
  digits.forEach((d, i) => {
    const fromRight = n - 1 - i;
    const plus = fromRight % 2 === 0;
    const fill = plus ? col.yellow : col.pink;
    slide.addText(String(d), { x, y: o.y, w: cell, h: cell, fontSize: size, bold: true, color: ink, align: "center", valign: "middle", isTextBox: true, margin: 0, fontFace: "Cambria", objectName: "digit" });
    slide.addShape(pres.ShapeType.ellipse, { x: x + cell / 2 - 0.15, y: o.y + cell + 0.06, w: 0.3, h: 0.3, fill: { color: fill }, line: { color: fill, width: 0 }, objectName: "sign" });
    slide.addText(plus ? "+" : "−", { x: x + cell / 2 - 0.15, y: o.y + cell + 0.06, w: 0.3, h: 0.3, fontSize: 14, bold: true, color: col.board, align: "center", valign: "middle", isTextBox: true, margin: 0, objectName: "sign-label" });
    if (o.powers) slide.addText(resolve(runs(o.powers[i], { fontSize: 11, color: dark ? col.mutedChalk : col.mutedInk }), col), { x: x - 0.15, y: o.y - 0.32, w: cell + 0.3, h: 0.3, align: "center", valign: "middle", isTextBox: true, margin: 0, objectName: "power" });
    x += cell + gap;
  });
  return x - gap;
}

// Simple tag/pill with text.
function pill(slide, pres, col, text, o) {
  const fill = o.fill || col.yellow;
  slide.addShape(pres.ShapeType.roundRect, { x: o.x, y: o.y, w: o.w, h: o.h, fill: { color: fill }, line: { color: fill, width: 0 }, rectRadius: o.r == null ? 0.12 : o.r, objectName: "pill" });
  const rs = resolve(runs(text, { fontSize: o.size || 14, bold: o.bold !== false, color: o.color || col.board }), col);
  slide.addText(rs, { x: o.x, y: o.y, w: o.w, h: o.h, align: o.align || "center", valign: "middle", isTextBox: true, margin: o.margin == null ? 0.05 : o.margin, objectName: "pill-text" });
}

// Thin hand-drawn-ish underline free: we use a soft box behind a formula instead.
function formulaBox(slide, pres, col, str, o) {
  const dark = o.dark !== false;
  const fill = o.fill || (dark ? "2A4A3C" : "EEF4F0");
  slide.addShape(pres.ShapeType.roundRect, { x: o.x, y: o.y, w: o.w, h: o.h, fill: { color: fill }, line: { color: fill, width: 0 }, rectRadius: 0.1, objectName: "formula-bg" });
  const rs = resolve(runs(str, { fontSize: o.size || 20, color: o.color || (dark ? col.chalk : col.ink), bold: !!o.bold }), col);
  slide.addText(rs, { x: o.x, y: o.y, w: o.w, h: o.h, align: o.align || "center", valign: "middle", isTextBox: true, margin: 0.08, fontFace: "Cambria", objectName: "formula" });
}

// Table with bilingual header support. rows: array of arrays of strings (markup allowed in cells is NOT supported; plain text)
function table(slide, col, rows, o) {
  const dark = o.dark !== false;
  const ink = dark ? col.chalk : col.ink;
  const headFill = dark ? "2A4A3C" : "E6EFE9";
  const data = rows.map((r, ri) => r.map((c, ci) => ({
    text: enOnly(c),
    options: {
      fontSize: ri === 0 ? (o.headSize || 12) : (o.size || 12),
      bold: ri === 0 || (o.boldCol != null && ci === o.boldCol),
      color: ri === 0 ? (dark ? col.yellow : col.board) : ink,
      fill: { color: ri === 0 ? headFill : (dark ? col.board : col.paper) },
      align: o.align ? o.align[ci] : (ci === 0 ? "left" : "center"),
      valign: "middle",
      margin: [0.03, 0.06, 0.03, 0.06],
    },
  })));
  slide.addTable(data, { x: o.x, y: o.y, w: o.w, h: o.h, colW: o.colW, rowH: o.rowH, border: { type: "solid", pt: 0.75, color: dark ? "3E6652" : "C9D6CE" }, objectName: o.name || "table", fontFace: "Calibri" });
}

// Slide title: English, with the Chinese subtitle only in bilingual mode.
function title(slide, col, en, zh, dark = true) {
  const parts = [{ text: en, options: {} }];
  if (LANG !== "en" && zh) parts.push({ text: "  " + zh, options: { fontSize: 17, color: dark ? col.mutedChalk : col.mutedInk, bold: false } });
  slide.addText(parts, { placeholder: "title" });
}

// After writing: give every shape the name PowerPoint itself would use ("TextBox 4", "Oval 7", ...)
// and give the layouts plain names, so the file looks like an ordinary PowerPoint deck.
async function finalize(file) {
  const fs = require("fs");
  const JSZip = require("jszip");
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const layoutNames = { DEFAULT: "Blank", BOARD: "Dark", PAPER: "Light", BOARD_HERO: "Dark Title", PAPER_HERO: "Light Title" };
  const renameLayouts = (x) => x.replace(/(<p:cSld name="|<vt:lpstr>)(DEFAULT|BOARD|PAPER|BOARD_HERO|PAPER_HERO)(">|<\/vt:lpstr>)/g, (m, a, n, b) => a + layoutNames[n] + b);
  for (const p of Object.keys(zip.files)) {
    if (/^ppt\/slideLayouts\/slideLayout\d+\.xml$/.test(p) || p === "docProps/app.xml") {
      zip.file(p, renameLayouts(await zip.file(p).async("string")));
    } else if (/^ppt\/slides\/slide\d+\.xml$/.test(p)) {
      let x = await zip.file(p).async("string");
      x = x.replace(/<(p:sp|p:cxnSp|p:graphicFrame)>([\s\S]*?)<\/\1>/g, (m, tag, body) => {
        const id = body.match(/<p:cNvPr id="(\d+)"/);
        if (!id) return m;
        const ph = body.match(/<p:ph[^>]*type="(\w+)"/);
        let kind;
        if (tag === "p:graphicFrame") kind = "Table";
        else if (ph) kind = ph[1] === "title" ? "Title" : ph[1] === "sldNum" ? "Slide Number Placeholder" : "Text Placeholder";
        else if (/txBox="1"/.test(body)) kind = "TextBox";
        else {
          const g = (body.match(/prst="(\w+)"/) || [])[1];
          kind = { ellipse: "Oval", roundRect: "Rounded Rectangle", rect: "Rectangle" }[g]
            || (g === "line" ? (/tailEnd|headEnd/.test(body) ? "Straight Arrow Connector" : "Straight Connector") : "Freeform");
        }
        return m.replace(/(<p:cNvPr id="\d+" name=")[^"]*"/, `$1${kind} ${Number(id[1]) - 1}"`);
      });
      zip.file(p, x);
    }
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

module.exports = { finalize, LANG, enOnly, title, THEME, newPres, runs, resolve, bi, txt, blocks, clock9, cycle, signChain, pill, formulaBox, table };
