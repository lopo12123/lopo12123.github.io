import { createHashRouter, RouteObject } from "react-router";
import { RootLayout } from "./layout.tsx";
import HomePage from "@/pages/home";
import { EssayGalleryPage } from "@/pages/essay.tsx";
import { EssayPage } from "@/pages/essay.$id.tsx";

const routes: RouteObject[] = [
    {
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: '/essay',
                loader: EssayGalleryPage.loader,
                element: <EssayGalleryPage/>,
            },
            {
                path: '/essay/:essayId',
                loader: EssayPage.loader,
                element: <EssayPage/>,
            },
        ],
    }
]

const router = createHashRouter(routes)

export {
    router,
}