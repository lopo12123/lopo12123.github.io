import { navItems } from "~/configs/navigation";

export default function HomePage() {
    return (
        <main className={ 'content-body font-poets whitespace-pre-wrap' }>
            <h1>👋 hi there, it's lopo</h1>

            <ul>
                {
                    navItems.map(({ title, path }) => {
                        return (
                            <li key={ path } className={ 'hover:underline underline-offset-4 transition-all' }>
                                <a className={ 'block' } href={ path }>{ title }</a>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}
