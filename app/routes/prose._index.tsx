import { ProseMeta } from "~/models/prose";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type ProseListPageLoaderData = {
    date: number
    statistics: { [category: string]: number }
    proses: ProseMeta[]
}

export const clientLoader: LoaderFunction = () => {
    return fetch('/archive.json').then(r => r.json())
}

export default function ProseListPage() {
    const { proses } = useLoaderData<ProseListPageLoaderData>()

    return (
        <main className={ 'prose-list' }>
            <h1>Prose Archive</h1>

            <ol reversed>
                {
                    proses.map(prose => {
                        return (
                            <li key={ prose.filename } className={ '' }>
                                <a href={ `/prose/${ prose.filename }` }>{ prose.title }</a>
                                <time dateTime={ prose.created }>{ prose.created }</time>
                                {
                                    prose.categories.map(category => {
                                        return (
                                            <a key={ category } className={ 'category' }
                                               href={ `/prose/category/${ category }` }>
                                                { category }
                                            </a>
                                        )
                                    })
                                }
                            </li>
                        )
                    })
                }
            </ol>
        </main>
    )
}