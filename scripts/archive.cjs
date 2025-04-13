const {execSync} = require("child_process")
const {readdirSync, readFileSync, writeFileSync, cpSync} = require('fs')
const {join} = require('path')

/**
 * Split markdown content into frontmatter & content body
 * @param markdown {string}
 * @return {[Object, string]}
 */
const split = (markdown) => {
    const reg = /^---$\r?\n(?<frontmatter>[\s\S]*?)\r?\n^---$\r?\n+/m
    const matches = markdown.match(reg)
    const frontmatter = matches?.groups?.frontmatter
    if (!frontmatter) {
        throw Error('Can not extract frontmatter')
    }

    return [JSON.parse(frontmatter), markdown.slice(matches["0"].length)]
}

const archive = (sub) => {
    const manifest = []

    for (const id of readdirSync(join(SOURCE_DIR, sub))) {
        cpSync(`${join(SOURCE_DIR, sub, id)}/`, `${join(MEDIA_DIR, sub, id)}/`, {
            recursive: true, filter: (source, _) => !source.endsWith(".md"),
        })

        const raw = readFileSync(join(SOURCE_DIR, sub, id, '.md'), 'utf-8')
        const [meta, content] = split(raw.trim())
        meta['id'] = id
        manifest.push(meta)
        writeFileSync(join(ARCHIVE_DIR, sub, `${id}.content`), content, 'utf-8')
        writeFileSync(join(ARCHIVE_DIR, sub, `${id}.metadata`), JSON.stringify(meta), 'utf-8')
    }

    manifest.sort((a, b) => Date.parse(b['datetime']) - Date.parse(a['datetime']))
    writeFileSync(join(ARCHIVE_DIR, sub, 'manifest.json'), JSON.stringify(manifest))
    console.log(`> "${sub}" archived`)
}

const ROOT_DIR = execSync('git rev-parse --show-toplevel').toString().trim()
const SOURCE_DIR = join(ROOT_DIR, 'source')
const MEDIA_DIR = join(ROOT_DIR, 'public', 'media')
const ARCHIVE_DIR = join(ROOT_DIR, 'public', 'archive')

archive('essay')
archive('project')