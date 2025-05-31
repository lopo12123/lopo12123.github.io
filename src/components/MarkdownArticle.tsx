const MarkdownArticle = ({ html }: { html: string }) => {
    return <article dangerouslySetInnerHTML={ { __html: html } }/>
}

export {
    MarkdownArticle,
}