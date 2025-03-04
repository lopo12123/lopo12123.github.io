---
title: 关于 Try-Catch-Finally
category: javascript
created: 2024-07-05
---

根据`try/catch`和`finally`中是否有`return`语句, 可以分为以下几种情况:

## Conditions

### try/catch 和 finally 中都没有 return

按照正常的执行顺序, 先执行`try`中的代码, 如果有异常则执行`catch`中的代码, 最后执行`finally`中的代码

```ts
const fn = () => {
    let v = 1
    try {
        v += 1
        throw new Error('error')
    } catch (err) {
        v += 1
    } finally {
        v += 1
    }
    return v
}
fn()  // 4
```

### try/catch 中没有 return, finally 中有 return

`finally`本身已经是最后执行的, 所以其中的`return`对整个函数的返回值没有影响

```ts
const fn = () => {
    let v = 1
    try {
        v += 1
        throw new Error('error')
    } catch (err) {
        v += 1
    } finally {
        v += 1
        return v
    }
}
fn()  // 4
```

### try/catch 中有 return, finally 中没有 return

由于`finally`在`try/catch`后一定会执行, 所以`finally`中的语句**可能**会对`try/catch`中的`return`语句产生影响

具体表现为:

- 在`return`时已经确定了返回的内容(值或引用)
- `finally`中对原变量的修改不会影响`return`的内容
- `finally`中对同一引用的修改会影响`return`的内容

```ts
// 对原变量的修改不会影响返回值
const fn1 = () => {
    let v = ''
    try {
        v += 'try'
        return v
    } catch (err) {
        v += 'catch'
    } finally {
        v += 'finally'
    }
}
fn1()  // 'try'

// 对同一引用的修改会影响返回值
const fn2 = () => {
    let obj = { v: 1 }
    try {
        obj.v = 2
        throw new Error('error')
    } catch (err) {
        obj.v = 3
        return obj
    } finally {
        obj.v = 4
    }
}
console.log(fn2())  // { v: 4 }
console.log(fn2().v)  // 4
```

### try/catch 和 finally 中都有 return

`finally`中的`return`会覆盖`try/catch`中的`return`

```ts
const fn = () => {
    try {
        return 1
    } finally {
        return 2
    }
}
fn()  // 2
```

## References

- [MDN - try...catch](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)