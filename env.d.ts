declare global {
    interface Window {
        __delegate: {
            toggleCodeBlock(element: HTMLDivElement): void
            copyCode(element: HTMLDivElement): void
        }
    }

}

export {}