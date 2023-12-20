---
title: Function-Like Types in Rust
date: 2023-12-18 22:14:33
tags:
  - Rust
categories:
  - Study Notes
  - Study Rust
---

在 Rust 中有三种类函数类型: `Function item type`, `Function pointer type`, `Closure type`.

<!-- more -->

## Function item type

Function item 是 Rust 中最基本的函数类型, 也是最常用的函数类型. 一个 function item 是一个函数定义, 例如:

```rust
fn greet() {
    println!("hi there!");
}
```

当声明一个`function item`时，会生成唯一标识其 `function item type`的**零大小**的值。

此 `function item type` 已经明确标识了该函数的名字、类型参数和声明时绑定的生命周期（区别于调用时传入的生命周期）。所以不再需要一个**函数指针**指向此函数，在调用时也不需要**动态派发**。

```rust
use core::any::type_name;

fn get_typename_of<T>(_: &T) -> &'static str {
    type_name::<T>()
}

fn foo() -> i32 {
    42
}

fn bar() -> i32 {
    35
}

#[test]
fn function_item_typename() {
    // 1. 零大小
    println!("size of foo is: {}", core::mem::size_of_val(&foo));
    // => size of foo is: 0

    println!("size of bar is: {}", core::mem::size_of_val(&bar));
    // => size of bar is: 0

    println!("size of function with generic type 1: {}", core::mem::size_of_val(&get_typename_of::<i32>));
    // => size of function with generic type 1: 0

    println!("size of function with generic type 2: {}", core::mem::size_of_val(&get_typename_of::<u32>));
    // => size of function with generic type 2: 0

    // 2. 类型
    println!("type of foo is: \"{}\"", get_typename_of(&foo));
    // => type of foo is: "study_rust::function_like::foo"

    println!("type of bar is: \"{}\"", get_typename_of(&bar));
    // => type of bar is: "study_rust::function_like::bar"
}
```

没有直接引用 `function item type` 的语法，但编译器会在错误消息中将类型显示为类似 `fn() -> i32 {fn_name}` 形式的内容。某些编辑器也会显示此类型。

- 函数 foo 的类型提示
  ![](type_foo.png)
- 函数 bar 的类型提示
  ![](type_bar.png)

## Function pointer type

`Function pointer type` 是一个指向函数的指针，它的类型在编译时**不需要**明确已知。可以通过从**function item**或**非捕获闭包**强制转换而来。

在**显式指定**(function_pointer_test.1)或**模式匹配**(function_pointer_test.4)中，会发生`function item type`到`function pointer type`的转换。

```rust
type MyFunctionPointer = fn();

fn hi() {
    println!("hi");
}

fn hello() {
    println!("hello");
}

#[test]
fn function_pointer_test() {
    // 1. coercion from function item
    let mut greet: MyFunctionPointer = hi;
    greet();
    // => hi
    println!("size of greet is: {}", core::mem::size_of_val(&greet));
    // => size of greet is: 8

    // 2. re-assign is ok
    greet = hello;
    greet();
    // => hello
    println!("size of greet is: {}", core::mem::size_of_val(&greet));
    // => size of greet is: 8

    // 3. coercion from non-capturing closure
    greet = || println!("nice day, isn't it?");
    greet();
    // => nice day, isn't it?
    println!("size of greet is: {}", core::mem::size_of_val(&greet));
    // => size of greet is: 8

    // 4. coercion in pattern matching
    let condition = true;
    let my_size_of = if condition {
        core::mem::size_of::<i32>
    } else {
        core::mem::size_of::<u32>
    };
    println!("size of core::mem::size_of::<i32> is: {}", core::mem::size_of_val(&core::mem::size_of::<i32>));
    println!("size of core::mem::size_of::<u32> is: {}", core::mem::size_of_val(&core::mem::size_of::<u32>));
    println!("size of my_size_of is: {}", core::mem::size_of_val(&my_size_of));
    // => size of core::mem::size_of::<i32> is: 0
    // => size of core::mem::size_of::<u32> is: 0
    // => size of my_size_of is: 8

    // EXTRA: size of usize
    println!("size of 'usize' is: {}", core::mem::size_of::<usize>());
    // => size of 'usize' is: 8
}
```

## Closure type

闭包使用[闭包表达式](https://doc.rust-lang.org/reference/expressions/closure-expr.html)创建，具有唯一的、匿名的类型。

一个闭包大致相对于包含所有捕获项的一个结构体，且其大小与该结构体的大小相同。

```rust
struct Alternative1 {}

/// alternative to capturing closure -- 1 argument
#[allow(unused)]
struct Alternative2 {
    arg1: String,
}

/// alternative to capturing closure -- 2 argument (1)
#[allow(unused)]
struct Alternative3 {
    arg1: String,
    arg2: u32,
}

/// alternative to capturing closure -- 2 argument (2)
#[allow(unused)]
struct Alternative4<'a> {
    arg1: &'a String,
    arg2: u32,
}

#[test]
fn closure_test() {
    // 1. non-capturing closure
    let closure1 = || println!("no args");
    let alt1 = Alternative1 {};
    println!("closure: {}; struct: {}; (): {}", size_of_val(&closure1), size_of_val(&alt1), size_of::<()>());
    // => closure: 0; struct: 0; (): 0

    // 2. capturing closure (1)
    let arg1 = "abc".to_string();
    let closure2 = || {
        // consume arg1 to ensure it's captured
        let _args = arg1;
        println!("args: {:?}", _args);
    };
    let alt2 = Alternative2 { arg1: "abc".to_string() };
    println!("closure: {}; struct: {}; String: {}", size_of_val(&closure2), size_of_val(&alt2), size_of::<String>());
    // => closure: 24; struct: 24; String: 24

    // 3. capturing closure (2)
    let arg1 = "abc".to_string();
    let arg2 = 123_u32;
    let closure3 = || {
        let _args = (arg1, arg2);
        println!("args: {:?}", _args);
    };
    let alt3 = Alternative3 { arg1: "abc".to_string(), arg2: 123_u32 };
    println!("closure: {}; struct: {}; String: {}; u32: {}", size_of_val(&closure3), size_of_val(&alt3), size_of::<String>(), size_of::<u32>());
    // => closure: 32; struct: 32; String: 24; u32: 4

    // 4. capturing closure (3)
    let arg1 = "abc".to_string();
    let arg2 = 123_u32;
    let closure4 = || {
        let _args = (&arg1, arg2);
        println!("args: {:?}", _args);
    };
    let alt4 = Alternative4 { arg1: &arg1, arg2: 123_u32 };
    println!("closure: {}; struct: {}; &String: {}; u32: {}", size_of_val(&closure4), size_of_val(&alt4), size_of::<&String>(), size_of::<u32>());
    // closure: 16; struct: 16; &String: 8; u32: 4
}
```

## References

- [Function item types](https://doc.rust-lang.org/reference/types/function-item.html)
- [Function pointer types](https://doc.rust-lang.org/reference/types/function-pointer.html)
- [Closure types](https://doc.rust-lang.org/reference/types/closure.html)
- [Implement unique types per fn item, rather than having all fn items have fn pointer type](https://github.com/rust-lang/rust/pull/19891)