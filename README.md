# Numbers That Talk · 数字会说话

**Divisibility shortcut rules and the modular arithmetic behind them**
**整除速判规则背后的模运算**

MATH 5248 final mini project · Fall 2026 · Zhiheng Li & Yueran

> If you know what 10 is mod *d*, you can build a divisibility rule for *d* yourself. Fermat's little theorem says the rule exists; the order of 10 mod *d* says how short the additive block can be, and that number is also the period of 1/*d*.
>
> 只要知道 10 模 d 等于几，就能自己造出 d 的整除规则；费马小定理保证规则存在，10 的阶决定最短的相加组长，它也等于 1/d 的循环节长度。

## What is in here · 文件说明

| Path | What | 说明 |
|---|---|---|
| [`slides/presentation.pptx`](slides/presentation.pptx) | 10 slides for the in-class talk (5 per person, 5 min each). English with Chinese under each line; speaker notes hold the English script. | 课上展示版，每人 5 页，中英并列，备注里有英文讲稿 |
| [`slides/full.pptx`](slides/full.pptx) | 22-slide full version: proofs, every example, the theorem map, references. This is the "product". | 完整版，作为作品提交，可脱离讲解独立阅读 |
| [`script/presentation_script.md`](script/presentation_script.md) | Spoken script for every slide, English and Chinese, with timing, stage directions, backup numbers for the two tricks, and likely Q&A. | 逐页演讲稿（中英）、计时、魔术备用数字、问答准备 |
| [`plan/`](plan/) | The original project plan (HTML + PDF). | 原始项目方案 |
| [`verify/check_examples.py`](verify/check_examples.py) | Checks every number used in the slides (factorizations, orders, remainders of 2026, Midy, ISBN, and an exhaustive test of the vanishing-digit trick). | 核对脚本：所有例子逐一验算 |
| [`build/`](build/) | Scripts that generate both decks and the script file. | 生成 PPT 和讲稿的脚本 |

## The talk in one minute · 一分钟版

1. **10 ≡ 1 (mod 9)** → add the digits. On a clock with only 9 marks, 10 steps and 1 step land on the same mark. The "vanishing digit" trick is this fact in disguise.
2. **100 ≡ 1 (mod 99), 1000 ≡ 1 (mod 999 = 27 × 37)** → add 2- or 3-digit blocks. 45658 → 45 + 658 = 703 = 19 × 37.
3. **10 ≡ −1 (mod 11), 1000 ≡ −1 (mod 1001 = 7 × 11 × 13)** → alternate the blocks. The "1001 brings it back" trick: abcabc ÷ 7 ÷ 11 ÷ 13 = abc.
4. **Every prime p ≠ 2, 5 gets a rule** (Fermat: 10^(p−1) ≡ 1). The shortest additive block is ord_p(10), which is also the period of 1/p: 1/7 = 0.142857… has period 6 = ord₇(10).
5. Extras in the full deck: chop-the-last-digit rule for 7 (x − 2y), composite d (Euler, CRT), 2ᵏ and 5ᵏ, other bases, Midy's theorem, ISBN-10 check digits.

Everything is built on tools from class (congruences, inverses, Bézout, Euclid's lemma, CRT, Fermat, Euler, order, primitive roots); the block rules, the order/period connection and the two tricks are the new material.

## Rebuild · 重新生成

```bash
cd build
npm install                      # pptxgenjs
export PPTX_SKILL=/path/to/pptx-skill   # folder containing scripts/apply_theme.js
NODE_PATH=$PWD/node_modules node build_presentation.js
NODE_PATH=$PWD/node_modules node build_full.js
node build_script.js
python3 -I ../verify/check_examples.py
```

`build/theme.js` holds the colours, layouts and the hand-drawn diagrams (9-mark clock, digit blocks, remainder cycle, sign chain). `build/script_data.js` is the single source for the spoken script and the speaker notes.

## Timeline · 时间线

| Date | Item |
|---|---|
| 11/2 | Initial Thoughts survey |
| 11/20 | Project Plan survey (state: presentation deck + full deck as the product) |
| 11/20 – 12/6 | Rehearsal 1 with both tricks, timed |
| 12/6 – 12/13 | Rehearsals 2–3; re-run `verify/check_examples.py` after any change to the examples |
| 12/13 | Submit both decks |
| 12/21 | "What I learned" survey |
