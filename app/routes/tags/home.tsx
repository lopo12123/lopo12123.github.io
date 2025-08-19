import type { Route } from "./+types/home";

export const loader = async (): Promise<Record<string, number>> => {
    const { tags } = await import("@public/.posts/manifest.json").then(r => r.default)
    return tags
}
export default function TagHomePage({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <h1 className={ 'title' }>
                <span>Tags</span>
                <span className={ 'animation-tag ml-2' }>🏷️</span>
            </h1>

            <ul className={ 'flex flex-wrap gap-2' }>
                {
                    Object.entries(loaderData).map(([ tag, count ]) => {
                        return (
                            <li key={ tag }>
                                <a href={ `/tags/${ tag }` }
                                   className={ 'px-3 py-1 bg-gray-200 rounded flex items-center' }>
                                    <span className={ 'mr-1' }>{ tag }</span>
                                    <span className={ 'text-sm' }>{ count }</span>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}