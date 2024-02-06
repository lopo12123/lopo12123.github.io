---
title: CMD
date: 2023-12-15 10:47:36
tags:
  - CMD
  - Windows
categories:
  - Essay
---

Collection of some commonly used cmd commands

<!-- more -->

## General

### Get help

- Use the command `help` to get a list of all available commands and their descriptions
- Use the command `help <command>` to get help for a specific command
- Use the command `<command> /?` to get help for a specific command (same as above)

### `\\` and `/`

- `\\` is generally used as a **path separator** (e.g. `C:\\Users\\`)
- `/` is generally used as a **command parameter** (e.g. `dir /a`)

### File descriptors

- `0` - Standard input (default to keyboard)
- `1` - Standard output (default to terminal display)
- `2` - Standard error (default to terminal display)

### Redirection and pipe

- `>` - **Output** redirection
- `>>` - **Output** redirection (append)
- `<` - **Input** redirection
- `<<` - **Input** redirection (append)
- `|` - Pipe (use the **output** of the previous command as the **input** of the next command)

| Command                       | Description                                                                              |
|-------------------------------|------------------------------------------------------------------------------------------|
| `command>filename`            | Redirect the output of the command to a file                                             |
| `command 1>filename`          | Redirect the standard output of the command to a file                                    |
| `command 2>filename`          | Redirect the standard error of the command to a file                                     |
| `command>filename 2>&1`       | Redirect the standard output and standard error of the command to a file                 |
| `command>>filename`           | Redirect the output of the command to a file (append)                                    |
| `command<filename`            | Use the file as the input of the command                                                 |
| `command<filename1>filename2` | Use file 1 as the input of the command, and redirect the output of the command to file 2 |
| `command>&m`                  | Use file descriptor m as the output of the command                                       |
| `command<&m`                  | Use file descriptor m as the input of the command                                        |
| `command1\|command2`          | Use the output of command 1 as the input of command 2                                    |

{% note warning %}

**Notes**

- There should be no spaces on both sides of the redirection symbol, otherwise it will be treated as a parameter
- `0/1/2` cannot be the target of append redirection, that is, `2>>1` is illegal

{% endnote %}

## ERRORLEVEL

In CMD, `errorlevel` is an **internal state** used to indicate the return value of the previous command. It is a number from **0-255**, usually **0** means success, **non-0** means failure.

### Use with `set errorlevel=<value>`

When command extensions are enabled, executing `echo %errorlevel%` will first look for the **environment variable** `errorlevel`, and if not found, will look for the **internal status** `errorlevel`. Therefore, executing `set errorlevel=<value>` only sets an **environment variable** and **does not affect** the **internal status** `errorlevel`.

{% tabs errorlevel-env %}
<!-- tab Environment Variable -->

```batch
// test.bat
set errorlevel=1
echo %errorlevel%

// output
1  // this is the value of the environment variable
```

<!-- endtab -->
<!-- tab Internal Status -->

```batch
// test.bat
echo %errorlevel%

// output
0  // this is the value of the internal status
```

<!-- endtab -->
{% endtabs %}

### Use with `if`

- `if errorlevel <number> <command>` will **always** use the internal status `errorlevel` for comparison, set the environment variable `errorlevel` has **no effect** on it.
- `if %errorlevel% == <string> <command>` use variable expansion in the comparison, therefore it is **impossible** to determine whether the `errorlevel` used is the internal status or an environment variable.

{% tabs errorlevel-if %}
<!-- tab Comparison 1.1 -->

```batch
// test.bat
if errorlevel 2 (
echo two--%errorlevel%
) else if errorlevel 1 (
echo one--%errorlevel%
) else (
echo zero--%errorlevel%
)

// output
zero--0  // compare: internal status, output: internal status
```

<!-- endtab -->
<!-- tab Comparison 1.2 -->

```batch
// test.bat
set errorlevel=2

if errorlevel 2 (
echo two--%errorlevel%
) else if errorlevel 1 (
echo one--%errorlevel%
) else (
echo zero--%errorlevel%
)

// output
zero--2  // compare: internal status, output: environment variable
```

<!-- endtab -->
<!-- tab Comparison 2.1 -->

```batch
// test.bat
if %errorlevel% geq 2 (
echo two--%errorlevel%
) else if %errorlevel% geq 1 (
echo one--%errorlevel%
) else (
echo zero--%errorlevel%
)

// output
zero--0  // compare: environment variable, output: environment variable
```

<!-- endtab -->
<!-- tab Comparison 2.2 -->

```batch
// test.bat
set errorlevel=2

if %errorlevel% geq 2 (
echo two--%errorlevel%
) else if %errorlevel% geq 1 (
echo one--%errorlevel%
) else (
echo zero--%errorlevel%
)

// output
two--2  // compare: environment variable, output: environment variable
```

<!-- endtab -->
{% endtabs %}

## Command: setlocal/endlocal

Starts localization of environment variables in a batch file. Localization continues until a matching `endlocal` command is encountered or the end of the batch file is reached.

``` batch
setlocal [enableextensions | disableextensions] [enabledelayedexpansion | disabledelayedexpansion]
```

### Parameters

| Parameter                  | Description                                                                                            |
|----------------------------|--------------------------------------------------------------------------------------------------------|
| `enableextensions`*        | Enables the command extensions until the matching endlocal command is encountered                      |
| `disableextensions`        | Disables the command extensions until the matching endlocal command is encountered                     |
| `enabledelayedexpansion`   | Enables the delayed environment variable expansion until the matching endlocal command is encountered  |
| `disabledelayedexpansion`* | Disables the delayed environment variable expansion until the matching endlocal command is encountered |

> `*` means default

### _delayedexpansion_

When CMD interprets a command, it will first read a **complete** command in the command line, and then perform some command format matching operations on it. If a variable (such as `%name%`) is used in the command, CMD will find the value corresponding to the variable when performing format matching on the command, **replace** the variable with the value of the variable, and then execute the **replaced** command. This process of replacing values is called **variable expansion**.

However, when we use `for`(loop) and `if`(block), the variable expansion will be performed **before** the loop/block starts, and the value of the variable will **not be updated** during execution.In this case, we can use `enabledelayedexpansion` to **delay** the variable expansion **until** the command is executed.

{% note warning %}

**Notes**

When the `enabledelayedexpansion` is enabled, use `!` instead of `%` to access the variable. That is, `!name!` rather than `%name%`.

{% endnote %}

{% tabs setlocal-delayedexpansion %}
<!-- tab Without delayedexpansion 1 -->

```batch
// loop.bat
for /l %%i in (1,1,5) do (
    set ptr=%%i
    echo %ptr%
)

// output
ECHO is off.  // When the variable value is empty, this will be output
ECHO is off.
ECHO is off.
ECHO is off.
ECHO is off.
```

<!-- endtab -->
<!-- tab Without delayedexpansion 2 -->

```batch
// loop.bat
set ptr=0
for /l %%i in (1,1,5) do (
    set ptr=%%i
    echo %ptr%
)

// output
0
0
0
0
0
```

<!-- endtab -->
<!-- tab With delayedexpansion -->

```batch
// loop.bat
@echo off

setlocal enabledelayedexpansion

rem set ptr=0  // This line has no effect on the result whether it is commented out or not
for /l %%i in (1,1,5) do (
    set ptr=%%i
    echo !ptr!
)

endlocal

// output
1
2
3
4
5
```

<!-- endtab -->
{% endtabs %}

## Command: set (environment variable)

- `set` - Display all environment variables
- `set <variable>` - Display the value of the specified environment variable
- `set <variable>=<value>` - Set the value of the specified environment variable
- `set /a <variable>=<expression>` - Set the value of the specified environment variable to the result of the specified expression
- `set /p <variable>=<prompt>` - Set the value of the specified environment variable to the user input
- `%<variable>%` - Use the value of the environment variable

{% note warning %}

**Notes**

- Environment variable names are case-insensitive, that is, `set PATH=xxx` and `set path=xxx` have the same effect
- There should be no spaces on both sides of the `=`, otherwise it will be treated as a parameter, for example, `set PATH = xxx` will be treated as the `set PATH` command

{% endnote %}

## Command: echo

- `echo <message>` - Display the specified message
- `echo on` / `echo off` - Enable/disable the display of commands **in the batch file**

{% note warning %}

**Notes**

- To display a blank line, use `echo.`
- To display special characters (including `|`, `&`, `<`, `>`, `^`), add a `^`  immediately before the character to escape it

{% endnote %}

## Command: goto

`goto <label>` -- Jump to the specified label to continue execution

```batch
@echo off

choice /m "select your plan" /c 123

rem here we use variable splicing
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

{% note warning %}

**Notes**

- The special label `:eof` means the end of the file, and `goto :eof` can be used to end the execution of the batch file.
- The `<label>` supports variable splicing

{% endnote %}

## Command: call

- `call path-to-batch <arguments>` -- Call another batch file
- `call :label <arguments>` -- Call the specified label in the current batch file
- Use `%0`, `%1`, `%2` ... to get the arguments, or use `%*` to get all parameters
- Generally, `%0` is the path or label name of the current batch, and starting from `%1` is the incoming parameter.

{% tabs call %}
<!-- tab Example -->

```batch
@echo off
echo start
call :tag2
call :tag1

:tag1
echo tag1

:tag2
echo tag2
```

<!-- endtab -->
<!-- tab Steps -->

```batch
@echo off   1
echo start   2
call :tag2    3
call :tag1       6

:tag1             7    11
echo tag1          8     12

:tag2          4    9      13
echo tag2       5    10      14
```

<!-- endtab -->
<!-- tab Result -->

```batch
start   step 2
tag2    step 5
tag1    step 8
tag2    step 10
tag1    step 12
tag2    step 14
```

<!-- endtab -->
{% endtabs %}

## Command: for

### Basic

`for <variable> in (<set>) do <command> [<commandlineoptions>]`

### Iterating a range of values

`for /l <variable> in (<start#>,<step#>,<end#>) do <command> [<commandlinepptions>]`

### Iterating and file parsing

- `for /f [<parsingkeywords>] <variable> in (<set>) do <command> [<commandlinepptions>]`
- `for /f [<parsingkeywords>] <variable> in (<literalstring>) do <command> [<commandlinepptions>]`
- `for /f [<parsingkeywords>] <variable> in ('<command>') do <command> [<commandlinepptions>]`

| `<parsingkeywords>` | Description                                                                                                                                     |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| eol=`<c>`           | Specifies an end of line character (just one character)                                                                                         |
| skip=`<n>`          | Specifies the number of lines to skip at the beginning of the file                                                                              |
| delims=`<xxx>`      | Specifies a delimiter set. This replaces the default delimiter set of space and tab.                                                            |
| tokens=`<x,y,m-n>`  | Specifies which tokens from each line are to be passed to the for loop for each iteration                                                       |
| usebackq            | Specifies to run a back-quoted string as a command, use a single-quoted string as a literal string, or, for long file names that contain spaces |

{% note warning %}

- In the command prompt, use `%<name>` to access the variable
- In the batch file, use `%%<name>` to access the variable
- `<literalstring>` is treated as a single line of input from a file
- When `/f <parsingkeywords>` is used and `parsingkeywords` contains `tokens`, subsequent variables will be automatically incremented (see **eg1**)

{% endnote %}

| `for /f ... <variable>` | with `usebackq` | without `usebackq` |
|-------------------------|-----------------|--------------------|
| file parsing            | no wrap         | no wrap            |
| literal string          | single quotes ' | double quotes "    |
| command parsing         | backquotes `    | single quotes '    |

