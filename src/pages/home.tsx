import { navItems } from "@/config/nav_item";
import { Link } from "react-router";

export default function HomePage() {
    return (
        <main className={ 'content-body font-poets' }>
            <h1>👋 hi there, it's lopo</h1>

            <ul>
                {
                    navItems.map(({ title, path }) => {
                        return (
                            <li key={ path }>
                                <Link to={ path }>{ title }</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}
