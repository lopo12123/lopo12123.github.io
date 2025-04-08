import { navItems } from "~/configs/navigation";

export default function HomePage() {
    return (
        <main className={ 'content-body font-poets whitespace-pre-wrap' }>
            <h1>👋 hi there, it's lopo</h1>

            <ul>
                {
                    navItems.map(({ title, path }) => {
                        return (
                            <li key={ path }>
                                <a href={ path }>{ title }</a>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}
