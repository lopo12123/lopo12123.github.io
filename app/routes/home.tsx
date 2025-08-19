import { IconChevronRightDouble } from "~/components/icons";

export default function HomePage() {
    return (
        <>
            <section>
                <h1 className={ 'title' }>
                    <span>Hi there!</span>
                    <span className={ 'animation-hand ml-2' }>👋</span>
                </h1>
                <p className={ 'text-[#282728] font-light' }>
                    It's lopo, a website and app developer who uses js and dart and is interested in rust.
                </p>
            </section>

            <section className={ 'mt-6' }>
                <a href="/posts">
                    <div className={ 'underline underline-offset-2 flex items-center gap-1' }>
                        <IconChevronRightDouble/>
                        <span>View Posts</span>
                    </div>
                </a>
            </section>
        </>
    )
}
