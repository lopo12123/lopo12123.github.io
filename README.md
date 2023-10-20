## Architecture

the directory structure of the project is as follows:

- [`.vitepress`](./.vitepress) -- files for vitepress
- [`bin`](./bin) -- some scripts for template generation, see [Generate](#generate)
- [`src`](./src) -- the source code of the site
    - `<lang>`
        - `archive`
            - `index.md` -- the archive page
        - `project`
            - `index.md` -- the project page
            - `<name-of-project>` -- specific project page
        - `post` -- the post page
            - `index.md` -- the post page
            - `<name-of-post>` -- specific post page

## Generate

```
yarn gen [post/project] <filename>
```

## TODO

- search support -- using https://www.npmjs.com/package/vitepress-plugin-pagefind