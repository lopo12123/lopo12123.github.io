import { useLoaderData } from "@remix-run/react";
import { ProjectMeta } from "~/types";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL('/archive/project/manifest.json', request.url)
    const items = await fetch(url).then(r => r.json()) as ProjectMeta[]

    return items satisfies  ProjectMeta[]
}

export default function ProjectGalleryPage() {
    const manifest = useLoaderData<ProjectMeta[]>()

    return (
        <main className={ 'gallery content-body' }>
            <h1>Projects ...</h1>

            <p>🚀 coming soon ...</p>

            <ul>
                {
                    manifest.map(({ id, name, description, logo }) => {
                        return (
                            <li key={ id }>
                                <a href={ `/project/${ id }` }>{ name }</a>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}