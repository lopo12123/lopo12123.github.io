import { Marked, Tokens } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const hl = markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    }
});

const parseMarkdown = (sub: 'essay' | 'project', id: string, content: string) => {
    return new Marked(
        hl,
        {
            renderer: {
                link({ href, title, text }: Tokens.Link): string {
                    const titleAttr = title ? ` title="${ title }"` : ''
                    return `<a href="${ href }"${ titleAttr } target="_blank">${ text }</a>`
                },
                image({ href, title }: Tokens.Image): string {
                    return `<img src="/media/${ sub }/${ id }/${ href }" alt="${ title ?? '' }"/>`
                }
            }
        }
    ).parse(content) as string
}

export {
    parseMarkdown,
}