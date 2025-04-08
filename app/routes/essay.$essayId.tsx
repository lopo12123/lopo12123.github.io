import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { EssayMeta } from "~/types";
import { parseMarkdown } from "~/utils/markdown";

type EssayLoaderData = {
    metadata: EssayMeta | null
    content: string | null
}

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
    const essayId = params['essayId']!
    const [ metadata, content ] = await Promise.allSettled([
        fetch(`/archive/essay/${ essayId }.metadata`).then(r => r.json()),
        fetch(`/archive/essay/${ essayId }.content`).then(r => r.text()),
    ])

    return {
        metadata: metadata.status === 'fulfilled' ? metadata.value : null,
        content: content.status === 'fulfilled' ? parseMarkdown('essay', essayId, content.value) : null,
    } satisfies EssayLoaderData
}

export default function EssayPage() {
    const { metadata, content } = useLoaderData<EssayLoaderData>()

    return (
        <main className={ 'content-body' }>
            { !!content ? <article dangerouslySetInnerHTML={ { __html: content } }/> : null }
        </main>
    )
}