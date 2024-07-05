---
title: 一种空间占用的压缩方法
description: 一道简单题中极致的压缩 －_－b)
category: Problem Set
publishDate: 2024/02/05
---

> 题目非常简单, 思路值得借鉴 (除了嵌入式真没有人抠这点空间吧 －_－b)

## 问题

Alice 和 Bob 轮流玩一个游戏，Alice 先手。

一堆石子里总共有 `n` 个石子，轮到某个玩家时，他可以 移出 一个石子并得到这个石子的价值。Alice 和 Bob 对石子价值有 不一样的的评判标准 。双方都知道对方的评判标准。

给你两个长度为 `n` 的整数数组 `aliceValues` 和 `bobValues` 。`aliceValues[i]` 和 `bobValues[i]` 分别表示 Alice 和 Bob 认为第 `i` 个石子的价值。

所有石子都被取完后，得分较高的人为胜者。如果两个玩家得分相同，那么为平局。两位玩家都会采用 **最优策略** 进行游戏。

请你推断游戏的结果，用如下的方式表示：

- 如果 Alice 赢，返回 `1` 。
- 如果 Bob 赢，返回 `-1` 。
- 如果游戏平局，返回 `0` 。

## 分析

当一块石头 `i` 分配给某一人, 造成的后果为两人的得分差距增加 `aliceValues[i] + bobValues[i]` (即得到石头的人增加自身value的得分, 对方可认为失去了石头, 即减少了自身value的得分)。

由于两人都采用最优策略进行, 所以两人会将石头对两人的价值之和进行排序, 按从大到小依次选取石头。

## 题解

```rust
struct Solution;

impl Solution {
    pub fn stone_game_vi(alice_values: Vec<i32>, bob_values: Vec<i32>) -> i32 {
        let mut diff = alice_values.iter().zip(bob_values.iter()).map(|(&a, &b)| (a + b, a, b)).collect::<Vec<(i32, i32, i32)>>();
        diff.sort_unstable_by(|a, b| {
            b.0.cmp(&a.0)
        });

        let mut baseline = 0;
        for (idx, &(_, a, b)) in diff.iter().enumerate() {
            if idx % 2 == 0 { baseline += a } else { baseline -= b }
        }

        baseline.signum()
    }
}
```

- 时间复杂度为排序的消耗: `O(nlogn)`
- 空间复杂度为统计两者价值之和的消耗: `O(n)`

## 优化

由于最终需要计算得分以确定结果, 所以需要使用某种方式将排序后的价值与排序前的两人价值联系起来。可以选择:

```rust
// 1. 保存价值之和和单独的两人价值, 得到 `Vec<(i32, i32, i32)>`
println!("{}", size_of::<(i32, i32, i32)>());  // 12 -- 4 * 3
println!("{}", size_of::<[i32; 3]>());  // 12 -- 4 * 3
println!("{}", size_of::<Vec<i32>>());  // 24 -- Vec 指针的大小 (再加上其内容的大小, 即 4 * 3。则总占用大小为 36)

// 2. 保存价值之和和原始索引, 得到 `Vec<(i32, usize)>`
println!("{}", size_of::<(i32, usize)>());  // 16 -- Max(4, 8) * 2
```

在此场景下, 单个值的大小为 `1-100`, 在 `2^7` 范围内。可以将两个值压缩到一个变量中:

```rust
let a = 12;
let b = 34;
let mix = (a << 7) + b;
println!("{:?}", mix);

println!("{} tobe 34", mix & 0x7F);
println!("{} tobe 12", mix >> 7);
```

而此时占用的空间为 `i32` 的大小, 即 `4`。

## References

- [LeetCode Q1686](https://leetcode.cn/problems/stone-game-vi/description/)