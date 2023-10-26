import { createContentLoader } from "vitepress";

export default {
    async load() {
        return {
            post: await createContentLoader('src/zh/post/*.md').load(),
            project: await createContentLoader('src/zh/project/*.md').load()
        }
    }
}