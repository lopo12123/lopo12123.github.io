---
layout: doc

# custom frontmatter properties
# the title of the post, will show up in the post list
topic: CMD
# a brief description of the post, will show up in the post list
brief: Collection of some commonly used cmd commands
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

> This page is about collection of some commonly used cmd commands

## General

- Get help
    - Use the command `help` to get a list of all available commands and their descriptions
    - Use the command `help <command>` to get help for a specific command
    - Use the command `<command> /?` to get help for a specific command (same as above)

- `\\` and `/`
    - `\\` is generally used as a **path separator** (e.g. `C:\\Users\\`)
    - `/` is generally used as a **command parameter** (e.g. `dir /a`)

- File descriptors
    - `0` - Standard input (default to keyboard)
    - `1` - Standard output (default to terminal display)
    - `2` - Standard error (default to terminal display)

- Redirection and pipe
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

::: warning Note

- There should be no spaces on both sides of the redirection symbol, otherwise it will be treated as a parameter
- `0/1/2` cannot be the target of append redirection, that is, `2>>1` is illegal

:::

## Command: set (environment variable)

- `set` - Display all environment variables
- `set <variable>` - Display the value of the specified environment variable
- `set <variable>=<value>` - Set the value of the specified environment variable
- `set /a <variable>=<expression>` - Set the value of the specified environment variable to the result of the specified expression
- `set /p <variable>=<prompt>` - Set the value of the specified environment variable to the user input
- `%<variable>%` - Use the value of the environment variable

::: warning Note

- Environment variable names are case-insensitive, that is, `set PATH=xxx` and `set path=xxx` have the same effect
- There should be no spaces on both sides of the `=`, otherwise it will be treated as a parameter, for example, `set PATH = xxx` will be treated as the `set PATH` command

:::

## Command: echo

- `echo <message>` - Display the specified message
- `echo on` / `echo off` - Enable/disable the display of commands **in the batch file**

::: warning Note

- To display a blank line, use `echo.`
- To display special characters (including `|`, `&`, `<`, `>`, `^`), add a `^`  immediately before the character to escape it

:::

## Command: goto

> The special label `:eof` means the end of the file, and `goto :eof` can be used to end the execution of the batch file

- `goto <label>` - Jump to the specified label to continue execution

## Command: call

- `call path-to-batch <arguments>` -- Call another batch file
- `call :label <arguments>` -- Call the specified label in the current batch file
- Use `%0`, `%1`, `%2` ... to get the arguments, or use `%*` to get all parameters
- Generally, `%0` is the path or label name of the current batch, and starting from `%1` is the incoming parameter.

::: code-group

``` bat [What will the following code output?] :line-numbers
@echo off
echo start
call :tag2
call :tag1

:tag1
echo tag1

:tag2
echo tag2
```

``` bat [Steps] :line-numbers
@echo off   1
echo start   2
call :tag2    3
call :tag1       6

:tag1             7    11
echo tag1          8     12

:tag2          4    9      13
echo tag2       5    10      14
```

```text [Answer]
start   step 2
tag2    step 5
tag1    step 8
tag2    step 10
tag1    step 12
tag2    step 14
```

:::

## Command: for

- Basic:
    - `for <variable> in (<set>) do <command> [<commandlineoptions>]`
- Iterating a range of values
    - `for /l <variable> in (<start#>,<step#>,<end#>) do <command> [<commandlinepptions>]`
- Iterating and file parsing
    - `for /f [<parsingkeywords>] <variable> in (<set>) do <command> [<commandlinepptions>]`
    - `for /f [<parsingkeywords>] <variable> in (<literalstring>) do <command> [<commandlinepptions>]`
    - `for /f [<parsingkeywords>] <variable> in ('<command>') do <command> [<commandlinepptions>]`

::: tip Rule of `<variable>`

- In the command prompt, use `%<name>` to access the variable
- In the batch file, use `%%<name>` to access the variable

:::

| `<parsingkeywords>` | Description                                                                                                                                     |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| eol=`<c>`           | Specifies an end of line character (just one character)                                                                                         |
| skip=`<n>`          | Specifies the number of lines to skip at the beginning of the file                                                                              |
| delims=`<xxx>`      | Specifies a delimiter set. This replaces the default delimiter set of space and tab.                                                            |
| tokens=`<x,y,m-n>`  | Specifies which tokens from each line are to be passed to the for loop for each iteration                                                       |
| usebackq            | Specifies to run a back-quoted string as a command, use a single-quoted string as a literal string, or, for long file names that contain spaces |

::: code-group

```bat [basic]
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

```bat [range of value]
// countdown.bat
@echo off

echo let's count down for 10 seconds
for /l %%c in (10,-1,0) do (
    echo %%c seconds left
    timeout /t 1 /nobreak >nul
)

// output
let's count down for 10 seconds
10 seconds left  // the following output one line per second                
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

```bat [file parsing]
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

```bat [command parsing]
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

:::

## Command: if

- Determine whether the file exists
    - `if [not] exist <filename> <command> [else <command>]`
- Determine whether `errorlevel` is the specified value
    - `if [not] errorlevel <number> <command> [else <command>]`
    - `errorlevel` is a number from **0-255**, indicating the return value of the previous command. Usually **0** means success, **non-0** means failure
- Determine whether two strings meet the conditions
    - `if [/i] [not] <string1> <cmpop> <string2> <command> [else <command>]`
    - `/i` means **case-insensitive** comparison, and if both `string1` and `string2` are comprised of numeric digits only, the strings are converted to numbers and a numeric comparison is performed
    - `<cmpop>` specifies `==` or a **three letter** comparison operator
- Determine whether the variable has been defined
    - `if defined <variable> <command> [else <command>]`

## References

- [Windows Commands | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)