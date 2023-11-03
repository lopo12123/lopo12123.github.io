import { readdirSync, readFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const enPostDir = resolve(__dirname, '../../src/en/post')
const enProjectDir = resolve(__dirname, '../../src/en/project')
const zhPostDir = resolve(__dirname, '../../src/zh/post')
const zhProjectDir = resolve(__dirname, '../../src/zh/project')

const parsePost = (isen, filename) => {
    try {
        const file = readFileSync(join(isen ? enPostDir : zhPostDir, filename), 'utf-8')
        const lines = file.split('\n')
        const text = lines.find(v => v.startsWith('topic:'))?.replace('topic:', '').trim()
        const link = `/${isen ? 'en' : 'zh'}/post/${filename.replace('.md', '.html')}`
        return {
            text,
            link
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

const parseEn = () => {
    const posts = readdirSync(enPostDir).filter(v => v.endsWith('.md'))
    const projects = readdirSync(enProjectDir).filter(v => v.endsWith('.md'))

    const postMeta = posts.map(v => parsePost(true, v)).filter(v => !!v.text)
    // const projectMeta = projects.map(v => parsePost(true, v)).filter(v => !!v.topic)
    const projectMeta = []

    return {
        postMeta,
        projectMeta
    }
}

const parseZh = () => {
    const posts = readdirSync(zhPostDir).filter(v => v.endsWith('.md'))
    const projects = readdirSync(zhProjectDir).filter(v => v.endsWith('.md'))

    const postMeta = posts.map(v => parsePost(false, v)).filter(v => !!v.text)
    // const projectMeta = projects.map(v => parsePost(true, v)).filter(v => !!v.topic)
    const projectMeta = []

    return {
        postMeta,
        projectMeta
    }
}

export {
    parseEn,
    parseZh
}