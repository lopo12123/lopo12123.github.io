---
title: Github Actions
date: 2023-12-16 21:58:34
tags:
  - CI/CD
  - Github Actions
  - Workflow
categories:
  - Misc
---

GitHub Actions 是一种持续集成和持续交付 (CI/CD) 平台，可用于自动执行生成、测试和部署管道。可以创建工作流程来构建和测试存储库的每个拉取请求，或将合并的拉取请求部署到生产环境。

<!-- more -->

GitHub 提供 Linux、Windows 和 macOS 虚拟机来运行工作流，也可以在自己的数据中心或云基础架构中托管自己的自托管运行器。

## 设置

{% note info %}

参考: [快速入门](https://docs.github.com/zh/actions/quickstart#introduction)

{% endnote %}

1. 在存储库中创建一个`.github/workflows`目录。
2. 在`.github/workflows`目录中，创建一个`<workflow-name>.yml`文件来定义工作流的配置。
3. 当指定的事件发生时，工作流程将自动触发。

## 概念

### 工作流 (Workflow)

{% note info %}

参考: [使用工作流](https://docs.github.com/zh/actions/using-workflows)

{% endnote %}

- 工作流由`.github/workflows` 下的`<workflow-name>.yml`文件定义，将在存储库中的**事件触发**时运行，也可以**手动触发**或按**定义的计划**触发。
- 一个存储库可以有多个工作流，每个工作流可以执行一组不同的任务

### 事件 (Event)

{% note info %}

参考: [触发工作流的事件](https://docs.github.com/zh/actions/using-workflows/events-that-trigger-workflows)

{% endnote %}

事件是存储库中触发工作流的特定行为。

### 作业 (Job)

{% note info %}

参考: [使用作业](https://docs.github.com/zh/actions/using-jobs)

{% endnote %}

- 作业是工作流程中在**同一**运行器上执行的一组**步骤**。
- **步骤**按顺序执行，并且彼此之间有依赖关系。
- 默认情况下，作业没有依赖关系，并且**并行**运行。可以配置作业与其他作业的依赖关系。当一个作业依赖于另一个作业时，它将在运行之前等待依赖的作业完成。

### 操作 (Action)

{% note info %}

参考: [创建操作](https://docs.github.com/zh/actions/creating-actions)

{% endnote %}

操作是GitHub Actions平台的自定义应用程序，用于执行**复杂但频繁重复**的任务。使用操作可帮助减少工作流文件中编写的重复代码量。

### 运行器 (Runner)

{% note info %}

参考: [使用 GitHub 托管的运行器](https://docs.github.com/zh/actions/using-github-hosted-runners/about-github-hosted-runners)

{% endnote %}

- 运行器是在触发工作流时运行工作流的**服务器**。
- 每个工作流运行都在**新配置**的虚拟机中执行。

## Architecture

```yaml
name: basic-demo
env:
  USERNAME: "lopo"
on:
  push:
    branches: [ master ]
jobs:
  greet-to-user-with-nodejs:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Create Greeter
        run: |
          echo console.log("Hi, ${{ env.USERNAME }}!") > greeter.js
      - name: Greet to user
        run: node greeter.js
```

- **L1**: The **name** of the workflow as it will appear in the `Actions` tab of the GitHub repository. If this field is omitted, the name of the workflow file will be used instead.
- **L2-3**: The environment variables that are available to all jobs and steps in the workflow. In this case, the environment variable `USERNAME` is set to `lopo`.
- **L4-6**: Specifies the **trigger** for this workflow. In this case, the workflow will be triggered when a push event occurs on the master branch.
- **L7**: Groups together all the **jobs** that run in this **workflow**.
- **L8**: Defines a job named `greet-to-user-with-nodejs`.
- **L9**: Specifies the type of machine to run the job on. In this case, the job will run on a `ubuntu-latest` machine.
- **L10**: Groups together all the **steps** that run in this **job**.
- **L11, 13, 17, 20**: Defines the name of the step. This is optional, but it is recommended to provide a descriptive name for each step.
- **L12, 14**: Specifies the **action** to run using the `uses` keyword.
- **L15-16**: Specifies come **arguments** for the action. In this case, the `node-version` argument is set to `18`.
- **L18-19, 21**: Specifies the **command** to run using the `run` keyword.
- We can use the <span v-pre>`${{ variable }}`</span> syntax to access the variables defined in the workflow file. In this case, the `USERNAME` environment variable is accessed in the `Create Greeter` step using the <span v-pre>`${{ env.USERNAME }}`</span> syntax.

## References

- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [GitHub Marketplace](https://github.com/marketplace?type=actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)