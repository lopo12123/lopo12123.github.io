import { Link, Outlet } from "react-router";
import { IconEmail, IconGithub } from "~/components/icons";

export default function RootLayout() {
    return (
        <>
            <div className={ 'fixed top-0 inset-x-0 z-10 border-b border-[#e0e0e0] bg-white' }>
                <div className={ 'flex h-14 items-center justify-between gap-8 px-4 sm:px-6' }>
                    <Link to={ '/' }>
                        <img className={ 'h-5' } height={ 20 } src="/lopo_animate.svg" alt=""/>
                    </Link>

                    <nav className={ 'flex items-center gap-4' }>
                        <Link className={ 'text-sm/6 text-gray-950' } to={ '/posts' }>
                            Posts
                        </Link>
                        <Link className={ 'text-sm/6 text-gray-950' } to={ '/tags' }>
                            Tags
                        </Link>
                        <Link className={ 'text-sm/6 text-gray-950' } to={ '/tools' }>
                            Tools
                        </Link>
                    </nav>
                </div>
            </div>

            <main className={ 'max-w-[768px] mx-auto pt-24 pb-10 px-4' }>
                <Outlet/>
            </main>

            <hr className={ 'max-w-[768px] mx-auto border-[#cdcdcd]' }/>

            <footer className={ 'max-w-[768px] mx-auto px-4 py-6' }>
                <ul className={ 'flex gap-2' }>
                    <li>
                        <Link to={ 'https://github.com/lopo12123' } target={ '_blank' }>
                            <IconGithub className={ 'size-6 text-[#696969]' }/>
                        </Link>
                    </li>
                    <li>
                        <Link to={ 'mailto:lopo@zju.edu.cn' }>
                            <IconEmail className={ 'size-6 text-[#696969]' }/>
                        </Link>
                    </li>
                </ul>
            </footer>
        </>
    )
}