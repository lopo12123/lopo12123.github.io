---
title: CSS 实现文字的 Shimmer 效果
category: css
created: 2024-08-20
---

## 效果

![](/media/css_text_shimmer/css_text_shimmer.gif)

## CSS

```css
:root {
    /* 高亮区域宽度 */
    --shimmer-width: 54px;

    /* 纯色 */
    /*--shimmer-color: linear-gradient(90deg, red, red);*/

    /* 渐变 */
    --shimmer-color: linear-gradient(90deg, white, blue, white);

    /* 动画时长 */
    --shimmer-duration: 2s;
}

@keyframes shimmer {
    0% {
        background-position-x: calc(0 - var(--shimmer-width));
    }
    100% {
        background-position-x: calc(100% + var(--shimmer-width));
    }
}

.shimmer {
    background-clip: text;
    background-position: 0 0;
    background-size: var(--shimmer-width) 100%;
    background-color: #BBBFC4;
    background-image: var(--shimmer-color);
    background-repeat: no-repeat;
    color: transparent;
    animation: shimmer var(--shimmer-duration) linear infinite;
}
```

## HTML

```html
<span class="shimmer">CSS 实现文字的 Shimmer 效果</span>
```
