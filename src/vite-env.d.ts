/// <reference types="vite/client" />

declare global {
    interface Window {
        __delegate: {
            toggleCodeBlock(element: HTMLDivElement): void
            copyCode(element: HTMLDivElement): void
            toast(content: string): void
            preview(element: HTMLImageElement): void
        }
    }

}

export {}