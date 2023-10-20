import './index.css'

import type {Theme} from "vitepress";

import DefaultTheme from 'vitepress/theme'
import CustomLayout from "./layouts/CustomLayout.vue";

const theme: Theme = {
    // extends: DefaultTheme,
    ...DefaultTheme,
    Layout: CustomLayout,
}

export default theme