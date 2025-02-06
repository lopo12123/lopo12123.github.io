type ProseMeta = {
    filename: string
    title: string
    categories: string[]
    created: string
    updated: string | null
}

type ProseHeading = {
    id: string
    indent: number
    text: string
}

type ProseDetail = {
    title: string
    categories: string[]
    created: string
    updated: string | null
    /**
     * html content of markdown
     */
    content: string
    headings: ProseHeading[] | null
}

export type {
    ProseMeta,
    ProseHeading,
    ProseDetail,
}