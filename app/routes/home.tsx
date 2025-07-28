export default function HomePage() {
    return (
        <>
            <section>
                <h1 className={ 'text-3xl font-medium' }>
                    <span>Hi there!</span>
                    <span className={ 'wave-hands ml-2' }>👋</span>
                </h1>
                <p className={ 'mt-6 text-[#282728] font-light' }>
                    It's lopo, a website and app developer who uses js and dart and is interested in rust.
                </p>
            </section>

            <section>
                {/*  TODO: recent activity  */ }
            </section>
        </>
    )
}
