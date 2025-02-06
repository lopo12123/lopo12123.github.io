---
title: package.json
category: javascript
created: 2023-12-23
---

一般而言，node项目主要分为两种类型：**应用程序**和**模块**。每个node项目都会有一个 `package.json` 文件，这个文件中包含了项目的一些描述和配置信息。

作为应用程序而言，`package.json` 中并没有明确要求必需的字段，即使其内容只是一个空对象`{}`也能正常运行；但是当我们将其作为模块发布到npm上时，就必须要求其包含一些必需的字段，否则npm会拒绝发布。

## 基本信息

- `name <string>`: 包名，作为npm包的唯一标识符且需要URl安全。（可以使用 `@<scope>/<name>` 的形式指定作用域）
- `version <string>` 版本号，遵循 [semver](https://semver.org/lang/zh-CN/) 规范。
- `description <string>`: 包的描述信息，用于`npm search`。
- `keywords <string[]>`: 关键词，用于`npm search`。
- `homepage <string>`: 包的主页。
- `bugs <string>`: 提交bug的地址。
- `license <string>`: 许可证信息，使用 [SPDX](https://spdx.org/licenses/) 标准。
- `author <string | Object>` & `contributors <(string | Object)[]>` & `maintainers <(string | Object)[]>`: 作者、贡献者和维护者信息。
    - `Object` 包含如下字段:
        - `name <string>`: 名称。
        - `email <string>`: 邮箱。
        - `url <string>`: 网址。
    - 使用 `name<email>(url)` 形式简化
- `repository <string | Object>`: 指定项目所在位置。需要是**公开**（可以是只读）且能被 VCS 工具直接处理的。
    - `Object` 包含如下字段:
        - `type <string>`: 类型（如 `git`）
        - `url`: 地址
        - `directory`: 目录（可选，mono-repo 时使用）
    - 使用 `<type>:<url>` 形式简化

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

> 某些包管理工具默认不执行`pre*`和`post*` hooks
>
> - yarn: `2.x` (berry) 开始不默认执行 [yarn | enableScripts](https://yarnpkg.com/configuration/yarnrc#enableScripts)
> - pnpm: `5.x` 开始不默认执行 [pnpm | enable-pre-post-scripts](https://pnpm.io/cli/run#enable-pre-post-scripts)

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

```shell
# js 中访问
npm run greet1
# stdout: Hi there!

# 命令中访问
npm run greet2
# stdout: Hi there!
```

> 由于环境变量为字符串，因此`config`字段中的数据也会被转换为字符串。
>   - 字符串 => 保持
>   - 数字 => 转换为字符串
>   - 布尔值 => 转换为字符串
>   - 数组 => 各元素以空行分隔
>   - 对象 => 丢失
>
> 某些包管理工具不支持`config`字段 (如`yarn`/`pnpm`)。

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

> - 使用`directories.bin`字段时，指定目录下的所有文件都会被添加为可执行文件。
> - `bin`和`directories.bin`字段不能同时使用。

## 文件相关字段

### type

用于指定项目为`module`或`commonjs`。

#### module

指定type为`module`时，项目会被视为ES模块，即可以使用`import`和`export`语法。此时需要使用`.cjs`后缀来标识`commonjs`模块。

#### commonjs (默认)

指定type为`commonjs`时，项目会被视为`commonjs`模块，即可以使用`require`和`module.exports`语法。此时需要使用`.mjs`后缀来标识ES模块。

### main & module & browser

`main`、`module`和`browser`字段用于指定项目的入口文件。

当一个项目同时设置了其中的多个字段时，一些包管理工具和构建工具会根据当前环境自动选择合适的入口文件。

```json
{
    "main": "./index.js",
    "browser": "./browser/index.js",
    "module": "./index.mjs"
}
```

#### main

`main`字段用于指定项目的入口文件。（默认为`index.js`）

当用户使用 `require(MODULE_ID)` 导入项目时，会导入`main`字段指定的文件。

#### module

`module`字段用于指定项目的ES模块入口文件。

当用户使用 `import MODULE_ID` 导入项目时，会导入`module`字段指定的文件。

#### browser

如果包只支持在浏览器中运行，则应该使用`browser`字段代替`main`字段指定入口文件。这有助于提示用户它可能依赖于Node中不可用的内容。

[//]: # (FIXME: hack for https://github.com/next-theme/hexo-theme-next/issues/743)

### exports&nbsp;

`Node 12.7.0`新增了`main`的替代方案`exports`，它支持**子路径导出**和**条件导出**。

#### 子路径导出

`exports`字段可以指定子路径，当用户导入这个子路径时，会导入`exports`字段中匹配的文件。

```json
{
    "exports": {
        ".": "./index.js",
        "./sub1": "./path/to/sub1.js",
        "./sub2": "./path/to/sub2.js"
    }
}
```

#### 条件导出

条件导出提供了一种根据使用情况映射到不同路径的方法。

```json
{
    "exports": {
        "import": "./index-module.js",
        "require": "./index-require.cjs"
    }
}
```

Node 提供了以下条件（按范围从小到大排序）：

- `node-addons`: 提供了使用了本机模块的入口点（区别于使用了纯 JavaScript 的入口点）。（可被`--no-addons`标志禁用）
- `node`: `CJS`或`ESM`文件。
- `import`: 使用`import`或`import()`导入的文件入口。
- `require`: 使用`require()`导入的文件入口。可以是`CJS`、`JSON`或`native addons`。
- `default`: 作为默认和后备导出。

> - 当使用子路径导出时，只有已被定义的子路径才会被导出，尝试从其他路径导入会导致错误。（即使这些路径确实存在于文件系统中）
> - 两种导出方式可以混合使用。
> - 条件导出不检查目标的格式是否与条件兼容，需要开发者自行保证。

## 发布相关字段

### private

用于指定项目是否为私有项目，如果设置为`true`，则包管理工具会拒绝发布。

```json
{
    "private": true
}
```

### publishConfig

用于指定发布时的配置（覆盖`.npmrc`中的配置）。

常用:

- `access`: 指定包的访问级别，可选值为`public`和`restricted`。（第一次发布 scoped package 时，必须指定为`public`）
- `registry`: 指定包的发布地址。

```json
{
    "publishConfig": {
        "access": "public",
        "registry": "https://registry.npmjs.org"
    }
}
```

## 环境相关字段

### engines

用于指定项目运行所需的`node`和`npm`版本。

```json
{
    "engines": {
        "node": ">=18.0.0",
        "npm": ">=9.0.0"
    }
}
```

> 默认情况下，作为库提供时，此字段仅供参考（即不兼容时为 warning 而非 error）。可以使用 [`engine-strict`](https://docs.npmjs.com/cli/v10/using-npm/config#engine-strict) 标志要求严格匹配。

### os

用于指定项目运行的操作系统。

```json
{
    "os": [
        "darwin",
        "linux"
    ]
}
```

可以使用 `!` 前缀来排除某些操作系统。

```json
{
    "os": [
        "!win32"
    ]
}
```

> npm使用 `process.platform` 检查当前操作系统。

### cpu

用于指定项目运行的CPU架构。

```json
{
    "cpu": [
        "x64",
        "arm64"
    ]
}
```

## 参考

- [npm Docs -- package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [Node.js documentation -- exports](https://nodejs.org/api/packages.html#exports)
