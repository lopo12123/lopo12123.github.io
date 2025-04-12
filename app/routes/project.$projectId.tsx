import { useLoaderData } from "@remix-run/react";
import { ProjectMeta } from "~/types";
import { parseMarkdown } from "~/utils/markdown";
import { LoaderFunctionArgs } from "@remix-run/node";
import { resources } from "~/utils/resource";

type ProjectLoaderData = {
    metadata: ProjectMeta | null
    content: string | null
}

export const loader = ({ params }: LoaderFunctionArgs) => {
    const projectId = params['projectId']!
    return {
        metadata: resources.get('project', projectId, 'metadata'),
        content: parseMarkdown('project', projectId, resources.get('project', projectId, 'content')),
    } satisfies ProjectLoaderData
}

// export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
//     const projectId = params['projectId']!
//     const [ metadata, content ] = await Promise.allSettled([
//         fetch(`/archive/project/${ projectId }.metadata`).then(r => r.json()),
//         fetch(`/archive/project/${ projectId }.content`).then(r => r.text()),
//     ])
//
//     return {
//         metadata: metadata.status === 'fulfilled' ? metadata.value : null,
//         content: content.status === 'fulfilled' ? parseMarkdown('project', projectId, content.value) : null,
//     } satisfies ProjectLoaderData
// }

export default function ProjectPage() {
    const { content } = useLoaderData<ProjectLoaderData>()

    return (
        <main className={ 'content-body' }>
            { !!content ? <article dangerouslySetInnerHTML={ { __html: content } }/> : null }
        </main>
    )
}