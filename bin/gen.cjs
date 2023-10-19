/// generate a template post in specified directory
/// Usage: gen <category/filename>

const {resolve} = require('node:path')
const {existsSync, mkdirSync, writeFileSync} = require('node:fs')

/**
 * code template for config.data.ts
 */
const configDataTs = `import { readdirSync } from "node:fs";
import { resolve } from "node:path";

export default {
    load() {
        const base = __dirname.match(/(?<=src\\).*/i)?.[0]?.replace(/\\/g, '/') || ''

        const tree = {}
        readdirSync(resolve(__dirname, '.')).filter(v => !v.includes('.')).forEach(category => {
            tree[category] = readdirSync(resolve(__dirname, category)).filter(v => v.endsWith('.md'))
        })

        // console.log('tree in post', tree)

        return { tree, base }
    }
}`

/**
 * code template for index.md
 */
const indexMD = `---
    layout: page
---

    <script setup>
        import Outline from '@layout/Outline.vue';
        import { data } from './config.data.ts';
    </script>

<Outline :base="data.base" :tree="data.tree"/>`

/**
 * code template for new md
 */
const newMD = (title) => `---
layout: doc
---

# ${title || 'De finibus bonorum et malorum'}

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

const generateNewMd = (root, filename, title) => {
    try {
        const isNew = !existsSync(root)

        if (isNew) {
            mkdirSync(root)
            writeFileSync(resolve(root, 'index.md'), configDataTs)
            writeFileSync(resolve(root, 'config.data.ts'), indexMD)
        }

        writeFileSync(resolve(root, `${filename}.md`), newMD(title))

        console.log(`Successfully generated ${root}/${filename}.md`)
    } catch (err) {
        console.error(err)
    }
}

// ==================== separate ====================

// args: [<path-to-node>, <path-to-this-file>, <category/filename>, [<title-en>/<title-zh>]]
const args = process.argv.slice(2)

const valid = /^\w+\/\w+$/.test(args[0])
if (!valid) {
    console.warn('Please specify category/filename in correct format (\\w+/\\w+).\nUsage: gen <category>/<filename>')
    process.exit(1)
}

// TODO: support deep path (e.g. gen category/subcategory/filename)
const [category, filename] = args[0]?.split('/')
const [titleEn, titleZh] = args[1]?.split('/')

const enRoot = resolve(__dirname, '../src/en', category)
const zhRoot = resolve(__dirname, '../src/zh', category)

generateNewMd(enRoot, filename, titleEn)
generateNewMd(zhRoot, filename, titleZh)