import { useLoaderData } from "@remix-run/react";
import { ProjectMeta } from "~/types";
import { parseMarkdown } from "~/utils/markdown";
import { LoaderFunctionArgs } from "@remix-run/node";
import { MarkdownArticle } from "~/components/MarkdownArticle";
import { ContentFooter } from "~/layout/content_footer";

type ProjectLoaderData = {
    metadata: ProjectMeta | null
    content: string | null
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const projectId = params['projectId']!

    const metadata = await fetch(new URL(`/archive/project/${ projectId }.metadata`, request.url)).then(r => r.json()) as ProjectMeta | null
    const content = await fetch(new URL(`/archive/project/${ projectId }.content`, request.url)).then(r => r.text())

    return { metadata, content: parseMarkdown('project', projectId, content) } satisfies ProjectLoaderData
}

export default function ProjectPage() {
    const { content } = useLoaderData<ProjectLoaderData>()

    return (
        <main className={ 'article content-body' }>
            { !!content ? <MarkdownArticle html={ content }/> : null }
            <ContentFooter/>
        </main>
    )
}