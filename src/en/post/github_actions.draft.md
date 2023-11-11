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

## References

- [GitHub Marketplace](https://github.com/marketplace?type=actions)
- [GitHub Actions documentation](https://docs.github.com/en/actions)