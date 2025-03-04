---
title: Rust 的宏 (声明宏)
category: rust
created: 2024-07-10
---

Rust 的宏主要分为两种: 声明宏和过程宏. 声明宏是一种类似于 C 语言中的宏, 用于声明代码片段, 通过宏展开生成代码. 过程宏则是一种更为复杂的宏, 用于在编译时生成代码. 本文为学习声明宏的记录.

## 语法

声明宏使用 `macro_rules!` 关键字声明, 语法如下:

```rust
macro_rules! macro_name {
    (pattern1) => {
        // code1
    };
    (pattern2) => {
        // code2
    };
}
```

### 元变量

- `item`: [程序项](https://rustwiki.org/en/reference/items.html)
- `block`: [块表达式](https://rustwiki.org/en/reference/expressions/block-expr.html)
- `stmt`: [语句](https://rustwiki.org/en/reference/statements.html)
- `pat_param`: [模式](https://rustwiki.org/en/reference/patterns.html)
- `pat`: [模式](https://rustwiki.org/en/reference/patterns.html)
- `expr`: [表达式](https://rustwiki.org/en/reference/expressions.html)
- `ty`: [类型](https://rustwiki.org/en/reference/types.html#type-expressions)
- `ident`: [标识符](https://rustwiki.org/en/reference/identifiers.html)
- `path`: [路径](https://rustwiki.org/en/reference/paths.html#paths-in-types)
- `tt`: [token树](https://rustwiki.org/en/reference/macros.html#macro-invocation)
- `meta`: [属性中的内容](https://rustwiki.org/en/reference/attributes.html)
- `lifetime`: [生命周期token](https://rustwiki.org/en/reference/tokens.html#lifetimes-and-loop-labels)
- `vis`: [可能为空的可见性修饰符](https://rustwiki.org/en/reference/visibility-and-privacy.html)
- `literal`: [字面量](https://rustwiki.org/en/reference/expressions/literal-expr.html)

> - 从 2021 edition 开始, `pat` 可以匹配顶层[或模式](https://rustwiki.org/en/reference/patterns.html#or-patterns)
> - 在 2021 edition 之前, `pat` 和 `pat_param` 相同

### 重复

和正则类似, 可以使用 `*`, `+`, `?` 来表示重复次数:

- `*`: 0 次或多次
- `+`: 1 次或多次
- `?`: 0 次或 1 次

## 使用

### macro_use

装饰模块, 使得模块中的宏可以在其他模块中使用

### macro_export

装饰宏, 使宏在 `crate::` 域中声明, 即可以使用 `crate::my_macro!` 的形式调用

## 示例

### 多规则

[View in Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=25b557a57b0e0a801a03d14152a0c258)

```rust
macro_rules! add {
    ($a: expr, $b: expr) => {
        $a + $b
    };
    ($a: expr, $b: expr, $c: expr) => {
        $a + $b + $c
    };
    ($a: expr, $b: expr, $c: expr, $d: expr) => {
        $a + $b + $c + $d
    };
}

fn main() {
    let sum1 = add!(1, 2);
    let sum2 = add!(1, 2, 3);
    let sum3 = add!(1, 2, 3, 4);
    println!("sum1: {}, sum2: {}, sum3: {}", sum1, sum2, sum3);
    // sum1: 3, sum2: 6, sum3: 10
}
```

### 重复 & 嵌套调用

[View in Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=5801c3abc753b70a1ffebea275edd463)

```rust
macro_rules! add {
    ($a: expr) => {
        $a
    };
    ($a: expr, $($b: expr),+) => {
        $a + add!($($b),+)
    };
}

fn main() {
    let sum1 = add!(1, 2);
    let sum2 = add!(1, 2, 3);
    let sum3 = add!(1, 2, 3, 4);
    let sum4 = add!(1, 2, 3, 4, 5);
    let sum5 = add!(1, 2, 3, 4, 5, 6);
    println!(
        "sum1: {}, sum2: {}, sum3: {}, sum4: {}, sum5: {}",
        sum1, sum2, sum3, sum4, sum5
    );
    // sum1: 3, sum2: 6, sum3: 10, sum4: 15, sum5: 21
}
```

### 综合使用

[View in Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=821b1e8bc0651923c8c3b1445856d623)

```rust
macro_rules! my_errors {
    ($( $variant: ident => $reason: expr ),* $(,)?) => {
        #[derive(Debug)]
        pub enum MyError {
            $($variant { reason: &'static str },)*
        }

        impl MyError {
            $(
            #[allow(non_upper_case_globals)]
            pub const $variant: MyError = MyError::$variant { reason: $reason };
            )*

            pub fn reason(&self) -> &str {
                match self {
                    $(MyError::$variant { reason } => reason),*
                }
            }
        }
    }
}

my_errors!(
    NotFound => "not found",
    BadRequest => "bad request",
    Unauthorized => "unauthorized",
);

fn main() {
    let error1 = MyError::NotFound;
    let error2 = MyError::BadRequest;
    let error3 = MyError::Unauthorized;

    println!("{}", error1.reason());
    println!("{}", error2.reason());
    println!("{}", error3.reason());
    // not found
    // bad request
    // unauthorized
}
```

### 复杂案例

标记树撕咬机 (`tt muncher`)

## References

- [The Rust Programming Language - Macros](https://doc.rust-lang.org/book/ch19-06-macros.html)
- [The Rust Reference - Macros](https://doc.rust-lang.org/reference/macros.html)
- [Rust By Example - Macros](https://doc.rust-lang.org/stable/rust-by-example/macros.html)
- [The Little Book of Rust Macros (non-official)](https://veykril.github.io/tlborm/)
- [Appendix: Macro Follow-Set Ambiguity Formal Specification](https://rustwiki.org/en/reference/macro-ambiguity.html)
- [rfcs#1584 -- Macros 2.0](https://github.com/rust-lang/rfcs/blob/master/text/1584-macros.md)
