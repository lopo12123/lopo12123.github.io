/// generate a template post in specified directory
/// Usage: gen <category/filename>

const { resolve } = require('node:path')
const { writeFileSync, readFileSync } = require('node:fs')

const generateNewMd = (root, filename, content) => {
    try {
        writeFileSync(resolve(root, `${filename}.draft.md`), content, 'utf-8')

        console.log(`Successfully generated ${root}/${filename}.md`)
    } catch (err) {
        console.error(err)
    }
}

// ==================== separate ====================

// both of the following commands are valid:
// yarn gen [post/project] <filename>
// yarn gen [post/project]/<filename>
let [ category, filename ] = process.argv.slice(2)
if (!filename && category.includes('/')) {
    [ category, filename ] = category.split('/')
}

console.log('- Category:', category)
console.log('- FileName:', filename)

if (!/^post|project$/.test(category)) {
    console.error(`Invalid category, should be <post> or <project> | got ${category}`)
}
else if (!/\w+/.test(filename)) {
    console.error(`Invalid filename, should be a word | got ${filename}`)
}
else {
    const template = readFileSync(resolve(__dirname, '../template.md'), 'utf-8')
    generateNewMd(resolve(__dirname, '../src/en', category), filename, template)
// generateNewMd(resolve(__dirname, '../src/zh', category), filename, template)
}