import { useLoaderData } from "@remix-run/react";
import { resources } from "~/utils/resource";

export const loader = () => resources.get('essay')

// export const clientLoader = async () => {
//     return fetch('/archive/essay/manifest.json').then(r => r.json()) as unknown as EssayMeta[]
// }

export default function EssayGalleryPage() {
    const manifest = useLoaderData<typeof loader>()

    return (
        <main className={ 'gallery content-body' }>
            <h1>Essays ...</h1>

            <ul>
                {
                    manifest.map(({ id, title, datetime }) => {
                        return (
                            <li key={ id }>
                                <a className={ 'flex items-center' } href={ `/essay/${ id }` }>
                                    <div className={ 'mr-2 text-[18px]' }>{ title }</div>
                                    <time className={ 'text-[14px]' } dateTime={ datetime }>{ datetime }</time>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}