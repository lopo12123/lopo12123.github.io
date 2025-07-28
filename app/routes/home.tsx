export default function HomePage() {
    return (
        <>
            <section>
                <h1 className={ 'title' }>
                    <span>Hi there!</span>
                    <span className={ 'wave-hands ml-2' }>👋</span>
                </h1>
                <p className={ 'text-[#282728] font-light' }>
                    It's lopo, a website and app developer who uses js and dart and is interested in rust.
                </p>
            </section>

            <section>
                {/*  TODO: recent activity  */ }
            </section>
        </>
    )
}
