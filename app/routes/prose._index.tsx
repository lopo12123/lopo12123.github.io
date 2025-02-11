import { ProseMeta } from "~/models/prose";
import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

type ProseListPageLoaderData = {
    date: number
    category?: string
    proses: ProseMeta[]
}

export const clientLoader: LoaderFunction = async ({ request }) => {
    const category = new URL(request.url).searchParams.get('category')
    const archive = await fetch('/archive.json').then(r => r.json()) as ProseListPageLoaderData

    if (!!category) {
        archive.category = category
        archive.proses = archive.proses.filter(prose => prose.categories.includes(category))
    }

    return archive
}

export default function ProseListPage() {
    const { proses, category } = useLoaderData<ProseListPageLoaderData>()

    return (
        <main className={ 'prose-list' }>
            <h1>Prose Archive</h1>

            {
                category ? (
                    <p className={ 'hint' }>
                        Category:
                        <span>{ category }</span>
                        <Link to={ '?' } state={ { returnable: true } }>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.26953 18.6024L18.4689 5.40309" stroke="currentColor" strokeWidth="1.5"
                                      strokeLinecap="round"/>
                                <path d="M18.7295 18.6024L5.39616 5.26908" stroke="currentColor" strokeWidth="1.5"
                                      strokeLinecap="round"/>
                            </svg>
                        </Link>
                    </p>
                ) : null
            }

            <ol reversed>
                {
                    proses.map(prose => {
                        return (
                            <li key={ prose.filename } className={ '' }>
                                <Link to={ `/prose/${ prose.filename }` } state={ { returnable: true } }>
                                    { prose.title }
                                </Link>
                                <time dateTime={ prose.created }>{ prose.created }</time>
                                {
                                    prose.categories.map(category => {
                                        return (
                                            <Link key={ category } className={ 'category' }
                                                  to={ `?category=${ encodeURIComponent(category) }` }
                                                  state={ { returnable: true } }>
                                                { category }
                                            </Link>
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