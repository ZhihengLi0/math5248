// Single source of truth for the spoken script.
// Used by build_presentation.js (speaker notes) and build_script.js (presentation/演讲稿.md).
// **bold** = said while pointing at the screen.  *italic* = private reminder, not read out.

const SPEAKERS = { A: "Zhiheng", B: "Yueran" };

const SLIDES = [
  {
    id: "A1", n: 1, speaker: "A", secs: 30, title: "Title: Numbers That Talk",
    zh: "大家好，我是 Zhiheng，这是 Yueran。大家手上应该都有一张 worksheet。先问个问题。今年是 2026。**2026 能被 9 整除吗？**把数字加起来：2、0、2、6，等于 10。不是 9 的倍数，所以不能。奇怪的是，10 除以 9 余 1，2026 也余 1。为什么？我们用一个魔术来找答案。",
    en: "Hi everyone. I'm Zhiheng, and this is Yueran. You should all have a worksheet. Quick question to start. This year is 2026. **Is 2026 divisible by 9?** Add the digits: 2, 0, 2, 6. That's 10. Not a multiple of 9, so no. But look: 10 leaves remainder 1, and so does 2026. Why? Let's find out with a trick.",
    hints: ["开讲前发好 worksheet。问完停 5 秒让大家在 warm-up 那行写。 / Hand out the worksheets before you start. After the question, wait 5 seconds so people can fill in the warm-up line."],
  },
  {
    id: "A2", n: 2, speaker: "A", secs: 90, title: "Magic trick 1: the vanishing digit",
    zh: "看 worksheet 第 1 个框。写一个四位数，别四个数字都一样。把数字打乱，写成一个新的数。大的减小的。写好了吗？好。**在答案里圈一个数字，不要圈 0。**别告诉我。谁愿意把剩下的数字念给我？顺序随便。……你圈的是 [答案]。对吧？再来一个人。……好。我不会读心术。是 9 在帮我。",
    en: "Look at box 1 on your worksheet. Write down a four-digit number. Just don't use the same digit four times. Now shuffle the digits and write the new number. Subtract the smaller one from the bigger one. Done? Good. **Circle one digit in your answer. Not a zero.** Keep it secret. Can someone read me the other digits? Any order. ... Your circled digit is [answer]. Right? One more person. ... OK. I'm not reading your mind. The number 9 is doing the work.",
    hints: [
      "大家写的时候停 20 秒，别催。 / Give people about 20 seconds to write. Don't rush them.",
      "心算念出来的数字之和，答案 = 补到下一个 9 的倍数还差几；和本身是 9 的倍数时答案是 9。 / Add the digits they read in your head. Answer = what is missing to reach the next multiple of 9. If the sum is already a multiple of 9, the answer is 9.",
      "备用：8317 → 1378 → 6939，藏 9，念 6、3、9，和 18，答 9。差为 0 说明打乱后和原数一样，请重打乱。 / Backup: 8317 → 1378 → 6939, hide a 9, hear 6, 3, 9, sum 18, answer 9. If someone gets 0, they shuffled into the same number. Ask them to shuffle again.",
    ],
  },
  {
    id: "A3", n: 3, speaker: "A", secs: 90, title: "A clock with only 9 marks",
    zh: "原理是这样。2026 是 2 个一千、0 个一百、2 个十，再加 6。**把每个拆开：1000 是 999 加 1，100 是 99 加 1，10 是 9 加 1。**把 999、99、9 那些放在一起，那一部分是 9 的倍数。剩下的就是 2 加 0 加 2 加 6，也就是数字和。所以 2026 和它的数字和，除以 9 余数一样。左边的钟也是这个意思：9 个刻度的钟上走 10 格，和走 1 格停在同一个地方。再看魔术。你的数和打乱后的数，数字一样，数字和一样，余数也一样。一减，余数就是 0。**所以答案的各位数字加起来一定是 9 的倍数。**你念了几个，我补上缺的那个。也因为这样不能圈 0：0 和 9 我分不出来。",
    en: "So how does it work? 2026 is 2 thousands, 0 hundreds, 2 tens and 6. **Now split each one. 1000 is 999 plus 1. 100 is 99 plus 1. 10 is 9 plus 1.** Put all the 999s, 99s and 9s together. That part is a multiple of 9. What's left is 2 plus 0 plus 2 plus 6. The digit sum. So 2026 and its digit sum have the same remainder mod 9. The clock says the same thing: on a clock with 9 marks, 10 steps land where 1 step lands. Now the trick. Your number and the shuffled one have the same digits. Same digit sum, same remainder. Subtract, and the remainder is zero. **So the digits of your answer always add up to a multiple of 9.** You told me all but one. I just filled the gap. That's also why no zeros: a zero and a nine would look the same to me.",
    hints: ["先指右边三行拆分，一行一行讲；最后用手指在钟上走 10 格。 / Point at the three lines on the right, one at a time. Then walk your finger 10 steps around the clock."],
  },
  {
    id: "A4", n: 4, speaker: "A", secs: 45, title: "What about 37?",
    zh: "同样的想法，步子大一点。1000 等于 999 加 1。所以在 999 的钟上，1000 就像 1。而 999 等于 27 乘 37。所以从右边三位一组切开，加起来就行。**45658。切成 45 和 658，加起来 703。703 等于 19 乘 37。**所以 37 整除 45658，不用长除法。记得从右边切。",
    en: "Same idea, bigger steps. 1000 is 999 plus 1. So on a 999-clock, 1000 acts like 1. And 999 is 27 times 37. So cut a number into three-digit chunks from the right and add them. **45658. Chunks 45 and 658. Add them: 703. And 703 is 19 times 37.** So 37 divides 45658. No long division. Just remember to cut from the right.",
  },
  {
    id: "A5", n: 5, speaker: "A", secs: 30, title: "What about 7?",
    zh: "到现在为止，每条规则都来自一件事：10 的某个次方等于 1。**但 999 是 27 乘 37，里面没有 7，也没有 13。**那 7 有没有规则？我一开始以为没有。后来发现还有第二类，在那一类里，10 的某个次方等于负 1。Yueran？",
    en: "So far every rule comes from one thing: a power of 10 acting like 1. **But 999 is 27 times 37. No 7. No 13.** So does 7 have a rule at all? I thought no. Turns out there's a second family, where a power of 10 acts like minus 1. Yueran?",
    hints: ["交接。Yueran 让大家把手机计算器打开。 / Hand over. Yueran asks everyone to open the calculator on their phone."],
  },
  {
    id: "B1", n: 6, speaker: "B", secs: 90, title: "Magic trick 2: 1001 brings it back",
    zh: "谢谢。看第 2 个框。写一个三位数。然后紧接着再写一遍，变成六位数，比如 572572。打开计算器，手机就行。**除以 7。**能整除，相信我。**再除以 11。****再除以 13。**得到什么？你原来的数回来了。每次都这样。谁愿意说一下自己的数？……为什么会这样？",
    en: "Thanks. Box 2 on your worksheet. Write a three-digit number. Now write it again right after, so you get six digits. Like 572572. Grab a calculator, your phone is fine. **Divide by 7.** It works, trust me. **Now divide that by 11.** **And divide by 13.** What did you get? Your number came back. Every time. Can someone tell me theirs? ... So why does this happen?",
    hints: [
      "大家按计算器时停 30 秒。 / Give people about 30 seconds on their calculators.",
      "572 → 572572 → ÷7 = 81796 → ÷11 = 7436 → ÷13 = 572。含 0 也行：205 → 205205 → 29315 → 2665 → 205。出小数说明输错了。 / 572 → 572572 → ÷7 = 81796 → ÷11 = 7436 → ÷13 = 572. Works with a zero: 205 → 205205 → 29315 → 2665 → 205. A decimal means a typo.",
    ],
  },
  {
    id: "B2", n: 7, speaker: "B", secs: 60, title: "Why trick 2 works",
    zh: "**把 abc 写两遍，就是 abc 乘 1000 再加 abc，也就是 abc 乘 1001。1001 等于 7 乘 11 乘 13。**所以除以 7、11、13，就是除以 1001。这就是魔术。但有用的是下面这点。1000 等于 1001 减 1。所以模 1001 的时候，1000 就是负 1。把一个数从右边三位一组切开，一加一减，就得到它模 7、11、13 的余数，一次三个。**试 2026。切成 2 和 026。26 减 2 等于 24。**24 除以 7 余 3，除以 13 余 11。都对。",
    en: "**Writing abc twice is abc times 1000, plus abc. That's abc times 1001. And 1001 is 7 times 11 times 13.** So dividing by 7, 11 and 13 is just dividing by 1001. That's the trick. Now the useful part. 1000 is 1001 minus 1. So mod 1001, 1000 acts like minus 1. Cut a number into three-digit chunks and alternate plus and minus. You get the remainder mod 7, 11 and 13, all at once. **Try 2026. Chunks 2 and 026. 26 minus 2 is 24.** 24 mod 7 is 3. 24 mod 13 is 11. Both right.",
  },
  {
    id: "B3", n: 8, speaker: "B", secs: 90, title: "Does every prime have a rule?",
    zh: "合起来看。**找一个 k，让 10 的 k 次方模 d 等于 1 或者负 1。**等于 1 就 k 位一组加起来，等于负 1 就一加一减。9 用 k 等于 1，37 用 3，7 和 13 用 3 再加负号。是不是每个数都有这样的 k？**费马小定理说：除了 2 和 5，每个素数都有。10 的 p 减 1 次方模 p 等于 1。**最短的那个 k 叫 10 模 p 的阶。最让我们意外的是：这个数正好是 1/p 循环几位。**1/7 等于 0.142857 循环，6 位。10 模 7 的阶也是 6。**看 1 除以 7 的余数：1、3、2、6、4、5，然后回到 1。这些就是 10 的各次方模 7。6 步，6 位。顺便一提，142857 乘 2 是 285714，同一串数字，转了一圈。",
    en: "Let's put it together. **Find a k so that 10 to the k is 1 or minus 1 mod d.** If it's 1, add k-digit chunks. If it's minus 1, alternate them. 9 uses k equals 1. 37 uses 3. 7 and 13 use 3, with the minus. Does every number have a k? **Fermat's little theorem says yes, for every prime except 2 and 5: 10 to the p minus 1 is 1 mod p.** The shortest k is called the order of 10 mod p. The part that surprised us most: that same number is how long 1 over p repeats. **1 over 7 is 0.142857, repeating. Six digits. The order of 10 mod 7 is also 6.** Look at the remainders when you divide 1 by 7: 1, 3, 2, 6, 4, 5, then back to 1. Those are the powers of 10 mod 7. Six steps, six digits. Bonus: 142857 times 2 is 285714. Same digits, just rotated.",
    hints: ["用手指沿余数圈走一遍：1 → 3 → 2 → 6 → 4 → 5。 / Trace the remainder cycle with your finger: 1 → 3 → 2 → 6 → 4 → 5."],
  },
  {
    id: "B4", n: 9, speaker: "B", secs: 30, title: "One sentence",
    zh: "一句话：**只要知道 10 模 d 等于几，你就能自己造出 d 的整除规则。**证明都在 worksheet 背面。还有更多，比如 7 的快速规则、ISBN 为什么用 11，下课可以来问我们。谢谢！回去找个朋友试试 1001 魔术。",
    en: "One sentence. **If you know what 10 is mod d, you can build the rule for d yourself.** The proofs are on the back of your worksheet. There's more, like a quick rule for 7 and why ISBN numbers use 11. Ask us after class. Thanks! Go try the 1001 trick on a friend.",
  },
];
const QA = [
  { zh: "和讲 3、7、9、11 规则的同学有什么不同？", en: "How is this different from the talk on the rules for 3, 7, 9 and 11?",
    azh: "那些规则我们只用来开头。我们关心的是：为什么每个和 10 互素的数都有规则，最短能多短，以及这个长度为什么正好是 1/p 的循环节。",
    aen: "We only use those rules as a warm-up. Our question is why every number coprime to 10 has a rule, how short it can be, and why that length is exactly the period of 1 over p." },
  { zh: "为什么 2 和 5 没有数字和规则？", en: "Why don't 2 and 5 have a digit-sum rule?",
    azh: "因为 10 模 2、模 5 都是 0。10 不是单位，没有阶。但正因为 10 ≡ 0，只看末几位就够了。",
    aen: "Because 10 is 0 mod 2 and mod 5. 10 is not a unit there, so it has no order. But 10 being 0 is exactly why the last digit, or the last k digits, is enough." },
  { zh: "每个数都有规则吗？", en: "Does every number have a rule?",
    azh: "和 10 互素的 d 都有，欧拉定理给出 10^φ(d) ≡ 1。一般的 d 拆成 2 的幂、5 的幂和与 10 互素的部分，分别判断。",
    aen: "Every d coprime to 10 does; Euler gives 10 to the phi of d is 1. A general d splits into a power of 2, a power of 5 and a part coprime to 10. Test each part on its own." },
  { zh: "7 有更实用的规则吗？", en: "Is there a shorter rule for 7?",
    azh: "有，砍个位法：去掉个位 y，算 x − 2y，反复做。2026 → 202 − 12 = 190 → 19，不是 7 的倍数。用到 10 模 7 的逆元 5 ≡ −2。只保留能否整除，余数会变。",
    aen: "Yes. Chop the last digit y and compute x minus 2y, repeat. 2026 goes to 202 minus 12, that is 190, then 19, not a multiple of 7. It uses the inverse of 10 mod 7, which is 5, or minus 2. It only keeps yes or no, not the remainder." },
  { zh: "交错和能从左边算起吗？", en: "Can I start the alternating sum from the left?",
    azh: "只判断整除可以；要算余数不行，位数是偶数时符号会反。2026 从左算得 −2 ≡ 9，真实余数是 2。",
    aen: "For yes or no, yes. For the remainder, no: with an even number of digits the sign flips. 2026 from the left gives minus 2, which is 9, but the remainder is 2." },
  { zh: "为什么 1/7 循环 6 位，1/37 只循环 3 位？", en: "Why does 1/7 repeat every 6 digits but 1/37 every 3?",
    azh: "循环节长度 = 10 模 d 的阶。10 模 7 的阶是 6，模 37 的阶是 3，因为 999 = 27 × 37。",
    aen: "The period of 1 over d is the order of 10 mod d. The order mod 7 is 6; mod 37 it is 3, because 999 is 27 times 37." },
  { zh: "魔术会失败吗？", en: "Can the tricks fail?",
    azh: "魔术 A 只在观众圈了 0（0 和 9 分不出来）或打乱后和原数一样时会出问题；魔术 B 不会失败。",
    aen: "Trick A fails only if someone circles a 0, since 0 and 9 look the same, or shuffles into the same number. Trick B cannot fail." },
  { zh: "和密码学有什么关系？", en: "How is this related to cryptography?",
    azh: "阶和原根正是 Diffie–Hellman 和 ElGamal 的核心；校验码（ISBN-10 用模 11）是整除规则的实际应用。",
    aen: "The order of an element and primitive roots are the core of Diffie-Hellman and ElGamal. Check digits, like ISBN-10 with mod 11, are divisibility rules used in practice." },
  { zh: "为什么分组要从个位开始？", en: "Why chunk from the right?",
    azh: "因为 n = B₀ + B₁·10ᵏ + B₂·10²ᵏ + …，B₀ 必须是最低的 k 位。",
    aen: "Because n is B zero plus B one times 10 to the k plus B two times 10 to the 2k and so on. B zero has to be the lowest k digits." },
];

const GLOSSARY = [
  "a ≡ b (mod m)：m 整除 a − b；对加法、乘法、乘方都保持。",
  "S(n)：n 的各位数字之和。数字和定理：n ≡ S(n) (mod 9)。",
  "交错和：从个位起 d₀ − d₁ + d₂ − …，模 11 与 n 同余。",
  "k 位一组 Bⱼ：从个位起每 k 位切一段；10ᵏ ≡ 1 时相加，10ᵏ ≡ −1 时交错。",
  "99 = 9 × 11；999 = 27 × 37；1001 = 7 × 11 × 13；99999 = 9 × 41 × 271。",
  "ord_d(10)：使 10ᵏ ≡ 1 (mod d) 的最小正整数 k；= 1/d 的循环节长度；整除 φ(d)。",
  "费马小定理：p 素数、p ∤ a ⇒ a^(p−1) ≡ 1 (mod p)。欧拉定理：gcd(a, m) = 1 ⇒ a^φ(m) ≡ 1 (mod m)。",
  "原根：阶等于 φ(m) 的元素；10 是模 7 的原根，所以 142857 是循环数。",
  "砍个位法：m = 10⁻¹ (mod d)，d | 10x + y ⟺ d | x + m·y；7 用 x − 2y，13 用 x + 4y。",
  "2026 = 2 × 1013（1013 素数）：mod 9 → 1，mod 11 → 2，mod 7 → 3，mod 13 → 11，mod 37 → 28。",
];

module.exports = { SPEAKERS, SLIDES, QA, GLOSSARY };
