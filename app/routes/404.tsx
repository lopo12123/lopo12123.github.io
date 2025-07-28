export const loader = () => {
    throw new Response(
        "Page not found, back to <a href='/'>home</a>",
        {
            headers: {
                "Content-Type": "text/html"
            }
        }
    )
}