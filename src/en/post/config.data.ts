import { readdirSync } from "node:fs";
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
}