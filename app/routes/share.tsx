import type { Route } from "./+types/share";
import { useEffect } from "react";

export const loader = ({ request }: Route.LoaderArgs) => {
    return {}
}

export default function SharePage({ loaderData }: Route.ComponentProps) {
    useEffect(() => {
        console.log(loaderData)
    }, [])

    return (
        <div>
            TODO: share page
        </div>
    )
}