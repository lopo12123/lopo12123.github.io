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

## 参考

- [Windows Commands | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)