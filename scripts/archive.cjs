const {execSync} = require("child_process")
const {readdirSync, readFileSync, writeFileSync} = require('fs')
const {join, basename} = require('path')

const canonical = (filename) => {
    return basename(filename, '.md').replace(/_/g, '-').toLowerCase()
}

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
    for (const project of readdirSync(join(SOURCE_DIR, sub))) {
        const raw = readFileSync(join(SOURCE_DIR, sub, project), 'utf-8')
        const [meta, content] = split(raw)
        const projectId = canonical(project)
        meta['path'] = projectId
        manifest.push(meta)
        writeFileSync(join(ARCHIVE_DIR, sub, `${projectId}.content`), content, 'utf-8')
        writeFileSync(join(ARCHIVE_DIR, sub, `${projectId}.metadata`), JSON.stringify(meta), 'utf-8')
    }
    writeFileSync(join(ARCHIVE_DIR, sub, 'manifest.json'), JSON.stringify(manifest))
    console.log(`> "${sub}" archived`)
}

const ROOT_DIR = execSync('git rev-parse --show-toplevel').toString().trim()
const SOURCE_DIR = join(ROOT_DIR, 'source')
const ARCHIVE_DIR = join(ROOT_DIR, 'public', 'archive')

archive('essay')
archive('project')