﻿---
title: Two.js -- 自定义属性 (data-*)
category: javascript
created: 2024-09-20
updated: 2024-09-25
---

> Environment:
> - node.js v18.16.1
> - yarn\@3.6.4
> - two.js\@0.8.14

在**Two.js**的**SVG渲染器**下, 可以为SVG元素设置自定义属性(即`data-*`属性). 按照设置属性和渲染的时机可以分为以下两种情况:

- 在渲染前设置
- 在渲染后设置

## 渲染前设置

在将元素渲染到画布之前, 文档中并不存在实际的DOM元素. 需要先将目标属性设置到实例的`dataset`字段中, 在`render`方法中内部会将这些属性设置到实际的DOM元素上.

> 限制: 由于追加`dataset`属性的行为只在`group`的`render`方法中实现, 因此只有`Two.Group`的实例可以通过此方法设置自定义属性.

```js
const target = document.getElementById('target')
const two = new Two().appendTo(target)

const circle = new Two.Circle(20, 20, 10)
circle.fill = '#FF8000'
const rect = new Two.Rectangle(40, 40, 20, 20)
rect.fill = 'rgba(0, 200, 255, 0.75)'
const group = new Two.Group([ circle, rect ])

// set
group.dataset = {
    aaa: 'aaa',  // => data-aaa="aaa"
    abc: 'abc',  // => data-abc="abc"
    aAA: 'aAA',  // => data-a-a-a="aAA"
    bbB: 'bbB',  // => data-bb-b="bbB"
}
two.add(group)

// render
two.update()
```

## 渲染后设置

在将元素渲染到画布之后, 实例上的`_renderer.elem`属性保存了对应的DOM元素. 可以直接对DOM元素进行设置:

- 通过`dataset`字段设置
- 通过`setAttribute`方法设置

> 由于渲染到画布之后实际上操作的是DOM元素, 因此任何元素的实例都可以通过此方法设置自定义属性.

```js
const target = document.getElementById('target')
const two = new Two().appendTo(target)

const circle = new Two.Circle(20, 20, 10)
circle.fill = '#FF8000'
const rect = new Two.Rectangle(40, 40, 20, 20)
rect.fill = 'rgba(0, 200, 255, 0.75)'
const group = new Two.Group([ circle, rect ])
two.add(group)

// render
two.update()

// set
circle._renderer.elem.dataset['aaa'] = '111'
rect._renderer.elem.setAttribute('data-bbb', '222')
group._renderer.elem.dataset['ccc'] = '333'
group._renderer.elem.setAttribute('data-ddd', '444')
```

## References

- [Two.js](https://two.js.org/)
- [MDN -- data-*](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/data-*)
- [related code -- group.render](https://github.com/jonobr1/two.js/blob/258654b2cb70ab5502970c1d0c5373ec9639341b/src/renderers/svg.js#L306)
- [related code -- assign dataset](https://github.com/jonobr1/two.js/blob/258654b2cb70ab5502970c1d0c5373ec9639341b/src/renderers/svg.js#L409)
- [related issue](https://github.com/jonobr1/two.js/issues/575)
- [related pr](https://github.com/jonobr1/two.js/pull/578)
