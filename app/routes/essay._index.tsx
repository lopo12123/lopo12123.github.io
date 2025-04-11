import { useLoaderData } from "@remix-run/react";
import { EssayMeta } from "~/types";
import { resources } from "~/utils/resource";

export const loader = () => resources.get('essay')

export const clientLoader = async () => {
    return fetch('/archive/essay/manifest.json').then(r => r.json()) as unknown as EssayMeta[]
}

export default function EssayGalleryPage() {
    const manifest = useLoaderData<EssayMeta[]>()

    return (
        <main className={ 'content-body' }>
            <h1>Essays ...</h1>

            <p>✍️ producing ...</p>

            <ul>
                {
                    manifest.map(({ id, title }) => {
                        return (
                            <li key={ id }>
                                <a href={ `/essay/${ id }` }>{ title }</a>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}