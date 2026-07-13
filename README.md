# s-johri.github.io

Personal portfolio site for Saurabh Johri &mdash; About, experience at Code Argo, case studies, and
open-source project write-ups. Built with [Astro](https://astro.build) as a static site, deployed
via GitHub Pages.

Case studies and project entries live as Markdown files in `src/content/projects/`, validated
against the schema in `src/content.config.ts`.

## Stack

- [Astro](https://astro.build) (static output)
- Content collections (`astro:content`) for project/case-study entries
- No client-side framework &mdash; plain HTML/CSS pages

## Commands

All commands are run from the root of the project:

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start local dev server at `localhost:4321`    |
| `npm run build`     | Build the production site to `./dist/`        |
| `npm run preview`   | Preview the production build locally          |
