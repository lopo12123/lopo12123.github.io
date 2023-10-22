/// <reference types="vite/client" />

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare interface Window {
    scan_data?: {
        link: string
        name?: string
        brief?: string
    }[]
}