import './styles/font.css'
import './styles/global.css'
import './styles/custom.css'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";

import { router } from "./route";

const toastContainer = document.getElementById('toast-container')! as HTMLDialogElement
let toastAnimation: Animation | null = null

const previewContainer = document.getElementById('preview-container')! as HTMLDialogElement

window.__delegate = {
    toggleCodeBlock: (element) => {
        element.parentElement!.toggleAttribute('data-collapse')
    },
    async copyCode(element) {
        window.event?.stopPropagation()

        const code = (element.parentElement!.nextElementSibling as HTMLPreElement).innerText
        await navigator.clipboard.writeText(code)
        this.toast('Copied')
    },
    toast(content) {
        toastAnimation?.cancel()
        toastContainer.innerText = content
        toastContainer.show()
        toastAnimation = toastContainer.animate([
            { offset: 0, opacity: 1, transform: 'translateY(0)' },
            { offset: 0.66, opacity: 1, transform: 'translateY(0)' },
            { offset: 1, opacity: 0, transform: 'translateY(-100%)' },
        ], {
            duration: 3000,
            fill: 'forwards',
        })
        toastAnimation.onfinish = () => {
            toastContainer.innerText = ''
            toastContainer.close()
        }
    },
    preview(element) {
        const inPreview = element.hasAttribute('preview')
        element.toggleAttribute('preview')

        const phantomElement = element.cloneNode()

        if (inPreview) {
            previewContainer.innerHTML = ''
            previewContainer.close()
        } else {
            previewContainer.appendChild(phantomElement)
            previewContainer.showModal()
        }
    }
}

createRoot(document.getElementById('root')!)
    .render(<RouterProvider router={ router }/>)
