import { useLoaderData } from "@remix-run/react";
import { EssayMeta } from "~/types";
import { parseMarkdown } from "~/utils/markdown";
import { resources } from "~/utils/resource";
import { LoaderFunctionArgs } from "@remix-run/node";

type EssayLoaderData = {
    metadata: EssayMeta | null
    content: string | null
}

export const loader = ({ params }: LoaderFunctionArgs) => {
    const essayId = params['essayId']!
    return {
        metadata: resources.get('essay', essayId, 'metadata'),
        content: parseMarkdown('essay', essayId, resources.get('essay', essayId, 'content')),
    } satisfies EssayLoaderData
}

// export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
//     const essayId = params['essayId']!
//     const [ metadata, content ] = await Promise.allSettled([
//         fetch(`/archive/essay/${ essayId }.metadata`).then(r => r.json()),
//         fetch(`/archive/essay/${ essayId }.content`).then(r => r.text()),
//     ])
//
//     return {
//         metadata: metadata.status === 'fulfilled' ? metadata.value : null,
//         content: content.status === 'fulfilled' ? parseMarkdown('essay', essayId, content.value) : null,
//     } satisfies EssayLoaderData
// }

export default function EssayPage() {
    const { content } = useLoaderData<EssayLoaderData>()

    return (
        <main className={ 'content-body' }>
            { !!content ? <article dangerouslySetInnerHTML={ { __html: content } }/> : null }
        </main>
    )
}