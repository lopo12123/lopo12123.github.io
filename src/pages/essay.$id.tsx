import { EssayMeta } from "@/types.ts";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { MarkdownArticle } from "@/components/MarkdownArticle.tsx";
import { ContentFooter } from "@/layout.tsx";
import { parseMarkdown } from "@/utils/markdown.ts";

type EssayLoaderData = {
    metadata: EssayMeta | null
    content: string | null
}

const EssayPage = () => {
    const { content } = useLoaderData<EssayLoaderData>()

    return (
        <main className={ 'article content-body' }>
            { !!content ? <MarkdownArticle html={ content }/> : null }
            <ContentFooter/>
        </main>
    )
}

EssayPage.loader = async ({ request, params }: LoaderFunctionArgs) => {
    const essayId = params['essayId']!

    const metadata = await fetch(new URL(`/archive/essay/${ essayId }.metadata`, request.url)).then(r => r.json()) as EssayMeta | null
    const content = await fetch(new URL(`/archive/essay/${ essayId }.content`, request.url)).then(r => r.text())

    return { metadata, content: parseMarkdown('essay', essayId, content) } satisfies EssayLoaderData
}

export {
    EssayPage,
}