---
title: 一种空间占用的优化方法
date: 2024-02-05 23:36:28
tags:
  - LeetCode
  - Rust
categories:
  - LeetCode
---

> 问题: [Q1686](https://leetcode.cn/problems/stone-game-vi/description/)

<!-- more -->

## 分析

当一块石头 `i` 分配给某一人, 造成的后果为两人的得分差距增加 `aliceValues[i] + bobValues[i]` (即得到石头的人增加自身value的得分, 对方可认为失去了石头, 即减少了自身value的得分)。

由于两人都采用最优策略进行, 所以两人会将石头对两人的价值之和进行排序, 按从大到小依次选取石头。

## 解决

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

在此场景下, 单个值的大小为 1-100, 在 `2^7` 范围内。可以将两个值压缩到一个变量中:

```rust
let a = 12;
let b = 34;
let mix = (a << 7) + b;
println!("{:?}", mix);

println!("{} tobe 34", mix & 0x7F);
println!("{} tobe 12", mix >> 7);
```

而此时占用的空间为 `i32` 的大小, 即 `4`。
