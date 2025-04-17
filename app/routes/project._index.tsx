import { resources } from "~/utils/resource";
import { useLoaderData } from "@remix-run/react";
import { ProjectMeta } from "~/types";

export const loader = () => resources.get('project')

// export const clientLoader = async () => {
//     return fetch('/archive/project/manifest.json').then(r => r.json()) as unknown as ProjectMeta[]
// }

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