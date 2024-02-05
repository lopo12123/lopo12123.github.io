---
title: 一种空间占用的优化方法
date: 2024-02-05 23:36:28
tags:
  - LeetCode
  - Rust
categories:
  - LeetCode
---

从 LeetCode 的某道题中学到的一个小技巧。

<!-- more -->

## 问题

[Q1686](https://leetcode.cn/problems/stone-game-vi/description/)

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

1. 保存价值之和和单独的两人价值, 得到 `Vec<(i32, i32, i32)>`
2. 保存价值之和和原始索引, 得到 `Vec<(i32, usize)>`
