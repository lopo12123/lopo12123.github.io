﻿---
title: ModalWrapper 组件
category: react
created: 2024-09-06
---

弹窗组件通常伴随着一些通用的功能需求:

- 背景蒙层
- 蒙层点击事件 (点击关闭或消费点击事件)
- 弹窗出现时禁用滚动, 关后恢复滚动

可以将这些功能封装成一个 `ModalWrapper` 组件

## 组件实现

此处样式使用 `tailwindcss` 的类名进行设置, 可以根据实际场景改为 `css` 实现

```tsx
// ModalWrapper.tsx

import { ReactNode, MouseEvent, useEffect } from 'react'
import { useRef } from 'react'

const ModalWrapper = ({ children, onBgClick }: { children: ReactNode, onBgClick?: VoidFunction }) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const handleClick = (ev: MouseEvent<HTMLDivElement>) => {
        if(ev.target === ref.current) {
            ev.stopPropagation()
            ev.preventDefault()
            onBgClick?.()
        }
    }

    useEffect(() => {
        // memorize the original overflow style of body
        const mem = document.body.style.overflow

        // disable scroll when modal is shown
        document.body.style.overflow = 'hidden'

        return () => {
            // restore the original overflow style of body
            document.body.style.overflow = mem
        }
    }, [])

    return (
        <div ref={ ref } className={
            'fixed z-[100] w-full h-full top-0 left-0 bg-[#00000080] flex flex-col items-center justify-center'
        } onClick={ handleClick }>
            { children }
        </div>
    )
}

export {
    ModalWrapper,
}
```

## 场景使用

```tsx
// ModalExample.tsx

import { useState } from "react";

const ModalExample = () => {
    const [ showModal, setShowModal ] = useState(false)

    return (
        <div>
            <button onClick={() => setShowModal(true)}>show modal</button>

            {
                showModal && <ModalWrapper onBgClick={() => alert('click on mask')}>
                    <div className={'w-[100px] h-[100px] bg-white'} onClick={() => setShowModal(false)}>
                        click to close modal
                    </div>
                </ModalWrapper>
            }

            <div className={'w-full h-[1000px]'}>
                mock a long content here
            </div>
        </div>
    )
}
```
