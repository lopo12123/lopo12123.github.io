import { useLoaderData } from "@remix-run/react";
import { EssayMeta } from "~/types";
import { parseMarkdown } from "~/utils/markdown";
import { LoaderFunctionArgs } from "@remix-run/node";
import { MarkdownArticle } from "~/components/MarkdownArticle";
import { ContentFooter } from "~/layout/content_footer";

type EssayLoaderData = {
    metadata: EssayMeta | null
    content: string | null
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const essayId = params['essayId']!

    const metadata = await fetch(new URL(`/archive/essay/${ essayId }.metadata`, request.url)).then(r => r.json()) as EssayMeta | null
    const content = await fetch(new URL(`/archive/essay/${ essayId }.content`, request.url)).then(r => r.text())

    return { metadata, content: parseMarkdown('essay', essayId, content) } satisfies EssayLoaderData
}

export default function EssayPage() {
    const { content } = useLoaderData<EssayLoaderData>()

    return (
        <main className={ 'article content-body' }>
            { !!content ? <MarkdownArticle html={ content }/> : null }
            <ContentFooter/>
        </main>
    )
}