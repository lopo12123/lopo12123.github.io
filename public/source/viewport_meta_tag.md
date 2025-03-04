﻿---
title: Viewport meta tag
category: html
created: 2024-07-04
---

在移动设备上, 布局视口通常比屏幕的逻辑尺寸要大. 为了适应屏幕的大小, 移动设备浏览器会缩放网页内容. 但是, 有时候我们希望网页的布局视口和视觉视口大小相同 (此时文档对象的宽度和屏幕宽度相同), 这时候就需要使用 `meta` 标签来控制.

## 关于 Viewport

- 布局视口 (Layout viewport): 文档(`document`)的逻辑尺寸. 一些常见的移动设备浏览器通常具有默认的布局视口宽度，例如 iPhone Safari 的布局视口宽度为 980px.
- 视觉视口 (Visual viewport): 用户正在看到的网页区域. 用户可以通过缩放和滚动来改变视觉视口的大小和位置.

## 属性 & 描述 & 取值

| 属性              | 描述                    | 值                                                                                    |
|-----------------|-----------------------|--------------------------------------------------------------------------------------|
| `width`         | 设置布局视口的宽度             | - 正整数<br/>- `device-width`                                                           |
| `height`        | 设置布局视口的高度 (不被任何浏览器使用) | - 正整数<br/>- `device-height`                                                          |
| `initial-scale` | 设置页面的初始缩放比例           | [0.0, 10.0]                                                                          |
| `minimum-scale` | 设置页面的最小缩放比例           | [0.0, 10.0]                                                                          |
| `maximum-scale` | 设置页面的最大缩放比例           | [0.0, 10.0]                                                                          |
| `user-scalable` | 是否允许用户缩放页面            | - `yes`/`no`<br/>- 默认为`yes`                                                          |
| `viewport-fit`  | 控制页面在视觉视口中的显示方式       | - `auto`: 不影响初始布局<br/>- `contain`: 布局视口被放缩使得屏幕能够展示完整<br/>- `cover`: 布局视口被放缩使得视觉视口被填充 |

> 关于 `minimum-scale`, `initial-scale`, `maximum-scale`
>
> 1. 要求 `minimum-scale` <= `initial-scale` <= `maximum-scale`, 否则为未定义行为.
> 2. MDN 中描述称 iOS10+ 默认忽略这些属性, 但实际测试中仍然生效.

## 常见问题

iOS Safari 中点击输入框时, 页面会自动缩放. 这是因为 iOS Safari 会自动缩放页面以适应输入框的大小. 为了避免这种情况, 可以通过使用 `user-scalable=no` 来禁止用户缩放页面. 同时为了避免页面被缩放, 可以设置 `initial-scale=1.0` 和 `maximum-scale=1.0`.

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My Document</title>
    </head>
    <body>
        <p>Focus the input box below and see if the page zooms in.</p>
        <input type="text">
    </body>
</html>
```

## References

- [MDN -- Viewport](https://developer.mozilla.org/en-US/docs/Glossary/Viewport)
- [MDN -- Layout Viewport](https://developer.mozilla.org/en-US/docs/Glossary/Layout_viewport)
- [MDN -- Visual Viewport](https://developer.mozilla.org/en-US/docs/Glossary/Visual_Viewport)
- [MDN -- Visual Viewport Api](https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API)
