export type PostMeta = {
    // id of the post, used as segment of path
    id: string
    // title of the post
    title: string
    // iso8601 string
    datetime: string
    // tags of the post, may be empty but never null
    tags: string[]
}

export type PostManifest = {
    // archive time of this version, iso8602 string
    archive_at: string
    // list of post
    posts: PostMeta[]
    // tags and its count
    tags: Record<string, number>
}