---
title: Some bitwise operations
date: 2024-02-12 23:03:55
tags:
  - bitwise
  - Performance
categories:
  - JavaScript
---

一些合适的位运算可以提高代码的性能, 常见于框架和库的底层实现. 本文整理了一些功能的常规实现和位运算实现.

<!-- more -->

> 基准测试仅供参考, 实际情况与实际数据、运行环境等有关

## 获取2的n次方

### 功能实现

```js
const math_pow = (n) => {
    return Math.pow(2, n)
}

const starstar = (n) => {
    // 在 ES7 中引入了 ** 运算符, 与 Math.pow() 基本等价
    return 2 ** n
}

const bitwise_shift = (n) => {
    return 1 << n
}
```

### 基准测试 js

```js
const cases = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

const math_pow = (n) => {
    return Math.pow(2, n)
}

const starstar = (n) => {
    return 2 ** n
}

const bitwise_shift = (n) => {
    return 1 << n
}

const bench = (fn) => {
    performance.mark('start')
    for (let i = 0; i < 1_000_000; i++) {
        cases.forEach(fn)
    }
    performance.mark('end')
    performance.measure(fn.name, 'start', 'end')
    console.log(`${fn.name}: ${performance.getEntriesByName(fn.name)[0].duration}ms`)
    performance.clearMarks()
}

bench(math_pow)
bench(starstar)
bench(bitwise_shift)
// math_pow: 626.2185997962952ms
// starstar: 624.5796999931335ms
// bitwise_shift: 45.28470039367676ms

```

### 基准测试 rs

```rust
fn math_pow(n: u32) -> u32 {
    2u32.pow(n)
}

fn bitwise_pow(n: u32) -> u32 {
    1 << n
}

#[test]
fn bench1() {
    const CASES: [u32; 11] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let start = time::Instant::now();
    for _ in 0..1_000_000 {
        for n in &CASES {
            math_pow(*n);
        }
    }
    let elapsed = start.elapsed();
    println!("{:?} seconds", elapsed);

    let start = time::Instant::now();
    for _ in 0..1_000_000 {
        for n in &CASES {
            bitwise_pow(*n);
        }
    }
    let elapsed = start.elapsed();
    println!("{:?} seconds", elapsed);
}

// 94.354ms seconds
// 68.8278ms seconds
```

## 切换0/1

### 功能实现

```js
const toggle = (n) => {
    return n === 0 ? 1 : 0
}

const bitwise_toggle = (n) => {
    return n ^ 1
}
```

### 基准测试 js

```js
const toggle = (n) => {
    return n === 0 ? 1 : 0
}

const bitwise_toggle = (n) => {
    return n ^ 1
}

const bench = (fn) => {
    performance.mark('start')
    let num = 0;
    for (let i = 0; i < 1_000_000; i++) {
        num = fn(num)
    }
    performance.mark('end')
    performance.measure(fn.name, 'start', 'end')
    console.log(`${fn.name}: ${performance.getEntriesByName(fn.name)[0].duration}ms`)
    performance.clearMarks()
}

bench(toggle)
bench(bitwise_toggle)
// toggle: 1.700000286102295ms
// bitwise_toggle: 4.515900135040283ms
```

### 基准测试 rs

```rust
fn toggle(n: i32) -> i32 {
    if n == 0 { 1 } else { 0 }
}

fn bitwise_toggle(n: i32) -> i32 {
    n ^ 1
}

#[test]
fn bench2() {
    let start = time::Instant::now();
    let mut num = 0;
    for _ in 0..1_000_000 {
        num = toggle(num);
    }
    let elapsed = start.elapsed();
    println!("{:?} seconds", elapsed);

    let start = time::Instant::now();
    let mut num = 0;
    for _ in 0..1_000_000 {
        num = bitwise_toggle(num);
    }
    let elapsed = start.elapsed();
    println!("{:?} seconds", elapsed);
}

// 6.901ms seconds
// 6.6314ms seconds
```

## 测试环境

- System: Windows 10 22H2 19045.3930
- CPU: AMD Ryzen 7 5800X 8-Core Processor 3.80 GHz
- RAM: 16.0 GB
- Node.js: v18.16.1
- Rust: rustc 1.74.0 (79e9716c9 2023-11-13)