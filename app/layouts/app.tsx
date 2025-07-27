import { Link, Outlet } from "react-router";
import { IconGithub } from "~/components/icons";

export default function RootLayout() {
    return (
        <>
            <div className={ 'fixed top-0 inset-x-0 z-10 border-b border-[#e0e0e0] bg-white' }>
                <div className={ 'flex h-14 items-center justify-between gap-8 px-4 sm:px-6' }>
                    <Link to={ '/' }>
                        <img className={ 'h-5' } height={ 20 } src="/lopo_animate.svg" alt=""/>
                    </Link>

                    <div className={ 'flex items-center gap-6' }>
                        <Link className={ 'text-sm/6 text-gray-950' } to={ '/posts' }>
                            Posts
                        </Link>
                        <Link className={ 'text-sm/6 text-gray-950' } to={ '/tags' }>
                            Tags
                        </Link>
                        <Link to={ 'https://github.com/lopo12123' } target={ '_blank' }>
                            <IconGithub className={ 'size-5' }/>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={ 'pt-14' }>
                <Outlet/>
            </div>
        </>
    )
}