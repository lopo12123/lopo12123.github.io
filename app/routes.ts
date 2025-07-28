import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    layout("layouts/app.tsx", [
        index("routes/home.tsx"),
        route("posts", "routes/posts/home.tsx"),
        route("posts/:postId", "routes/posts/detail.tsx"),
        route("tags", "routes/tags/home.tsx"),
        route("tags/:tagName", "routes/tags/detail.tsx"),
        route("tools", "routes/tools/home.tsx"),
        route("tools/qr", "routes/tools/qr.tsx"),
    ]),

    route("share", "routes/share.tsx"),
    // route("draft", "routes/draft.tsx"),
    route("*", "routes/404.tsx"),
] satisfies RouteConfig;
