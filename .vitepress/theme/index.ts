import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import Outline from './Outline.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({app}) {
        app.component('outline', Outline)
    }
}