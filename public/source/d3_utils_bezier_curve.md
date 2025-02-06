---
title: D3.js -- 工具函数 (贝塞尔曲线)
category: javascript
created: 2024-09-25
---

> Environment:
> - node.js v18.16.1
> - yarn\@3.6.4
> - d3\@v7.9.0

**d3-shape** 的 Links 模块提供了三次贝塞尔曲线的生成器. 通过 `d3.linkHorizontal` 和 `d3.linkVertical` 可以生成水平和垂直方向的三次贝塞尔曲线生成器.

## linkHorizontal

在每对点之间生成一条贝塞尔曲线，曲线在每个点处的切线都是水平的

## linkVertical

在每对点之间生成一条贝塞尔曲线，曲线在每个点处的切线都是竖直的

## 示例

![](/media/d3_utils_bezier_curve/horizontal.png)

生成函数 (以 `linkHorizontal` 为例)

```ts
const builder = () => {
    const source: [ number, number ] = [ 10, 10 ]
    const targets: [ number, number ][] = [ [ 90, 20 ], [ 90, 30 ], [ 90, 40 ], [ 90, 50 ], [ 90, 60 ], [ 90, 70 ], [ 90, 80 ], [ 90, 90 ] ]

    const link = d3.linkHorizontal()

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
     width="100" height="100" viewBox="0 0 100 100"
     fill="none">
    <g stroke="none" fill="red">
        <circle cx="${ source[0] }" cy="${ source[1] }" r="1"/>
        ${ targets.map(([ cx, cy ]) => `<circle cx="${ cx }" cy="${ cy }" r="1"/>`).join('\n') }
    </g>
    
    <g stroke="red" stroke-width="0.5">
        ${ targets.map(target => `<path d="${ link({ source, target }) }"/>`).join('\n') }
    </g>
</svg>`

    console.log('svg', svg)
}
```

生成的svg

```svg

<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
     width="100" height="100" viewBox="0 0 100 100"
     fill="none">
    <g stroke="none" fill="red">
        <circle cx="10" cy="10" r="1"/>
        <circle cx="90" cy="20" r="1"/>
        <circle cx="90" cy="30" r="1"/>
        <circle cx="90" cy="40" r="1"/>
        <circle cx="90" cy="50" r="1"/>
        <circle cx="90" cy="60" r="1"/>
        <circle cx="90" cy="70" r="1"/>
        <circle cx="90" cy="80" r="1"/>
        <circle cx="90" cy="90" r="1"/>
    </g>

    <g stroke="red" stroke-width="0.5">
        <path d="M10,10C50,10,50,20,90,20"/>
        <path d="M10,10C50,10,50,30,90,30"/>
        <path d="M10,10C50,10,50,40,90,40"/>
        <path d="M10,10C50,10,50,50,90,50"/>
        <path d="M10,10C50,10,50,60,90,60"/>
        <path d="M10,10C50,10,50,70,90,70"/>
        <path d="M10,10C50,10,50,80,90,80"/>
        <path d="M10,10C50,10,50,90,90,90"/>
    </g>
</svg>
```

## References

- [d3-shape Links](https://d3js.org/d3-shape/link)
