/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// export {}

// declare global {
//     interface BlogFrontMatter {
//         encrypted: boolean;
//         /**
//          * only available if encrypted is true
//          */
//         encrypted_file_location?: string;
//         // 优先级, 越大越靠前, 默认为 0
//         priority: number;
//         title: string;
//         description: string;
//         category?: string;
//         publishDate: Date;
//         updatedDate?: Date;
//     }
//
//     interface RenderResult {
//         // 用于 `<Content/>` 组件进行展示
//         Content: any;
//         headings: {
//             depth: number
//             slug: string
//             text: string
//         }[]
//         remarkPluginFrontmatter: {
//             title: string
//             description: string
//             publishDate: string
//         }
//     }
//
//     interface BlogProps {
//         // 文件名全称
//         id: string;
//         // 文件名无后缀
//         slug: string;
//         // 正文原始内容
//         body: string;
//         // defineCollection 中的 schema
//         collection: string;
//         // frontmatter 数据
//         data: BlogFrontMatter
//         // 异步渲染函数
//         render: Function;
//     }
// }
