---
layout: doc

# custom frontmatter properties
# the title of the post, will show up in the post list
topic: Github Actions
# a brief description of the post, will show up in the post list
brief: GitHub Actions is a feature provided by the GitHub for automating the building, testing, and deployment of software projects. It allows us to execute customized workflows when specific events (such as push, pull request events, etc.) or conditions (such as execution at a specific time, etc.) occur.
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

> This page is about `GitHub Actions`.

## Setup

> Refer to [Quickstart](https://docs.github.com/en/actions/quickstart) for more information

1. Create a `.github/workflows` directory in your repository if this directory does not already exist.
2. In the `.github/workflows` directory, create a `<name>.yml` file to define your workflow configuration.
3. The workflow will be automatically triggered when the event you specified occurs.

## Concepts

### Workflow

> Refer to [Using workflows](https://docs.github.com/en/actions/using-workflows) for more information

- Workflows are defined by `<workflow-name>.yml` files under `.github/workflows` and will run when triggered by **events** in the repository, either **manually** or on a **defined schedule**.
- A repository can have multiple workflows, each of which can perform a different set of tasks.

### Event

> Refer to [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows) for more information

An event is a specific activity in a repository that triggers a workflow run.

### Job

> Refer to [Using jobs](https://docs.github.com/en/actions/using-jobs) for more information

- A job is a set of **steps** in a workflow that is executed on the **same** runner.
- **Steps** are executed **in order** and are dependent on each other.
- By default, jobs have no dependencies and run in **parallel** with each other. You can configure a job's dependencies with other jobs. When a job takes a dependency on another job, it will wait for the dependent job to complete before it can run.

### Action

> Refer to [Creating actions](https://docs.github.com/en/actions/creating-actions) for more information

An action is a custom application for the GitHub Actions platform that performs a **complex but frequently repeated** task. Use an action to help reduce the amount of repetitive code that you write in your workflow files.

### Runner

> Refer to [Using GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) for more information

- A runner is a **server** that runs the workflow when it is triggered.
- Each workflow runs in a **fresh, newly-provisioned** virtual machine.

## Architecture

```yaml :line-numbers
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