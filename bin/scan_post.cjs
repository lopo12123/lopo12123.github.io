const {resolve} = require('node:path')
const {readdirSync} = require("node:fs");

const enRoot = resolve(__dirname, '../src/en/post')
const zhRoot = resolve(__dirname, '../src/zh/post')

const parse = (root) => {
    // get all categories
    const categories = readdirSync(root).filter(v => !v.endsWith('.md'))

    // get all posts in each category
    const tree = {}
    categories.forEach(category => {
        tree[category] = readdirSync(resolve(root, category)).filter(v => v.endsWith('.md'))
    })

}

parse(enRoot)
// parse(zhRoot)