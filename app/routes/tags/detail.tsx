import type { Route } from "./+types/detail";
import type { PostMeta } from "~/types";
import { Link } from "react-router";

export const loader = async ({ params }: Route.LoaderArgs): Promise<PostMeta[]> => {
    const tagName = params['tagName']!;

    const { posts } = await import("@public/.posts/manifest.json").then(r => r.default)
    return posts.filter(post => post.tags.includes(tagName))
}

export default function TagDetailPage({ params, loaderData }: Route.ComponentProps) {
    return (
        <>
            <h1 className={ 'title' }>
                <span>{ params['tagName'] } </span>
                <span className={ 'animation-magnifier ml-2' }>🔍</span>
            </h1>

            <ol>
                {
                    loaderData.map(({ id, title, datetime }) => (
                        <li key={ id } className={ 'mb-4' }>
                            <Link className={ 'flex items-center' } to={ `/posts/${ id }` }>
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
        </>
    )
}