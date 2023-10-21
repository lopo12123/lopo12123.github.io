import { createContentLoader } from "vitepress";

export default {
    async load() {
        return {
            post: await createContentLoader('src/en/post/*.md').load(),
            project: await createContentLoader('src/en/project/*.md').load()
        }
    }
}