import { cpSync, readdirSync, readFileSync, writeFileSync } from "fs"
import { execSync } from "child_process"
import { join } from "path"

type PostMeta = {
    // id of the post, used as segment of path
    id: string
    // title of the post
    title: string
    // iso8601 string
    datetime: string
    // tags of the post, may be empty but never null
    tags: string[]
}

type Manifest = {
    // archive time of this version, iso8602 string
    archive_at: string
    // list of post
    posts: PostMeta[]
    // tags and its count
    tags: Record<string, number>
}

const process_post = (id: string): PostMeta | null => {
    const content_path = join(SOURCE_ROOT, id, '.md')
    const content = readFileSync(content_path, 'utf-8')

    const reg = /^---$\r?\n(?<frontmatter>[\s\S]*?)\r?\n^---$\r?\n+/m
    const matches = content.match(reg)
    const frontmatter = matches?.groups?.frontmatter

    if (!frontmatter) return null


    const raw = JSON.parse(frontmatter)

    return {
        id,
        title: raw['title'] ?? 'Unknown Title',
        datetime: new Date(raw['datetime']).toISOString(),
        tags: raw['tags'] ?? [],
    }
}

const PROJECT_ROOT = execSync('git rev-parse --show-toplevel').toString().trim()
const SOURCE_ROOT = join(PROJECT_ROOT, ".posts")
const DEST_ROOT = join(PROJECT_ROOT, 'public', '.posts')
const MANIFEST_FILE = join(DEST_ROOT, 'manifest.json')

const posts = readdirSync(SOURCE_ROOT)

const manifest: Manifest = {
    archive_at: new Date().toISOString(),
    posts: [],
    tags: {},
}

for (const post of posts) {
    const meta = process_post(post)
    if (meta == null) {
        console.log(`>> Fail to process post (${ post })`)
        continue
    }

    manifest.posts.push(meta)
    meta.tags.forEach(tag => {
        manifest.tags[tag] = (manifest.tags[tag] ?? 0) + 1
    })
}

manifest.posts.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))

writeFileSync(MANIFEST_FILE, JSON.stringify(manifest), 'utf-8')
console.log('>> Manifest generated')

cpSync(SOURCE_ROOT, DEST_ROOT, { recursive: true })
console.log('>> Source files archived')