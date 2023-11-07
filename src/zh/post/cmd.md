---
layout: doc

# custom frontmatter properties
# the title of the post, will show up in the post list
topic: CMD
# a brief description of the post, will show up in the post list
brief: 一些常用的cmd命令的整理
# a list of platforms the post is about, will show up in the 'tag-bar'
platform:
  - windows
# a list of programming languages the post is about, will show up in the 'tag-bar'
#language:
# a list of tags the post is about, will show up in the 'tag-bar'
tag:
  - cmd
---

# CMD

> 本页是一些常用cmd命令的集合

## 通用

- 获取帮助
    - 使用命令`help`获取**所有**可用命令及其描述的列表
    - 使用命令`help <command>`获取**特定**命令的帮助
    - 使用命令`<command> /?`获取**特定**命令的帮助 (效果同上条)

- `\\` 和 `/`
    - `\\` 一般作为**路径分隔符**使用 (例如 `C:\\Users\\`)
    - `/` 一般作为**命令参数**使用 (例如 `dir /a`)

- 文件描述符
    - `0` - 标准输入 (默认为键盘)
    - `1` - 标准输出 (默认为终端显示器)
    - `2` - 标准错误 (默认为终端显示器)

- 重定向和管道
    - `>` - **输出**重定向
    - `>>` - **输出**重定向 (追加)
    - `<` - **输入**重定向
    - `<<` - **输入**重定向 (追加)
    - `|` - 管道 (将前一个命令的**输出**作为后一个命令的**输入**)

| 命令                            | 说明                         |
|-------------------------------|----------------------------|
| `command>filename`            | 将命令的输出重定向到文件               |
| `command 1>filename`          | 将命令的标准输出重定向到文件             |
| `command 2>filename`          | 将命令的标准错误重定向到文件             |
| `command>filename 2>&1`       | 将命令的标准输出和标准错误重定向到文件        |
| `command>>filename`           | 将命令的输出重定向到文件 (追加)          |
| `command<filename`            | 将文件作为命令的输入                 |
| `command<filename1>filename2` | 将文件1作为命令的输入, 将命令的输出重定向到文件2 |
| `command>&m`                  | 将文件描述符m作为命令的输出             |
| `command<&m`                  | 将文件描述符m作为命令的输入             |
| `command1\|command2`          | 将命令1的输出作为命令2的输入            |

::: warning 注意

- 重定向符号两侧不能有空格，否则会被当作参数
- `0/1/2` 不能作为追加重定向的目标，即 `2>>1` 是不合法的

:::

## 命令：set（环境变量）

- `set` - 显示所有环境变量
- `set <variable>` - 显示指定环境变量的值
- `set <variable>=<value>` - 设置指定环境变量的值
- `set /a <variable>=<expression>` - 设置指定环境变量的值为表达式的计算结果
- `set /p <variable>=<prompt>` - 设置指定环境变量的值为用户输入的值
- `%<variable>%` - 使用环境变量的值

::: warning 注意

- 环境变量名不区分大小写，即 `set PATH=xxx` 和 `set path=xxx` 效果相同
- `=`两边不能包含空格，否则会被当作参数解析，例如 `set PATH = xxx` 会被当作 `set PATH` 命令

:::

## 命令：echo

- `echo <message>` - 显示指定的消息
- `echo on` / `echo off` - 启用/禁用**批处理文件**中命令的显示

::: warning 注意

- 要显示空行，可以使用 `echo.`
- 要显示特殊字符(包括 `|`, `&`, `<`, `>`, `^`)，在字符前面加上 `^` 进行转义

:::

## 命令：goto

> 特殊标签 `:eof` 表示文件结束，可以使用 `goto :eof` 结束批处理文件的执行

- `goto <label>` - 跳转到指定标签处继续执行

::: tip `<label>` 支持使用变量拼接

```bat
@echo off

choice /m "select your plan" /c 123

rem 这里使用变量拼接
goto :plan:%errorlevel%

:plan:1
echo this is plan1
goto :eof

:plan:2
echo this is plan2
goto :eof

:plan:3
echo this is plan3
goto :eof
```

:::

## 命令：call

- `call path-to-batch <arguments>` -- 调用另一个批处理文件
- `call :label <arguments>` -- 调用当前批处理文件中的另一个标签
- 使用 `%0`、`%1`、`%2` ... 获取参数，或使用 `%*` 获取所有参数
- 一般 `%0` 为当前批处理文件的路径或标签名，`%1` 开始为传入的参数

::: code-group

``` bat [以下代码会输出什么?] :line-numbers
@echo off
echo start
call :tag2
call :tag1

:tag1
echo tag1

:tag2
echo tag2
```

``` bat [步骤] :line-numbers
@echo off   1
echo start   2
call :tag2    3
call :tag1       6

:tag1             7    11
echo tag1          8     12

:tag2          4    9      13
echo tag2       5    10      14
```

```text [答案]
start   step 2
tag2    step 5
tag1    step 8
tag2    step 10
tag1    step 12
tag2    step 14
```

:::

## 命令：for

- 基本用法:
    - `for <variable> in (<set>) do <command> [<commandlineoptions>]`
- 遍历一定范围的值:
    - `for /l <variable> in (<start#>,<step#>,<end#>) do <command> [<commandlinepptions>]`
- 遍历并解析文件:
    - `for /f [<parsingkeywords>] <variable> in (<set>) do <command> [<commandlinepptions>]`
    - `for /f [<parsingkeywords>] <variable> in (<literalstring>) do <command> [<commandlinepptions>]`
    - `for /f [<parsingkeywords>] <variable> in ('<command>') do <command> [<commandlinepptions>]`

| `<parsingkeywords>` | 说明                                       |
|---------------------|------------------------------------------|
| eol=`<c>`           | 指定行结束字符（仅一个字符）                           |
| skip=`<n>`          | 跳过文件的前 `<n>` 行                           |
| delims=`<xxx>`      | 指定分隔符（默认为 `space` 和 `tab`）               |
| tokens=`<x,y,m-n>`  | 指定每行中的哪些标记要传递到每次迭代的for循环                 |
| usebackq            | 指定将反引号字符串作为命令运行，使用单引号字符串作为文字字符串或包含空格的文件名 |

::: tip `<variable>` 规则

- 在命令提示符中，使用 `%<name>` 访问变量
- 在批处理文件中，使用 `%%<name>` 访问变量
- `<literalstring>` 被视为文件中的单行输入
- 当使用 `/f <parsingkeywords>` 且 `parsingkeywords` 包含 `tokens` 时，会自动递增创建后续变量 (见 **eg1**)

:::

| `for /f ... <variable>` | 使用 `usebackq` | 不使用 `usebackq` |
|-------------------------|---------------|----------------|
| 文件                      | 无包裹           | 无包裹            |
| 字符串                     | 单引号 `'`       | 双引号 `"`        | 
| 命令                      | 反引号 `\``      | 单引号 `'`        |

::: code-group

```bat [基础]
// fruit.bat
@echo off

for %%c in (apple orange banana) do (
    echo i like %%c
)

// output
i like apple
i like orange
i like banana
```

```bat [范围]
// countdown.bat
@echo off

echo let's count down for 10 seconds
for /l %%c in (10,-1,0) do (
    echo %%c seconds left
    timeout /t 1 /nobreak >nul
)

// output
let's count down for 10 seconds
10 seconds left  // 以下每秒输出一行                
9 seconds left
8 seconds left
7 seconds left
6 seconds left
5 seconds left
4 seconds left
3 seconds left
2 seconds left
1 seconds left
0 seconds left
```

```bat [文件]
// groups.txt
alice bob carol
david edward frank

// group.bat
@echo off

echo each group has 3 students
echo.

for /f "delims=" %%g in (students.txt) do (
    echo next group:
    for %%s in (%%g) do (
        echo %%s
    )
    echo.
)

// output
hello alice!
hello bob!
hello carol!
```

```bat [命令]
// scan.bat
@echo off

echo let's see what's in the directory
for /f %%c in ('dir /b') do (
    echo we have %%c
)

// output
let's see what's in the directory
we have scan.bat
we have file1.js
we have file2.ts
we have file3.rs
we have file4.md
```

```bat [eg1]
// eg1.bat
@echo off

for /f "tokens=1,2" %%c in ("alice bob caro") do (
    echo hello, %%c! hello, %%d! and hello, %%e too!
                             ↑               ↑
)

// output
hello, alice! hello, bob! and hello, %e too!
```

:::

## 命令：if

- 判断文件是否存在
    - `if [not] exist <filename> <command> [else <command>]`
- 判断`errorlevel` 是否是指定值
    - `if [not] errorlevel <number> <command> [else <command>]`
    - `errorlevel` 为一个**0-255**的数字，表示上一个命令的返回值。通常 **0** 表示成功，**非0**表示失败
- 判断两字符串是否符合条件
    - `if [/i] [not] <string1> <cmpop> <string2> <command> [else <command>]`
    - `/i` 表示**不区分大小写**比较，并且如果 `string1` 和 `string2` 均仅由数字组成，则将字符串转换为数字并执行数字比较。
    - `<cmpop>` 指定 `==` 或**三个字母**的比较运算符
- 判断变量是否已定义
    - `if defined <variable> <command> [else <command>]`

| 比较运算符 | 说明   |
|-------|------|
| `==`  | 等于   |
| `equ` | 等于   |
| `neq` | 不等于  |
| `lss` | 小于   |
| `leq` | 小于等于 |
| `gtr` | 大于   |
| `geq` | 大于等于 |

## 参考

- [Windows Commands | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)