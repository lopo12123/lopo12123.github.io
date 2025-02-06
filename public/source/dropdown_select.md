---
title: DropdownSelect 组件
category: react
created: 2024-10-12
---


下拉选择组件:

- 点击外部区域收起
- 完全的键盘控制

## 组件实现

此处样式使用 `tailwindcss` 的类名进行设置, 可以根据实际场景改为 `css` 实现

```tsx
// DropdownSelect.tsx

type DropdownSelectProps<Value> = {
    className?: string
    options: {
        label: string
        value: Value
    }[]
    value: Value
    onChange: (item: Value) => void
}

function DropdownSelect<Value>({
    className = '',
    options,
    value,
    onChange
}: DropdownSelectProps<Value>) {
    const ref = useRef<HTMLDivElement>(null)

    const [ fold, _setFold ] = useState(true)
    const foldSync = useRef(true)
    const setFold = (v: boolean | ((v: boolean) => boolean)) => {
        foldSync.current = typeof v === 'function' ? v(foldSync.current) : v
        _setFold(v)
    }

    const [ selectIndex, _setSelectIndex ] = useState(() => {
        const index = options.findIndex(option => option.value === value)
        return index === -1 ? 0 : index
    })
    const selectIndexSync = useRef(selectIndex)
    const setSelectIndex = (to: number) => {
        selectIndexSync.current = to
        _setSelectIndex(to)
    }
    const current = options[selectIndex]

    const keyboardControl = useRef(false)
    const [ candidateIndex, _setCandidateIndex ] = useState(-1)
    const candidateIndexSync = useRef(-1)
    const setCandidateIndex = (v: number | ((v: number) => number)) => {
        candidateIndexSync.current = typeof v === 'function' ? v(candidateIndexSync.current) : v
        _setCandidateIndex(v)
    }

    const handleSelect = (index: number) => {
        setSelectIndex(index)
        setFold(true)
        onChange(options[index].value)
    }

    const keyboardListener = (ev: KeyboardEvent) => {
        if(!keyboardControl.current) return

        switch(ev.code) {
            case 'Escape':
                ev.preventDefault()
                setFold(true)
                break
            case 'ArrowUp':
                ev.preventDefault()
                if(foldSync.current) {
                    setCandidateIndex(selectIndexSync.current)
                    setFold(false)
                } else {
                    setCandidateIndex(v => (v - 1 + options.length) % options.length)
                }
                break
            case 'ArrowDown':
                ev.preventDefault()
                if(foldSync.current) {
                    setCandidateIndex(selectIndexSync.current)
                    setFold(false)
                } else {
                    setCandidateIndex(v => (v + 1) % options.length)
                }
                break
            case 'Enter':
                ev.preventDefault()
                if(foldSync.current) {
                    setCandidateIndex(selectIndexSync.current)
                    setFold(false)
                } else {
                    if(candidateIndexSync.current !== -1) handleSelect(candidateIndexSync.current)
                }
                break
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keyboardListener)
        return () => window.removeEventListener('keydown', keyboardListener)
    }, [])

    const clickOutListener = (ev: MouseEvent) => {
        const el = ref.current!
        if(!ev.composedPath().includes(el)) setFold(true)
    }

    useEffect(() => {
        window.addEventListener('click', clickOutListener)
        return () => window.removeEventListener('click', clickOutListener)
    }, [])

    return (
        <div
            ref={ ref }
            tabIndex={ 0 }
            className={ `relative ${ className }` }
            onFocus={ () => {
                keyboardControl.current = true
            } }
            onBlur={ () => {
                setFold(true)
                keyboardControl.current = false
            } }>
            <div
                className={ 'w-full h-full px-2 border rounded bg-white hover:bg-gray-50 text-gray-900 text-sm cursor-pointer flex items-center' }
                title={ current.label } onClick={ () => setFold(v => !v) }>
                <span className={ 'flex-1 truncate' }>{ current.label }</span>
            </div>

            {
                fold ? null : (
                    <div className={
                        `absolute z-10 top-full left-0 w-full mt-2 py-1 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5`
                    }>
                        {
                            options.map(({ label }, index) => {
                                const isSelected = index === selectIndex
                                const isCandidate = index === candidateIndex

                                return (
                                    <div key={ index }
                                         className={
                                             'w-full h-9 px-2 hover:bg-gray-100 cursor-pointer flex items-center'
                                             + (isSelected ? ' font-bold' : '')
                                             + (isCandidate ? ' bg-gray-100' : '')
                                         }
                                         title={ label } onClick={ () => handleSelect(index) }>
                                        <span className={ 'flex-1 text-gray-700 text-sm leading-[36px] truncate' }>
                                            { label }
                                        </span>
                                        {/* check icon */ }
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}
```

## 场景使用

```tsx
// DropdownSelectExample.tsx

const DropdownSelectExample = () => {
    const [ v, setV ] = useState(0)

    return (
        <div>
            <span>selected: { v }</span>
            <DropdownSelect
                options={ [
                    { label: 'A', value: 0 },
                    { label: 'B', value: 1 },
                    { label: 'C', value: 2 },
                ] }
                value={ v } onChange={ setV }/>
        </div>
    )
}
```
