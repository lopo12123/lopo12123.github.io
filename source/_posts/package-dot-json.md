---
title: 关于 package.json
date: 2023-12-23 23:02:44
tags:
  - node
  - js
categories:
  - Essay
---

一般而言，node项目主要分为两种类型：**应用程序**和**模块**。每个node项目都会有一个 `package.json` 文件，这个文件中包含了项目的一些描述和配置信息。

作为应用程序而言，`package.json` 中并没有明确要求必需的字段，即使其内容只是一个空对象`{}`也能正常运行；但是当我们将其作为模块发布到npm上时，就必须要求其包含一些必需的字段，否则npm会拒绝发布。

<!-- more -->

## 依赖相关字段

一个项目可能会依赖许多其他的包，这些包可能是开发时需要的，也可能是项目运行时需要的。将它们放置在不同的字段下有助于包管理工具更好地管理这些依赖。

### 格式

支持多种形式指定依赖:

- `version`：指定明确的版本号
- `>version`：大于某个版本
- `>=version`：大于等于某个版本
- `<version`：小于某个版本
- `<=version`：小于等于某个版本
- `~version`：大于等于某个版本，但是不改变大版本号
- `^version`：大于等于某个版本，但是不改变大版本号和小版本号
- `1.2.x`：大版本号和小版本号固定，但是不改变小版本号
- `version1 - version2`：指定一个范围，包含`version1`和`version2`，即`>=version1 <=version2`
- `range1 || range2`：指定多个范围的组合
- `*`：任意版本
- `""`：空字符串，等同于`*`
- `http://...`：指定一个`tarball`的url地址
- `git...`：指定一个git地址
- `user/repo`：指定一个github地址
- `tag`：指定tag版本
- `path`：指定一个本地路径

```json
{
    "dependencies": {
        "foo": "1.0.0 - 2.9999.9999",
        "bar": ">=1.0.2 <2.1.2",
        "baz": ">1.0.2 <=2.3.4",
        "boo": "2.0.1",
        "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
        "asd": "http://asdf.com/asdf.tar.gz",
        "til": "~1.2",
        "elf": "~1.2.3",
        "two": "2.x",
        "thr": "3.3.x",
        "lat": "latest",
        "dyl": "file:../dyl"
    }
}
```

### dependencies

`dependencies` 字段用于指定项目的生产环境依赖，即在项目运行时必须要加载的依赖包。比如一个`react`项目中，`react`和`react-dom`就是必须要加载的依赖包。

### devDependencies

开发依赖，项目开发环境需要用到而运行时不需要的依赖。通常包含以下几类：

- 项目工程化工具（如`webpack`、`vite`等）
- 样式预处理器（如`less`、`sass`等）
- 代码检查工具（如`eslint`、`prettier`等）
- 测试工具（如`jest`、`ava`、`mocha`等）
- 其他

### peerDependencies

在某些情况下，我们需要开发一些依赖于特定宿主的**插件**或**工具**，此时可以将此宿主作为`peerDependencies`以避免包管理工具重复下载。

例如开发一个`react`的组件库时，可以将`react`和`react-dom`作为`peerDependencies`，这样在安装组件库时，`react`和`react-dom`不会被下载，而是由宿主项目提供。

### peerDependenciesMeta

接上述，当某些宿主并非必需时，可以将其在`peerDependenciesMeta`中标记为可选，这样即使宿主不存在，包管理工具也不会报错。

例如开发一个跨框架的组件库时，可以将`react`和`vue`作为`peerDependencies`，并将其标记为可选，这样即使宿主项目中不存在`react`或`vue`，包管理工具也不会报错。用户可以根据自己的项目选择性安装。

```json
{
    "peerDependencies": {
        "react": "^16.0.0 || ^17.0.0",
        "vue": "^2.0.0 || ^3.0.0"
    },
    "peerDependenciesMeta": {
        "react": {
            "optional": true
        },
        "vue": {
            "optional": true
        }
    }
}
```

### bundleDependencies

用于指定项目打包时需要打包的依赖包。可以使用`npm pack`命令将项目打包为一个`tarball`，此时`bundleDependencies`字段会被用于指定需要打包的依赖包。

它可以被指定为一个数组（罗列需要打包的依赖项）或一个布尔值（`true`打包全部的依赖项；`false`不打包依赖项）。

通常情况下，我们不需要指定此字段，构建工具会自动识别项目中的依赖包并打包。

### optionalDependencies

可选依赖，当某些依赖包在安装时出现错误时，包管理工具会忽略这些错误并继续安装其他依赖包。

例如开发一个压缩工具时，可以将多个压缩库作为可选依赖，在应用内按照优先级依次尝试调用，如果某个库不存在，则调用下一个库。

### overrides & resolutions

`overrides`和`resolutions`字段用于指定依赖包的版本，通常用于解决依赖包版本冲突的问题。

支持嵌套，即可以在某个依赖包下指定其依赖包的版本。

```json5
{
    "overrides": {
        // 指定baz的版本为2.0.0
        "baz": "2.0.0",
        "foo": {
            // 指定foo的依赖包bar的版本为2.0.0
            "bar": "2.0.0"
        }
    }
}
```

## 命令相关字段

### scripts

`scripts`字段用于指定一些命令，可以通过`npm run`命令来执行这些命令。

```json
{
    "scripts": {
        "start": "node index.js"
    }
}
```

#### `Pre*` & `Post*` Hooks

默认情况下，`scripts`字段中的命令可以通过`pre`和`post`前缀来指定钩子，这些钩子会在命令执行前后自动执行。可以通过设置 `ignore-scripts` 参数来修改默认行为。

```json
{
    "scripts": {
        "pregreet": "echo 'pregreet'",
        "greet": "echo 'hello'",
        "postgreet": "echo 'postgreet'"
    }
}
```

执行`npm run greet`命令时，会依次执行`pregreet`、`greet`和`postgreet`命令。

{% note warning %}

注意:

- 某些包管理工具默认不执行`pre`和`post`钩子 (如`yarn`)。

{% endnote %}

### config

`config`字段中的数据会被转换为环境变量，其命名规则为`npm_package_config_<key>`。

```json
{
    "scripts": {
        "greet1": "node -e \"console.log(process.env.npm_package_config_greet)\"",
        "greet2": "echo %npm_package_config_greet%"
    },
    "config": {
        "greet": "Hi there!"
    }
}
```

```
// js 中访问
> npm run greet1
> Hi there!

// 命令中访问
> npm run greet2
> Hi there!
```

{% note warning %}

注意:

- 由于环境变量为字符串，因此`config`字段中的数据也会被转换为字符串。
    - 字符串 => 保持
    - 数字 => 转换为字符串
    - 布尔值 => 转换为字符串
    - 数组 => 各元素以空行分隔
    - 对象 => 丢失
- 某些包管理工具不支持`config`字段 (如`yarn`/`pnpm`)。

{% endnote %}

### bin

bin字段用于指定项目的可执行文件，通常用于命令行工具。

当包被安装时，会将`bin`字段中的可执行文件链接到`node_modules/.bin`目录下，从而可以在命令行中直接执行。

#### 单个命令

```json
{
    "name": "foo",
    "bin": "./bin/foo.js"
}
```

#### 多个命令

使用`<name>: <path>`的形式指定多个可执行文件:

```json
{
    "name": "foo",
    "bin": {
        "bar": "./bin/bar.js",
        "boz": "./bin/boz.js"
    }
}
```

或者使用`directories.bin`字段指定可执行文件所在的目录:

```json
{
    "name": "foo",
    "directories": {
        "bin": "./bin"
    }
}
```

{% note warning %}

注意:

- 使用`directories.bin`字段时，指定目录下的所有文件都会被添加为可执行文件。
- `bin`和`directories.bin`字段不能同时使用。

{% endnote %}

## 参考

- [npm Docs -- package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
