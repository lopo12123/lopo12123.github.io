const fs = require("fs")
const path = require("path")

const public_dir = path.resolve(__dirname, "../public")
const prose_dir = path.resolve(public_dir, "source")

/**
 * @typedef {{
 *     title: string
 *     categories: string[]
 *     created: string
 *     updated?: string
 *     draft?: boolean
 * }} FrontMatter
 */

/**
 * @param filename {string}
 * @return {FrontMatter}
 */
const resolve_prose_file = (filename) => {
    const file = path.resolve(prose_dir, filename)
    const content = fs.readFileSync(file, {encoding: 'utf-8'})
    const lines = content.split("\n")

    const frontmatter = {filename: filename.slice(0, -3)}
    let reading = false
    for (const _line of lines) {
        const line = _line.trim()

        // handle start & end line
        if (line === '---') {
            if (reading) break
            reading = true
            continue
        }

        // ignore comment line
        if (line.startsWith('#')) continue

        const [k, v] = line.split(': ')
        if (k === 'category') {
            frontmatter['categories'] = v.split(',').map(v => v.trim())
        } else {
            frontmatter[k] = v
        }
    }

    return frontmatter
}

const files = fs.readdirSync(prose_dir)
const items = files
    .map(file => resolve_prose_file(file))
    .sort((a, b) => new Date(b.created) - new Date(a.created))

const statistics = {}
items.forEach(cfg => {
    cfg.categories.forEach(category => {
        if (!statistics[category]) statistics[category] = 0
        statistics[category] += 1
    })
})

const target_file = path.resolve(public_dir, "archive.json")
fs.writeFileSync(target_file, JSON.stringify({date: Date.now(), statistics, proses: items}), {encoding: 'utf-8'})
console.log('done')