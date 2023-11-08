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

> 参阅[快速入门](https://docs.github.com/zh/actions/quickstart#introduction)了解更多信息

1. 如果该目录不存在，则在存储库中创建一个`.github/workflows`目录。
2. 在`.github/workflows`目录中，创建一个`<workflow-name>.yml`文件来定义工作流程配置。
3. 当指定的事件发生时，工作流程将自动触发。

## 概念

### 工作流

> 参阅[使用工作流](https://docs.github.com/zh/actions/using-workflows)了解更多信息

- 工作流由`.github/workflows` 下的`<workflow-name>.yml`文件定义，并将在存储库中的**事件触发**时运行，也可以**手动触发**或按**定义的计划**触发。
- 一个存储库可以有多个工作流，每个工作流可以执行一组不同的任务

### 事件

> 参阅[触发工作流的事件](https://docs.github.com/zh/actions/using-workflows/events-that-trigger-workflows)了解更多信息

- TODO

### 作业

> 参阅[使用作业](https://docs.github.com/zh/actions/using-jobs)了解更多信息

- TODO

### 操作

> 参阅[创建操作](https://docs.github.com/zh/actions/creating-actions)了解更多信息

- TODO

### 运行器

> 参阅[使用 GitHub 托管的运行器](https://docs.github.com/zh/actions/using-github-hosted-runners/about-github-hosted-runners)了解更多信息

- TODO

## 参考

- [GitHub Marketplace](https://github.com/marketplace?type=actions)
- [GitHub Actions documentation](https://docs.github.com/en/actions)