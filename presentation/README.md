# presentation/ · 10-minute class talk on divisibility rules (MATH 5248, December 2026)

Two speakers. One principle gone through fully (10 ≡ 1 mod 9, so a number is congruent to its
digit sum); everything else is shown as a result and pointed to the worksheet and the full deck.
The class follows along on a two-page worksheet; the worksheet is the submitted product.

| file | what |
|---|---|
| `Worksheet提交版.pdf` | **the product.** 2 pages, Letter. Page 1: a warm-up and the two tricks with blanks to fill in during the talk, plus three "try it after" questions. Page 2: why it works, the block theorem, existence via Fermat and Euler, order = period of 1/p, 142857 and Midy, references |
| `PPT演讲版.pptx` / `PDF演讲版.pdf` | 9 slides, 16:9, English, speaker notes on every slide. Zhiheng 1–5 (warm-up, trick 1, the 9-mark clock, 999 = 27 × 37, "what about 7?"), Yueran 6–9 (trick 2, 1000 ≡ −1, Fermat and the order of 10, one sentence) |
| `PPT完整版.pptx` / `PDF完整版.pdf` | 22 slides, English: every proof and example, composite d, chop-a-digit, 2ᵏ and 5ᵏ, ISBN-10, what we got wrong at first, theorem map. Linked from the worksheet; not presented |
| `演讲稿.md`, `演讲稿.pdf` | speaker script, Chinese and English side by side, with timing per slide, stage directions, backup numbers for the tricks, likely questions and a glossary |
| `演讲稿_英文.pdf` | the English-only script |

Timing (seconds): 1 title 30 · 2 trick 1 90 · 3 clock 90 · 4 bigger chunks 45 · 5 what about 7 30 ·
6 trick 2 90 · 7 why 60 · 8 one idea, every prime 90 · 9 one sentence 30 → 555 s, leaving about
45 s for the tricks to run long.

Every number on the slides and the worksheet was checked by `../source/verify/check_examples.py`.

Rebuild (from `../source/build/`):

```bash
NODE_PATH=$PWD/node_modules node build_presentation.js && NODE_PATH=$PWD/node_modules node build_full.js
node build_script.js && ./make_pdf.sh
```
