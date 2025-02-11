import { LoaderFunction } from "@remix-run/node";
import { ProseDetail, ProseHeading } from "~/models/prose";
import { Marked, Tokens } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { Link, useLoaderData } from "@remix-run/react";

import icon_copy from "../assets/copy.svg";
import { useEffect } from "react";
import { v4 } from "uuid";

let counter: number[] = []
const marked = new Marked(
    markedHighlight({
        // this will be omitted since we set custom renderer for 'code'
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
            },
            code({ lang, text, raw }: Tokens.Code): string {
                const id = v4()
                window._seg[id] = raw

                return `<pre><code class="hljs language-${ lang }">${ text }</code><button class="clip-button" title="Copy to clipboard" onclick="window._copy('${ id }')"><img src="${ icon_copy }" alt="Copy"/></button></pre>`
            },
            // TODO: image preview
            // image({ href, text }: Tokens.Image): string {
            //     return `<img class="prose-image" src="${ href }" alt="${ text }" onclick="window.dispatchEvent(new CustomEvent('@lopo/preview', {detail: this}))"/>`
            // }
        }
    },
);

const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        if (window.navigator && 'clipboard' in navigator) {
            await navigator.clipboard.writeText(text)
        } else {
            const tmp = document.createElement('input');
            tmp.style.position = 'absolute'
            tmp.style.zIndex = '-1'
            tmp.style.top = '-100px'
            tmp.style.left = '-100px'
            tmp.value = text;
            document.body.appendChild(tmp);
            tmp.focus();
            tmp.select();
            document.execCommand('copy')
            tmp.remove()
        }
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

const proseParser = (content: string): ProseDetail => {
    // OPTIMIZE
    window._copySegmentById = async (seg_id: string) => {
        const raw = window._seg[seg_id]
        copyToClipboard(raw.split('\n').slice(1, -1).join('\n'))
        // TODO: toast
    }
    window._seg = {}

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
    const { title, categories, created, updated, content, headings } = useLoaderData<ProseDetail>()

    // TODO: TOC wrapped in aside

    useEffect(() => {
        return () => {
            window._seg = {}
        }
    }, [])

    return (
        <main className={ 'prose-detail' }>
            <article>
                <header>
                    <h1>{ title }</h1>
                    <p className={ 'meta' }>
                        <span>Created </span>
                        <time dateTime={ created }>{ created }</time>
                        {
                            updated ? (
                                <>
                                    <span> & Updated </span>
                                    <time dateTime={ created }>{ created }</time>
                                </>
                            ) : null
                        }
                        <span> · </span>
                        {
                            categories.map(category => {
                                return (
                                    <Link key={ category } className={ 'category' }
                                          to={ `/prose?category=${ encodeURIComponent(category) }` }
                                          state={ { returnable: true } }>
                                        { category }
                                    </Link>
                                )
                            })
                        }
                    </p>
                </header>
                <div className={ 'prose-body' } dangerouslySetInnerHTML={ { __html: content } }/>
            </article>
        </main>
    )
}