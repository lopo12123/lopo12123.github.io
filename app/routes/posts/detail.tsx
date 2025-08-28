import type { Route } from "./+types/detail";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { Marked, type Tokens } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const hl = markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    }
});

const processMarkdown = (postId: string, content: string) => {
    return new Marked(
        hl,
        {
            renderer: {
                link({ href, title, text }: Tokens.Link): string {
                    const titleAttr = title ? ` title="${ title }"` : ''
                    return `<a href="${ href }"${ titleAttr } target="_blank">${ text }</a>`
                },
                image({ href, text, title }: Tokens.Image): string {
                    const src = /^https?:\/\//.test(href) ? href : `/.posts/${ postId }/${ href }`
                    return `<figure>
<img onclick="window.dispatchEvent(new CustomEvent('@lopo', {detail: {action: 'preview', el: this}}))"
style="cursor: zoom-in"
src="${ src }" alt="${ text ?? '' }" ${ title ? `title="${ title }"` : '' }/>
<figcaption>${ text }</figcaption>
</figure>`
                },
                code({ text, lang = '' }: Tokens.Code): string {
                    return `<div class="code-block">
<div class="code-block-header" onclick="window.dispatchEvent(new CustomEvent('@lopo', {detail: {action: 'toggle-code-block', el: this}}))">
<span class="language-name">${ lang }</span>
<button onclick="event.stopPropagation();window.dispatchEvent(new CustomEvent('@lopo', {detail: {action: 'copy-code', el: this}}))">COPY</button>
</div>
<pre class="code-block-body"><code class="hljs language-${ lang }">${ text }</code></pre>
</div>
`
                }
            }
        }
    ).parse(content) as string
}

export const loader = async ({ params }: Route.LoaderArgs) => {
    const postId = params['postId']!

    const markdown = readFileSync(join(cwd(), 'public', '.posts', postId, '.md'), 'utf-8')

    return processMarkdown(postId, markdown)
}

export default function PostDetailPage({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <article dangerouslySetInnerHTML={ { __html: loaderData } }/>
        </>
    )
}