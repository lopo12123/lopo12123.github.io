import type { Route } from "./+types/home";
import type { PostMeta } from "~/types";
import { Link } from "react-router";

type LoaderData = {
    year: string
    posts: PostMeta[]
}[]

export const loader = async (): Promise<LoaderData> => {
    const manifest = await import("@public/.posts/manifest.json").then(r => r.default)

    const grouped: LoaderData = []

    let year = ''
    for (const post of manifest.posts) {
        const _year = post.datetime.slice(0, 4);
        if (_year === year) {
            grouped.at(-1)!.posts.push(post)
        } else {
            grouped.push({ year: _year, posts: [ post ] })
            year = _year
        }
    }

    return grouped
}

export default function PostHomePage({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <h1 className={ 'title' }>
                <span>Posts</span>
                <span className={ 'shake-book ml-2' }>📖</span>
            </h1>

            <ul>
                {
                    loaderData.map(({ year, posts }) => {
                        return (
                            <li key={ year }>
                                <time className={ 'stroke-watermark h-20 text-9xl font-bold leading-[1.25]' }
                                      dateTime={ year }>
                                    { year }
                                </time>
                                <ol>
                                    {
                                        posts.map(({ id, title, datetime }) => (
                                            <li key={ id } className={ 'mb-4' }>
                                                <Link className={ 'flex items-center' } to={ '' }>
                                                    <div className={ 'mr-2 text-[18px]' }>{ title }</div>
                                                    <time className={ 'text-sm' } dateTime={ datetime }>
                                                        {
                                                            new Date(datetime).toLocaleDateString('zh-CN', {
                                                                year: 'numeric',
                                                                month: '2-digit',
                                                                day: '2-digit',
                                                            })
                                                        }
                                                    </time>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ol>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}