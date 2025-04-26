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
                image({ href, text }: Tokens.Image): string {
                    return `<figure>
<img onclick="__delegate.preview(this)" src="/media/${ sub }/${ id }/${ href }" alt="${ text ?? '' }"/>
<figcaption>${text}</figcaption>
</figure>`
                },
                code({ text, lang = '', escaped }: Tokens.Code): string {
                    return `<div class="code-block">
<div class="code-block-header" onclick="__delegate.toggleCodeBlock(this)">
<span class="language-name">${ lang }</span>
<button onclick="__delegate.copyCode(this)">COPY</button>
</div>
<pre class="code-block-body"><code class="hljs language-${ lang }">${ text }</code></pre>
</div>
`
                }
            }
        }
    ).parse(content) as string
}

export {
    parseMarkdown,
}