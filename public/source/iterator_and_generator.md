﻿---
title: JS 的迭代器和生成器
category: javascript
created: 2024-03-27
---

ES6引入了迭代器和生成器的概念，这两个特性为JavaScript带来了更强大的迭代和异步编程能力

## 迭代协议

迭代协议具体分为两种:

- 可迭代协议 (Iterable Protocol)
- 迭代器协议 (Iterator Protocol)

### 可迭代协议 (Iterable Protocol)

```ts
// lib.es2015.iterable.d.ts
interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}
```

可迭代协议允许 JavaScript 对象定义或自定义它们的迭代行为, 例如何响应 `for...of` 循环.

要成为可迭代对象, 则该对象**本身或原型链**上必须有 `Symbol.iterator` 属性, 它是一个无参的函数, 其返回值是一个符合 _迭代器协议_ 的对象.

当一个对象需要被迭代时, 会先调用 `Symbol.iterator` 方法得到迭代器, 然后通过该迭代器获得要迭代的值.

> `Symbol.iterator` 可以是一个普通函数, 也可以是一个生成器函数.

```js
// obj1 的 `Symbol.iterator` 为生成器函数
const obj1 = {
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
}

for (const item1 of obj1) {
    console.log('item of obj1:', item1);
}

// obj2 的 `Symbol.iterator` 为普通函数, 其返回值符合迭代器协议
const obj2 = {
    [Symbol.iterator]() {
        let count = 0
        return {
            next() {
                if (count < 3) {
                    return { value: count++, done: false }
                }
                else {
                    return { value: undefined, done: true }
                }
            }
        }
    }
}

for (const item2 of obj2) {
    console.log('item of obj2:', item2);
}
```

### 迭代器协议 (Iterator Protocol)

```ts
// lib.es2015.iterable.d.ts
interface IteratorYieldResult<TYield> {
    done?: false;
    value: TYield;
}

interface IteratorReturnResult<TReturn> {
    done: true;
    value: TReturn;
}

type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

interface Iterator<T, TReturn = any, TNext = undefined> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [ TNext ]): IteratorResult<T, TReturn>;

    return?(value?: TReturn): IteratorResult<T, TReturn>;

    throw?(e?: any): IteratorResult<T, TReturn>;
}
```

迭代器协议定义了一个对象必须具有的方法, 包括 `next()`(必需)、 `return()`(可选)、 `throw()`(可选). 这些方法都应该返回一个符合 `IteratorResult` 接口的对象, 否则在使用时会抛出异常.

- `next()` 获取迭代器的下一个值. 可以接受一个参数, 该参数会被传递给生成器函数的 `yield` 语句.
- `return()` 结束迭代器的迭代, 可以接受一个参数, 该参数会被传递给生成器函数的 `return` 语句.
- `throw()` 抛出一个异常, 可以接受一个参数, 该参数会被传递给生成器函数的 `throw` 语句.

#### next() 的使用

构造一个状态机, 初始为 `initial` 状态. 默认的状态转移规则为:

- `initial` => `running`
- `running` => `done`
- `done` => `running`
- 其他状态 => 结束运行并返回 `broken`

可以通过使用 `next()` 传入参数将状态转移为指定的状态.

```ts
// initial => running => done => ... => running => done
const get_state_machine = function* () {
    let state = 'initial'
    while (true) {
        switch(state) {
            case 'initial':
                console.log('initial state')
                state = (yield 'initial') ?? 'running'
                break
            case 'running':
                console.log('running state')
                state = (yield 'running') ?? 'done'
                break
            case 'done':
                console.log('done state')
                state = (yield 'done') ?? 'running'
                break
            default:
                console.log('unknown state')
                return 'broken'
        }
    }
}

const state_machine = get_state_machine()

// 开始默认工作 (next() 无参数)
for (let i = 0; i < 10; i++) {
    state_machine.next()
}

console.log('====== manual control ======')
// 手动重置到 initial 状态
state_machine.next('initial')
// 直接跳转到 done 状态
state_machine.next('done')
```

#### return() 的使用

构造一个累加器, 通过 `next()` 方法可选地传入一个数值, 累加器会将该数值加到当前的和上, 不传入数值时默认加 1.

```ts
// 为了方便观察 return() 的效果, 这里将 sum 定义在外部
let sum = 0
const get_accumulator = function* () {
    while (true) {
        sum += (yield sum) ?? 1
    }
    return sum
}
const accumulator = get_accumulator()

// 第一次调用 next() 时, 传入的参数(如果存在)会被忽略
console.log(accumulator.next(100))

// 无参调用 next()
for (let i = 0; i < 4; i++) {
    console.log(accumulator.next())  // +1 (default)
}

// 有参调用 next()
console.log(accumulator.next(2))  // +2
console.log(accumulator.next(3))  // +3

// 调用 return() 结束迭代器
console.log(accumulator.return(100), sum)  // 迭代器结束, 返回 100 (此时 sum 仍然是 9)
```

#### throw() 的使用

构造一个迭代器, 在开始迭代时会创建一个 dom 元素附加到`body`上, 在每次调用 `next()` 时会将 dom 的 `innerText` 设置为传入的值, 并返回上一次设置的值. 并在 `finally` 代码块中添加清理工作.

```ts
const get_player = function* () {
    // 初始化一个 dom 元素并添加到 body 中
    let dom = document.createElement('div')
    document.body.appendChild(dom)

    let text = 'initial'

    try {
        // 最多迭代 10 次: 将dom的innerText设置为next()传入的值, 并返回上一次设置的值
        for (let i = 0; i < 10; i++) {
            dom.innerText = text
            text = yield text
        }
        return 'done'
    } catch (err) {
        // 如果迭代器被 throw() 了, 这里会捕获到错误
        console.log('catch error in iterator:', err)
    } finally {
        // 清理工作: 移除 dom 元素并释放内存
        document.body.removeChild(dom)
        dom = null
    }
}

const player = get_player()

// 构建一个按钮使得 next 可以受控调用
const trigger = document.createElement('button')
trigger.innerText = 'click to next'
let count = 0
trigger.onclick = function () {
    console.log(player.next(`trigger ${ count++ }`))

    if(count === 5) {
        // 在第 5 次点击时, throw 一个错误. 这会导致迭代器内部的 try-catch-finally 代码块被执行
        // 此后再点击按钮, 会发现迭代器已经结束 (即 done 为 true)
        console.log('throw:', player.throw('error'))
    }
}
document.body.appendChild(trigger)
```

### 异步迭代器和异步可迭代协议

迭代器和可迭代协议的异步版本, 用于处理异步迭代的场景. (除了返回值使用 `Promise` 包装, 其他与同步版本基本一致)

```ts
// lib.es2018.asynciterable.d.ts
interface AsyncIterator<T, TReturn = any, TNext = undefined> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [ TNext ]): Promise<IteratorResult<T, TReturn>>;

    return?(value?: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;

    throw?(e?: any): Promise<IteratorResult<T, TReturn>>;
}

interface AsyncIterable<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
}
```

## 迭代器 (Iterator)

迭代器是一个对象, 它定义了一个序列, 并在终止迭代时可能附带一个值. 任何满足迭代器协议的对象都可以被称为迭代器.

- 常见的可迭代对象有 `Array`, `Map`, `Set`, `String` 等, 注意: `Object` **不是**可迭代对象.
- 常见的消耗迭代器的方法为 `for ... of`, `Array.from`, `...` (展开运算符) 等.

```js
// 展开运算符本质上是调用迭代器
const obj = {
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
}

const items = [ ...obj ]
console.log(items);  // [1, 2, 3]
```

## 生成器 (Generator)

**生成器函数**通过 `function*` 关键字定义, 并使用 `yield` 关键字暂停执行. 生成器函数返回一种称为**生成器**的特殊迭代器.

可以根据需要多次调用该函数，每次都返回一个新的生成器实例, 但每个生成器只能迭代一次.

```ts
// 定义一个 range 生成器函数, 用于生成指定范围内的数字序列 (从 start 到 end, 步长为 step, 不包含 end)
const range = function* (start, end, step) {
    for (let i = start; i < end; i += step) {
        yield i
    }
}

for (const item of range(0, 10, 2)) {
    console.log('range1:', item)
}

for (const item of range(0, 7, 3)) {
    console.log('range2:', item)
}
```

## yield 和 yield*

- `yield` 关键字用于暂停和恢复一个生成器函数.
- `yield` 表达式的值是由调用者提供的(调用 `next()` 方法传入的值).
- `yield*` 关键字用于委托给另一个**生成器**或**可迭代对象**.
- `yield*` 表达式的值是由被委托的生成器或可迭代对象提供的(完成迭代后 `return` 的值).

```ts
// 仅使用 yield
const gen1 = function* () {
    yield 1
    yield 2
    yield 3
    return 4
}

// 使用 yield* 委托给另一个生成器, 并获取其返回值
const gen2 = function* () {
    const v = yield* gen1()
    console.log('value of yield*:', v)  // value of yield*: 4
    yield 5
    return 6  // return 的值不是迭代序列的一部分!
}

for (const v of gen2()) {
    console.log('v:', v)
}
```

## 常见用法

### 实现状态机

通过生成器函数实现一个状态机, 用于处理不同的状态.

```ts

const simple_random_pick = (candidates) => {
    const index = Math.floor(Math.random() * candidates.length)
    return candidates[index]
}

// 定义一个简单的状态机
// 0 => 1 | 2 | 3
// 1 => 2 | 3
// 2 => 3
// 3 => 0 | 1
const get_state_machine = function* () {
    let now = 0;
    while (true) {
        switch(now) {
            case 0:
                now = simple_random_pick([ 1, 2, 3 ])
                break
            case 1:
                now = simple_random_pick([ 2, 3 ])
                break
            case 2:
                now = 3
                break
            case 3:
                now = simple_random_pick([ 0, 1 ])
                break
            default:
                return 'unexpected'
        }
        yield now
    }
}
const state_machine = get_state_machine()
// 自动运行迭代器
for (let i = 0; i < 10; i++) {
    console.log(state_machine.next())
}
// 手动结束迭代器
state_machine.return('done')
console.log(state_machine.next())  // { value: undefined, done: true }
```

### 自定义迭代器

为 `Object` 添加迭代器, 使其可以被 `for ... of` 和解构赋值使用.

```ts
Object.prototype[Symbol.iterator] = function* () {
    for (let key in this) {
        yield this[key]
    }
}

const obj = { a: 1, b: 2, c: 3 }

// 使用 for-of 遍历
for (const item of obj) {
    console.log('item:', item)
}

// 使用解构赋值
const [ a, b, c ] = obj
console.log(a, b, c)
```

### 重写内置迭代器

通过重写 `String` 的迭代器, 使其在迭代时以空格为分隔符.

```ts
// 重写 String 的迭代器
String.prototype[Symbol.iterator] = function* () {
    const words = this.split(' ')
    for (let word of words) {
        yield word
    }
}

const sentence = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

// 使用 for-of 遍历
for (const word of sentence) {
    console.log('word:', word)
}

// 使用解构赋值
const words = [ ...sentence ]
console.log(words)
```

## References

- [MDN -- Iterators and Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- [MDN -- Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)
- [MDN -- yield](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)
- [MDN -- yield*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*)
