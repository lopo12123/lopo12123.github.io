/// <reference types="vite/client" />

declare global {
    interface Window {
        _seg: { [k: string]: string }

        _copySegmentById(seg_id: string): Promise<void>
    }
}

export {}