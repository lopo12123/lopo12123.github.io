import { ProseMeta } from "~/models/prose";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type ProseListPageLoaderData = {
    proses: ProseMeta[]
}

export const loader: LoaderFunction = async () => {
    const proses = [
        {
            filename: 'prose1',
            title: 'lorem ipsum',
            categories: [ 'demo' ],
            created: '2025/01/01',
            updated: null,
        },
        {
            filename: 'prose2',
            title: 'lorem ipsum',
            categories: [ 'demo', 'tag2', 'tag3' ],
            created: '2025/01/01',
            updated: null,
        },
    ] satisfies ProseMeta[]

    return { proses }
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