/// generate a template post in specified directory
/// Usage: gen <category/filename>

const { resolve } = require('node:path')
const { existsSync, mkdirSync, writeFileSync } = require('node:fs')

const generateNewMd = (root, filename) => {
    try {
        const isNew = !existsSync(root)

        if (isNew) {
            mkdirSync(root)
            writeFileSync(resolve(root, 'index.md'), configDataTs)
            writeFileSync(resolve(root, 'config.data.ts'), indexMD)
        }

        writeFileSync(resolve(root, `${filename}.md`), `---\nlayout: doc\n---\n\n# ${filename}`, 'utf-8')

        console.log(`Successfully generated ${root}/${filename}.md`)
    } catch (err) {
        console.error(err)
    }
}

// ==================== separate ====================

// yarn gen [post/project] <filename>
const [ category, filename ] = process.argv.slice(2)

if (!/^post|project$/.test(category)) {
    console.error('Invalid category, should be <post> or <project>')
}
else if (/\w+/.test(filename)) {
    console.error('Invalid filename, should be a word')
}
else {
    generateNewMd(resolve(__dirname, '../src/en', category), filename)
// generateNewMd(resolve(__dirname, '../src/zh', category), filename)
}