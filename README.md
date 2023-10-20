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

run `yarn gen [post/project] <filename>` in your terminal,
then a file will be generated in `src/<lang>/<post/project>/<filename>.md`

## Template

you can find a template [here](./template.md)

## TODO

- search support -- using https://www.npmjs.com/package/vitepress-plugin-pagefind