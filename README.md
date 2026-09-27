# Portfolio

Personal site: work, writing, projects, gear, education, movies, and a resume.

Next.js (App Router), React 19, Tailwind v4, TypeScript. Prerendered except the
RSS feed.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Content

- `src/lib/*.ts` — typed data for every page: name and links, roles, projects,
  movies, gear, education.
- `content/blog/*.mdx` — one file per post. The list, categories, sitemap and
  RSS feed all derive from these, so adding a file is enough.
- `assets/resume.pdf` — copied to `public/resume.pdf`, which `/resume` embeds.
  Replace either one and `/resume` picks it up.

Set `domain` and `url` in `src/lib/site.ts` to wherever this is deployed. They
drive the canonical URLs, sitemap, feed and social preview.
