# Numbers That Talk · 数字会说话

**Divisibility shortcut rules and the modular arithmetic behind them**
**整除速判规则背后的模运算**

MATH 5248 final mini project · Fall 2026 · Zhiheng Li & Yueran

> If you know what 10 is mod *d*, you can build a divisibility rule for *d* yourself. Fermat's little theorem says the rule exists; the order of 10 mod *d* says how short the additive block can be, and that number is also the period of 1/*d*.
>
> 只要知道 10 模 d 等于几，就能自己造出 d 的整除规则；费马小定理保证规则存在，10 的阶决定最短的相加组长，它也等于 1/d 的循环节长度。

## What is in here · 文件说明

Two folders: **`presentation/`** is what we hand in and use in class; **`source/`** is everything used to make it.

| Path | What | 说明 |
|---|---|---|
| [`presentation/Worksheet提交版.pdf`](presentation/Worksheet提交版.pdf) | **The product.** Two-page worksheet handed out in class: page 1 the two tricks with blanks, page 2 the principles, theorems and proofs. | 提交的作品：两页 worksheet，第 1 页课上跟着做，第 2 页原理和证明 |
| [`presentation/PPT演讲版.pptx`](presentation/PPT演讲版.pptx) / [`PDF演讲版.pdf`](presentation/PDF演讲版.pdf) | 9 slides for the in-class talk (Zhiheng 1–5, Yueran 6–9, 555 s), English. Speaker notes hold the English script. | 课上演讲版，9 页，全英文 |
| [`presentation/PPT完整版.pptx`](presentation/PPT完整版.pptx) / [`PDF完整版.pdf`](presentation/PDF完整版.pdf) | 22-slide full version: every proof and example, the theorem map, references. Linked from the worksheet. | 完整版，所有证明和例子，worksheet 上给链接 |
| [`presentation/演讲稿.md`](presentation/演讲稿.md) / [`演讲稿.pdf`](presentation/演讲稿.pdf) / [`演讲稿_英文.pdf`](presentation/演讲稿_英文.pdf) | Speaker script in the same layout as the SNOLAB talks: per slide 中文 then English, timing, stage directions, backup numbers for the tricks, likely questions, glossary. `演讲稿_英文.pdf` is English only. | 演讲稿（每页先中文后英文），计时、魔术备用数字、问答、术语表 |
| [`source/plan/`](source/plan/) | The original project plan (HTML + PDF). | 原始项目方案 |
| [`source/verify/check_examples.py`](source/verify/check_examples.py) | Checks every number used in the slides (factorizations, orders, remainders of 2026, Midy, ISBN, and an exhaustive test of the vanishing-digit trick). | 核对脚本：所有例子逐一验算 |
| [`source/build/`](source/build/) | Scripts that generate both decks, the script and the PDFs (`make_pdf.sh`). | 生成 PPT、讲稿和 PDF 的脚本 |

## The talk in one minute · 一分钟版

1. **10 ≡ 1 (mod 9)** → add the digits. On a clock with only 9 marks, 10 steps and 1 step land on the same mark. The "vanishing digit" trick is this fact in disguise.
2. **100 ≡ 1 (mod 99), 1000 ≡ 1 (mod 999 = 27 × 37)** → add 2- or 3-digit blocks. 45658 → 45 + 658 = 703 = 19 × 37.
3. **10 ≡ −1 (mod 11), 1000 ≡ −1 (mod 1001 = 7 × 11 × 13)** → alternate the blocks. The "1001 brings it back" trick: abcabc ÷ 7 ÷ 11 ÷ 13 = abc.
4. **Every prime p ≠ 2, 5 gets a rule** (Fermat: 10^(p−1) ≡ 1). The shortest additive block is ord_p(10), which is also the period of 1/p: 1/7 = 0.142857… has period 6 = ord₇(10).
5. Extras in the full deck: chop-the-last-digit rule for 7 (x − 2y), composite d (Euler, CRT), 2ᵏ and 5ᵏ, other bases, Midy's theorem, ISBN-10 check digits.

Everything is built on tools from class (congruences, inverses, Bézout, Euclid's lemma, CRT, Fermat, Euler, order, primitive roots); the block rules, the order/period connection and the two tricks are the new material.

## Rebuild · 重新生成

```bash
cd source/build
npm install                      # pptxgenjs
export PPTX_SKILL=/path/to/pptx-skill   # folder containing scripts/apply_theme.js
NODE_PATH=$PWD/node_modules node build_presentation.js   # SLIDE_LANG=bi for English + Chinese on each slide
NODE_PATH=$PWD/node_modules node build_full.js
node build_script.js             # presentation/演讲稿.md
./make_pdf.sh                    # deck PDFs via LibreOffice; worksheet and script PDFs via headless Chrome
python3 -I ../verify/check_examples.py
```

`source/build/build_worksheet.js` writes the worksheet. `source/build/theme.js` holds the colours, layouts and the hand-drawn diagrams (9-mark clock, digit blocks, remainder cycle, sign chain). `source/build/script_data.js` is the single source for the spoken script and the speaker notes. `build_speech_pdf.py` is the same renderer used for the SNOLAB speech scripts. The deck PDFs are rendered by LibreOffice, so fonts differ slightly from PowerPoint; the `.pptx` files are the originals.

## Timeline · 时间线

| Date | Item |
|---|---|
| 11/2 | Initial Thoughts survey |
| 11/20 | Project Plan survey (product: the two-page worksheet; full deck on GitHub) |
| 11/20 – 12/6 | Rehearsal 1 with both tricks, timed |
| 12/6 – 12/13 | Rehearsals 2–3; re-run `source/verify/check_examples.py` after any change to the examples |
| 12/13 | Submit the worksheet and the slides |
| 12/21 | "What I learned" survey |
