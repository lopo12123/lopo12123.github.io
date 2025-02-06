---
title: GitHub-style Table style
category: css
created: 2024-08-29
---

GitHub 风格的表格样式

## 效果

| Column1 | Column2 | Column3 |
|---------|---------|---------|
| C1R1    | C2R1    | C3R1    |
| C1R2    | C2R2    | C3R2    |
| C1R3    | C2R3    | C3R3    |
| C1R4    | C2R4    | C3R4    |
| C1R5    | C2R5    | C3R5    |

## CSS

```css
table {
    border-color: #808080;
    border-spacing: 0;
    border-collapse: collapse;

    tr {
        border-top: solid 1px #d0d7deb3;
        background-color: white;

        &:nth-child(2n) {
            background-color: #f6f8fa;
        }
    }

    th {
        font-weight: 600;
    }

    th, td {
        padding: 6px 13px;
        border: solid 1px #d0d7de;
    }
}
```
