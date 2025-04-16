import { useLoaderData } from "@remix-run/react";
import { resources } from "~/utils/resource";
import { EssayMeta } from "~/types";

type GroupedEssayItem = { type: 'year', data: string } | { type: 'essay', data: EssayMeta }

function* groupedByYear(essay: EssayMeta[]): Generator<GroupedEssayItem> {
    let year: string = ''

    for (let i = 0 ; i < essay.length ; i++) {
        const _year = essay[i].datetime.slice(0, 4)
        if (year !== _year) {
            year = _year
            yield { type: 'year', data: year }
        }
        yield { type: 'essay', data: essay[i] }
    }
}

export const loader = () => {
    const items = resources.get('essay')
    return [ ...groupedByYear(items) ]
}

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
                    manifest.map(({ type, data }) => {
                        if (type === 'year') {
                            return (
                                <li key={ data }>
                                    <time className={ 'year' } dateTime={ data }>{ data }</time>
                                </li>
                            )
                        }

                        const { id, title, datetime } = data
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