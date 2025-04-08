import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { ProjectMeta } from "~/types";
import { parseMarkdown } from "~/utils/markdown";

type ProjectLoaderData = {
    metadata: ProjectMeta | null
    content: string | null
}

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
    const projectId = params['projectId']!
    const [ metadata, content ] = await Promise.allSettled([
        fetch(`/archive/project/${ projectId }.metadata`).then(r => r.json()),
        fetch(`/archive/project/${ projectId }.content`).then(r => r.text()),
    ])

    return {
        metadata: metadata.status === 'fulfilled' ? metadata.value : null,
        content: content.status === 'fulfilled' ? parseMarkdown('project', projectId, content.value) : null,
    } satisfies ProjectLoaderData
}

export default function ProjectPage() {
    const { metadata, content } = useLoaderData<ProjectLoaderData>()

    return (
        <main className={ 'content-body' }>
            { !!content ? <article dangerouslySetInnerHTML={ { __html: content } }/> : null }
        </main>
    )
}