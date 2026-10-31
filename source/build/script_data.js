// Single source of truth for the spoken script.
// Used by build_presentation.js (speaker notes) and build_script.js (script/presentation_script.md).

const SPEAKERS = { A: "Zhiheng", B: "Yueran" };

const SLIDES = [
  {
    id: "A1", speaker: "A", time: "0:00 – 0:30", title: "Numbers That Talk / 数字会说话",
    en: `Hi everyone. I'm Zhiheng, and this is Yueran. Our project is about divisibility rules. You know the kind: "add up the digits to check for 3."
Quick question. This year is 2026. Is 2026 divisible by 9? Don't reach for your phone. 2 plus 0 plus 2 plus 6 is 10. Not a multiple of 9, so no. And 10 leaves remainder 1. So does 2026.
Everyone knows this trick. Almost nobody knows why it works. In ten minutes you will. But first, a magic trick.`,
    zh: `大家好，我是 Zhiheng，这位是 Yueran。我们的项目是整除速判规则，就是"把各位数字加起来看能不能被 3 整除"那种。
先问一个问题。今年是 2026 年，2026 能被 9 整除吗？别掏手机。2 加 0 加 2 加 6 等于 10，不是 9 的倍数，所以不能。而且 10 除以 9 余 1，2026 也余 1。
这个技巧人人都会，但几乎没人知道为什么。十分钟后你们就知道了。不过先来一个魔术。`,
    actions: ["[Click to show the question. Give the class 5 seconds to add.]", "[点击出现问题，留 5 秒让大家加。]"],
  },
  {
    id: "A2", speaker: "A", time: "0:30 – 1:45", title: "The vanishing digit / 消失的数字",
    en: `Everyone, pick a four-digit number. Any number. Just don't use the same digit four times. Don't tell me.
Now shuffle the digits. Make a new number out of the same digits.
Subtract the smaller one from the bigger one. Got a result? Good.
Now circle one digit in your result. Not a zero. Circle something that isn't zero. Hide it.
I need one volunteer. Read me the other digits, in any order.
Your hidden digit is... [answer]. Right?
Let's do one more with someone else.
I'm not reading minds. The number 9 is doing all the work. Let me show you.`,
    zh: `每个人想一个四位数，随便什么数，只要不是四个数字都一样。别告诉我。
把这几个数字打乱顺序，拼成一个新的数。
大的减小的。算出来了吗？好。
在结果里圈一个数字，不要圈 0，圈一个不是 0 的，把它藏起来。
我需要一位同学，把剩下的数字念给我，什么顺序都行。
你藏的数字是……[答案]。对吧？
再找一位同学来一次。
我不会读心术，是 9 在干活。我来解释。`,
    actions: [
      "[Add the digits they read in your head. Answer = what's missing to reach the next multiple of 9. If their sum is already a multiple of 9, the answer is 9.]",
      "[心算他们念的数字之和，答案 = 补到下一个 9 的倍数还差几。和本身是 9 的倍数时答案是 9。]",
    ],
    backup: [
      "Example on slide: 5274 → 7425 → 7425 − 5274 = 2151. Hide 5, they read 2, 1, 1 → sum 4 → answer 5.",
      "Backup: 8317 → 1378 → 6939. Hide a 9, they read 6, 3, 9 → sum 18 → answer 9.",
      "Faster 3-digit version: 831 → 138 → 693.",
      "If they say the difference is 0: they shuffled into the same number. Ask them to shuffle again.",
    ],
  },
  {
    id: "A3", speaker: "A", time: "1:45 – 3:00", title: "A clock with 9 marks / 只有 9 个刻度的钟",
    en: `Here's the secret. Take 2026. It's really 2 thousands, 0 hundreds, 2 tens, and 6.
Now look at this clock. It only has 9 marks. Start at the top and walk 10 steps. You end up one mark past the start. Same as walking 1 step.
A hundred steps? Still one mark. A thousand? Still one.
So on this clock, 2026 is just 2 plus 0 plus 2 plus 6. That's all "10 is congruent to 1 mod 9" means.
Now the trick. Your number and your shuffled number have the same digits. So they land on the same mark. Subtract them, and you land on the top. That's zero.
So the digits of your result add up to a multiple of 9. You read me all but one. I just fill in what's missing.`,
    zh: `秘密在这里。拿 2026 来说，它其实是 2 个一千、0 个一百、2 个十，再加 6。
看这个钟，它只有 9 个刻度。从顶上出发走 10 格，你会停在起点的下一格，和走 1 格一样。
走 100 格呢？还是下一格。1000 格？还是。
所以在这个钟上，2026 就等于 2 加 0 加 2 加 6。"10 模 9 同余于 1"说的就是这件事。
再看魔术。你的数和打乱后的数，数字一样，所以停在同一个刻度上。一减，就回到顶上，也就是 0。
所以结果的各位数字加起来是 9 的倍数。你念了其中几个，我只是把缺的补上。`,
    actions: ["[Point at the clock. Walk your finger 10 steps once, slowly.]", "[指着钟，用手指慢慢走 10 格一次。]"],
  },
  {
    id: "A4", speaker: "A", time: "3:00 – 4:15", title: "Bigger chunks: 99 and 999 / 两位一组、三位一组",
    en: `Why stop at single digits?
100 is 99 plus 1. So on a 99-clock, 100 acts like 1. That means: cut your number into two-digit chunks, add the chunks, and you get the remainder mod 99. And mod 11 and 33, for free.
Now try 1000. That's 999 plus 1. And 999 is 27 times 37. So three-digit chunks test 27 and 37.
Here's one: 45658. Chunk it from the right: 45 and 658. Add them: 703. And 703 is 19 times 37. So 37 divides 45658. No long division. We checked. It's 37 times 1234.
One warning. Always chunk from the right. 45 | 658, not 456 | 58. The chunks are the "digits" when you write the number in base 1000.`,
    zh: `为什么只看一位数呢？
100 等于 99 加 1。所以在 99 的钟上，100 就像 1 一样。也就是说，把数两位两位地切开，把每一段加起来，就得到它除以 99 的余数。顺便也能判断 11 和 33。
再看 1000，它是 999 加 1。而 999 等于 27 乘 37。所以三位一组能判断 27 和 37。
举个例子：45658。从右边切：45 和 658。加起来是 703。703 等于 19 乘 37，所以 45658 能被 37 整除。不用长除法。我们验算过，它是 37 乘 1234。
提醒一句：一定要从右边开始切。是 45 | 658，不是 456 | 58。这些段就是这个数在"千进制"下的各位数字。`,
  },
  {
    id: "A5", speaker: "A", time: "4:15 – 5:00", title: "What about 7? / 那 7 呢？",
    en: `So the whole family of rules comes from one fact: some power of 10 acts like 1. 10 for 9. 100 for 99. 1000 for 999.
But look what's missing. 7. 13. 999 is 27 times 37. No 7, no 13.
Does 7 even have a rule? When we started, I thought no.
Turns out there's a second family. In that family a power of 10 acts like minus 1.
Yueran will show you. With a trick that needs three of your calculators.`,
    zh: `所以这一整类规则都来自一件事：10 的某个次方等于 1。9 用 10，99 用 100，999 用 1000。
但是缺了谁？7 和 13。999 等于 27 乘 37，里面没有 7，也没有 13。
7 到底有没有规则？刚开始做的时候，我以为没有。
后来发现还有第二类规则。在那一类里，10 的某个次方等于负 1。
下面交给 Yueran。她的魔术需要三位同学的计算器。`,
    actions: ["[Hand over. Yueran is already picking three people with phones out.]", "[交接。Yueran 同时开始找三位拿手机的同学。]"],
  },
  {
    id: "B1", speaker: "B", time: "0:00 – 1:15", title: "1001 brings it back / 1001 回到原数",
    en: `Thanks, Zhiheng. I need three people with calculators. You, you, and you.
Everyone else, pick any three-digit number. Let's say 572.
Write it twice, so you get a six-digit number. 572572.
First calculator: divide that by 7. It divides evenly. I promise.
Second calculator: take that answer and divide by 11. Also even.
Third: divide by 13.
What do you get? 572. Your original number.
Everyone try it with your own number. It works every time.
Why? Hold that thought.`,
    zh: `谢谢 Zhiheng。我需要三位有计算器的同学。你、你，还有你。
其他人想一个三位数，比如 572。
把它写两遍，拼成一个六位数：572572。
第一位同学，用它除以 7。一定能整除，我保证。
第二位同学，拿这个结果除以 11。也能整除。
第三位，再除以 13。
得到多少？572。回到原来的数了。
大家用自己的数试试，每次都成。
为什么？先记住这个问题。`,
    actions: ["[Let each volunteer say their number out loud. Pause before the third one.]", "[让每位同学把结果念出来，第三位念之前停一下。]"],
    backup: ["572 → 572572 → ÷7 = 81796 → ÷11 = 7436 → ÷13 = 572.", "Any abc works, including with a zero: 205 → 205205 → 29315 → 2665 → 205.", "This trick cannot fail. If someone's calculator shows a decimal, they typed the number wrong."],
  },
  {
    id: "B2", speaker: "B", time: "1:15 – 2:15", title: "Why: 1000 is −1 on the 1001-clock / 揭秘",
    en: `Writing abc twice is abc times 1000, plus abc. That's abc times 1001. And 1001 is 7 times 11 times 13. So dividing by 7, then 11, then 13 is just dividing by 1001. You get abc back.
Now the real point. 1000 is 1001 minus 1. On a 1001-clock, 1000 acts like minus 1. So three-digit chunks, with alternating signs, give the remainder mod 1001. And so mod 7, 11 and 13 at the same time.
Try 2026. Chunks 2 and 026. 026 minus 2 is 24. 24 mod 7 is 3. 24 mod 13 is 11. Both correct.
Same idea one digit at a time. 10 is 11 minus 1. Alternate the digits, starting from the right: 6 minus 2 plus 0 minus 2 is 2. And 2026 mod 11 is 2.`,
    zh: `把 abc 写两遍，就是 abc 乘 1000 再加 abc，也就是 abc 乘 1001。而 1001 等于 7 乘 11 乘 13。所以依次除以 7、11、13，就是除以 1001，当然回到 abc。
真正重要的是这一点：1000 等于 1001 减 1。在 1001 的钟上，1000 就像负 1。所以三位一组，一正一负交替相加，就得到除以 1001 的余数。也就同时得到了除以 7、11、13 的余数。
试试 2026。分成 2 和 026。026 减 2 等于 24。24 除以 7 余 3，除以 13 余 11。都对。
一位一位看也是同样的想法。10 等于 11 减 1。从个位开始正负交替：6 减 2 加 0 减 2 等于 2。2026 除以 11 正好余 2。`,
  },
  {
    id: "B3", speaker: "B", time: "2:15 – 3:15", title: "One idea, every rule / 一个想法，所有规则",
    en: `So here's the one idea behind everything.
Find a k so that 10 to the k is 1 or minus 1 mod d. If it's 1, add the k-digit chunks. If it's minus 1, alternate them. That's it.
Here are a few. For 3 and 9, k is 1. For 11, 10 is already minus 1. For 37, 1000 is 1. For 7 and 13, 1000 is minus 1. For 101, 100 is minus 1.
Every rule on this table is the same rule with a different k.
Now the question we really wanted to answer. Does every d get a rule? Or is 7 just lucky?`,
    zh: `所以一切背后只有一个想法。
找一个 k，让 10 的 k 次方模 d 等于 1 或者负 1。等于 1，就把 k 位一组加起来；等于负 1，就交替加减。就这么简单。
看几个例子。3 和 9，k 等于 1。11，10 本身就是负 1。37，1000 等于 1。7 和 13，1000 等于负 1。101，100 等于负 1。
表上每一条规则，都是同一条规则换了个 k。
接下来是我们最想回答的问题：是不是每个 d 都有规则？还是 7 只是运气好？`,
  },
  {
    id: "B4", speaker: "B", time: "3:15 – 4:30", title: "Why every prime gets a rule / 为什么一定有规则",
    en: `Every prime other than 2 and 5 gets a rule. That's Fermat's little theorem: 10 to the p minus 1 is 1 mod p. So chunks of p minus 1 digits always work.
Usually something shorter works. The shortest additive chunk is the order of 10 mod p.
And here's what surprised us most. That same number is the length of the repeating block of 1 over p.
1/7 is 0.142857, repeating. Six digits. The order of 10 mod 7 is 6. Same number, and it's not a coincidence. Look at the remainders when you do the long division: 1, 3, 2, 6, 4, 5, and back to 1. Those are the powers of 10 mod 7.
One more. Multiply 142857 by 2: 285714. By 3: 428571. Same digits, rotated. That's because 10 is a primitive root mod 7. Our favourite fact in the whole project.`,
    zh: `除了 2 和 5，每个素数都有规则。这就是费马小定理：10 的 p 减 1 次方模 p 等于 1。所以 p 减 1 位一组总是可以的。
通常还有更短的。最短的"相加"组长，就是 10 模 p 的阶。
最让我们意外的是：这个数正好等于 1/p 的循环节长度。
1/7 等于 0.142857 循环，6 位。10 模 7 的阶也是 6。同一个数，而且不是巧合。看长除法里的余数：1、3、2、6、4、5，然后回到 1。这些正好是 10 的各次幂模 7。
再看一个。142857 乘 2 是 285714，乘 3 是 428571。数字一样，只是转了一圈。因为 10 是模 7 的原根。这是整个项目里我们最喜欢的一件事。`,
    actions: ["[Trace the remainder cycle on the slide with your finger: 1 → 3 → 2 → 6 → 4 → 5.]", "[用手指在页面上沿着余数圈走一遍：1 → 3 → 2 → 6 → 4 → 5。]"],
  },
  {
    id: "B5", speaker: "B", time: "4:30 – 5:00", title: "One sentence / 一句话",
    en: `One sentence. If you know what 10 is mod d, you can build the rule for d yourself. Fermat says the rule exists. The order of 10 says how short it can be.
The full slides have more: a "chop the last digit" rule for 7, why ISBN numbers use 11, and every proof. It's all on our GitHub.
Thanks. Go try the 1001 trick on a friend.`,
    zh: `一句话总结：只要知道 10 模 d 等于几，你就能自己造出 d 的整除规则。费马小定理保证规则存在，10 的阶告诉你它最短能多短。
完整版里还有更多：7 的"砍个位"规则、ISBN 书号为什么用 11、以及每一步的证明。都在我们的 GitHub 上。
谢谢大家。回去找个朋友试试 1001 魔术。`,
  },
];

const QA = [
  { q: "Why don't 2 and 5 have a digit-sum rule? / 为什么 2 和 5 没有数字和规则？",
    en: "Because 10 ≡ 0 mod 2 and mod 5. 10 is not a unit there, so it has no order. But 10 ≡ 0 is exactly why you only need the last digit (last k digits for 2^k, 5^k).",
    zh: "因为 10 模 2、模 5 都是 0。10 不是单位，没有阶。但正因为 10 ≡ 0，只看末几位就够了。" },
  { q: "Does every number have a rule? / 每个数都有规则吗？",
    en: "Every d coprime to 10 does (Euler's theorem gives 10^φ(d) ≡ 1). A general d splits as (power of 2)(power of 5)(part coprime to 10); test each part separately.",
    zh: "和 10 互素的 d 都有（欧拉定理）。一般的 d 拆成 2 的幂、5 的幂和与 10 互素的部分，分别判断。" },
  { q: "Is there a shorter rule for 7? / 7 有更实用的规则吗？",
    en: "Yes: chop the last digit y, compute x − 2y, repeat. 2026 → 202 − 12 = 190 → 19 − 0 = 19, not a multiple of 7. It uses the inverse of 10 mod 7 (which is 5 ≡ −2). It only keeps divisibility, not the remainder.",
    zh: "有，砍个位法：去掉个位 y，算 x − 2y，反复做。用到 10 模 7 的逆元 5 ≡ −2。只保留能否整除，余数会变。" },
  { q: "Can I start the alternating sum from the left? / 交错和能从左边算起吗？",
    en: "For a yes/no divisibility check, yes. For the remainder, no: with an even number of digits the sign flips. 2026 from the left gives −2 ≡ 9, but the remainder is 2.",
    zh: "只判断整除可以；要算余数不行，位数是偶数时符号会反。" },
  { q: "Why does 1/7 repeat every 6 digits but 1/37 every 3? / 为什么 1/7 循环 6 位，1/37 只循环 3 位？",
    en: "Period of 1/d = order of 10 mod d. ord₇(10) = 6, ord₃₇(10) = 3 because 999 = 27 × 37.",
    zh: "循环节长度 = 10 模 d 的阶。10 模 7 的阶是 6，模 37 的阶是 3，因为 999 = 27 × 37。" },
  { q: "Can the tricks fail? / 魔术会失败吗？",
    en: "Trick A fails only if someone circles 0 (0 and 9 are indistinguishable) or shuffles into the same number. Trick B cannot fail.",
    zh: "魔术 A 只在观众圈了 0 或打乱后和原数一样时会出问题；魔术 B 不会失败。" },
  { q: "How is this related to cryptography? / 和密码学有什么关系？",
    en: "The order of an element and primitive roots are the core of Diffie–Hellman and ElGamal. Check digits (ISBN-10 uses mod 11) are divisibility rules used in practice.",
    zh: "阶和原根正是 Diffie–Hellman 和 ElGamal 的核心；校验码（ISBN-10 用模 11）是整除规则的实际应用。" },
  { q: "Why chunk from the right? / 为什么分组要从个位开始？",
    en: "Because n = B₀ + B₁·10^k + B₂·10^{2k} + … so B₀ must be the lowest k digits.",
    zh: "因为 n = B₀ + B₁·10^k + …，B₀ 必须是最低的 k 位。" },
];

module.exports = { SPEAKERS, SLIDES, QA };
