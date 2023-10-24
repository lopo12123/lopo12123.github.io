import {createContentLoader} from "vitepress";

export default {
    async load() {
        const all = await createContentLoader('src/en/post/*.md').load()
        const docs = all
            .filter((item) => {
                const layout = item.frontmatter.layout
                return layout === 'doc' || !layout
            })
            .map((item) => {
                return {
                    name: item.frontmatter.topic,
                    link: item.url,
                    brief: item.frontmatter.brief,
                }
            })

        return {docs}
    }
}