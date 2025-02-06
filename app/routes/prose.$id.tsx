import { LoaderFunction } from "@remix-run/node";
import { ProseDetail, ProseHeading } from "~/models/prose";
import { Marked, Tokens } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { useLoaderData } from "@remix-run/react";

let counter: number[] = []
const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }),
    {
        renderer: {
            heading({ depth, text }: Tokens.Heading): string {
                if (counter[depth - 2] === undefined) counter[depth - 2] = 0
                counter[depth - 2] += 1
                const id = `heading_${ depth }_${ counter[depth - 2] }`
                return `<h${ depth } id="${ id }" class="heading-anchor">${ text }</h${ depth }>`
            },
            link({ href, title, text }: Tokens.Link): string {
                const titleAttr = title ? ` title="${ title }"` : ''
                return `<a href="${ href }"${ titleAttr } target="_blank">${ text }</a>`
            },
            codespan({ text }: Tokens.Codespan): string {
                return `<code class="codespan">${ text }</code>`
            }
            // TODO: image preview
            // image({ href, text }: Tokens.Image): string {
            //     return `<img class="prose-image" src="${ href }" alt="${ text }" onclick="window.dispatchEvent(new CustomEvent('@lopo/preview', {detail: this}))"/>`
            // }
        }
    }
);

const proseParser = (content: string): ProseDetail => {
    const reg = /^---$\r?\n(?<frontmatter>[\s\S]*?)\r?\n^---$\r?\n/m
    const matches = content.match(reg)!
    const frontmatter = matches!.groups!.frontmatter

    const config: Record<string, any> = {}
    frontmatter.split(/\r?\n/).forEach(line => {
        // skip comment line
        if (line.startsWith('#')) return

        const [ key, value ] = line.split(':').map(v => v.trim())
        if (key && value) config[key.trim()] = value.trim()
    })

    // markdown main body
    const body = content.slice(matches["0"].length)

    const headingTokens = marked.lexer(body).filter(x => x.type === 'heading') as Tokens.Heading[]
    const headings: ProseHeading[] = []
    const counter: number[] = []
    for (const { depth, text } of headingTokens) {
        if (counter[depth - 2] === undefined) counter[depth - 2] = 0
        counter[depth - 2] += 1
        headings.push({
            id: `heading_${ depth }_${ counter[depth - 2] }`,
            indent: depth - 2,
            text,
        })
    }

    return {
        title: config.title,
        categories: config.category.split(/,\W*/),
        created: config.created,
        updated: config.updated,
        content: marked.parse(body) as string,
        headings: headings.length > 0 ? headings : null,
    }
}

export const clientLoader: LoaderFunction = async ({ params }) => {
    const filename = params['id']
    const source = await fetch(`/source/${ filename }.md`).then(r => r.text())
    return proseParser(source)
}

export default function ProseDetailPage() {
    const { title, created, updated, content, headings } = useLoaderData<ProseDetail>()

    return (
        <main className={ 'prose-detail' } dangerouslySetInnerHTML={ { __html: content } }>

        </main>
    )
}