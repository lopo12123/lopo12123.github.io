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

> Note:
> - There should be no spaces on both sides of the redirection symbol, otherwise it will be treated as a parameter
> - `0/1/2` cannot be the target of append redirection, that is, `2>>1` is illegal

## References

- [Windows Commands | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)