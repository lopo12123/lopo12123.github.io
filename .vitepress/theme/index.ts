import './index.css'

import type {Theme} from "vitepress";

import DefaultTheme from 'vitepress/theme'
import CustomLayout from "./layouts/CustomLayout.vue";
import Outline from "./layouts/Outline.vue";

const theme: Theme = {
    extends: DefaultTheme,
    // ...DefaultTheme,
    enhanceApp({app}) {
        app.component('Outline', Outline)
    },
    Layout: CustomLayout,
}

export default theme