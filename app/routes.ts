import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("share", "routes/share.tsx"),
    route("*", "routes/not_found.tsx"),
] satisfies RouteConfig;
