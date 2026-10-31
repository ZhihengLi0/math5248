# presentation/ — 10-minute class talk on divisibility rules (MATH 5248, December 2026)

Two speakers, five slides and five minutes each. The talk is built around two live tricks
and one example, the year 2026; the full deck is the written "product" that stands on its own.

| file | what |
|---|---|
| `PPT演讲版.pptx` / `PDF演讲版.pdf` | 10 slides, 16:9, English, speaker notes on every slide: Zhiheng 1–5 (10 ≡ 1 family, the vanishing-digit trick), Yueran 6–10 (10 ≡ −1 family, the 1001 trick, Fermat and the order of 10) |
| `PPT提交版.pptx` / `PDF提交版.pdf` | 22 slides, English, the product: proofs of every rule, all examples, the table of orders and periods, 142857 and Midy, composite d, chop-a-digit, 2ᵏ and 5ᵏ, ISBN-10, what we got wrong at first, theorem map, references |
| `演讲稿.md`, `演讲稿.pdf` | speaker script, Chinese and English side by side, with timing per slide, stage directions and backup numbers for the tricks, likely questions and a glossary |
| `演讲稿_英文.pdf` | the English-only script |

Slide flow (10 main): title and "is 2026 divisible by 9?" → trick 1, the vanishing digit →
why: a clock with only 9 marks (10 ≡ 1 mod 9) → bigger chunks, 99 and 999 = 27 × 37
(45658 → 45 + 658 = 703 = 19 × 37) → what about 7? → trick 2, abcabc ÷ 7 ÷ 11 ÷ 13 →
why: 1000 ≡ −1 mod 1001, alternating chunks (2026 → 026 − 2 = 24) → one idea, every rule
(10ᵏ ≡ ±1) → why every prime gets a rule: Fermat, the order of 10, the period of 1/7 →
one sentence and the GitHub link.

Every number on the slides was checked by `../source/verify/check_examples.py`.

Rebuild (from `../source/build/`):

```bash
NODE_PATH=$PWD/node_modules node build_presentation.js && NODE_PATH=$PWD/node_modules node build_full.js
node build_script.js && ./make_pdf.sh
```
