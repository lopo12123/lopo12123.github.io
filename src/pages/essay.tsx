import { Link, LoaderFunctionArgs, useLoaderData } from "react-router";
import { EssayMeta } from "@/types.ts";

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

const EssayGalleryPage = () => {
    const manifest = useLoaderData<GroupedEssayItem[]>()

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
                                <Link className={ 'flex items-center' } to={ `/essay/${ id }` }>
                                    <div className={ 'mr-2 text-[18px]' }>{ title }</div>
                                    <time className={ 'text-[14px]' } dateTime={ datetime }>{ datetime }</time>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}

EssayGalleryPage.loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL('/archive/essay/manifest.json', request.url)
    const items = await fetch(url).then(r => r.json()) as EssayMeta[]

    return [ ...groupedByYear(items) ]
}

export {
    EssayGalleryPage,
}