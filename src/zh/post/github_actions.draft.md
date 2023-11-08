---
layout: doc

# custom frontmatter properties
# the title of the post, will show up in the post list
topic: Github Actions
# a brief description of the post, will show up in the post list
brief: GitHub Actions是GitHub平台提供的一项功能，用于自动化构建、测试和部署软件项目。它可以让我们在特定的事件（如push 、pull request 事件等）或条件发生（如特定时间执行等）时执行自定义的工作流程。
# a list of platforms the post is about, will show up in the 'tag-bar'
#platform:
# a list of programming languages the post is about, will show up in the 'tag-bar'
language:
  - yml
# a list of tags the post is about, will show up in the 'tag-bar'
tag:
  - CI/CD
  - Github Actions
  - Workflow
---

# GitHub Actions

> 本页介绍`GitHub Actions`。

## 设置

- 如果该目录不存在，请在存储库中创建一个`.github/workflows`目录。
- 在`.github/workflows`目录中，创建一个`<name>.yml`文件来定义工作流程配置。
- 然后当您指定的事件发生时，工作流程将自动触发。


## 参考

- [GitHub Marketplace](https://github.com/marketplace?type=actions)
- [GitHub Actions documentation](https://docs.github.com/en/actions)