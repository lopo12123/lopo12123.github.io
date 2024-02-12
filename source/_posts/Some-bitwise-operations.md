---
title: Some bitwise operations
date: 2024-02-12 23:03:55
tags:
  - bitwise
categories:
  - JavaScript
---

一些合适的位运算可以提高代码的性能, 常见于框架和库的底层实现. 本文整理了一些功能的常规实现和位运算实现, 进行简单的基准测试进行对比.

<!-- more -->

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

### 基准测试

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

## 测试环境

- System: Windows 10 22H2 19045.3930
- CPU: AMD Ryzen 7 5800X 8-Core Processor 3.80 GHz
- RAM: 16.0 GB
- Node.js: v18.16.1