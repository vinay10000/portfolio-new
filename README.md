# BUNNY-PORTFOLIO

A personal site: work history, writing, projects, gear, education, movies, and a resume.

Built with Next.js (App Router), React 19, Tailwind CSS v4 and TypeScript.
Everything is statically prerendered except the RSS feed.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Where your content lives

Most of what you would want to change is in `src/lib`. These are plain typed
data files, not MDX, so you can edit them without touching a component.

| File                    | What it drives                                                     |
| ----------------------- | ------------------------------------------------------------------ |
| `src/lib/site.ts`       | Your name, email, tagline, social links, nav, footer, quotes        |
| `src/lib/experience.ts` | Roles on `/` and `/work`, skills, degree, certifications            |
| `src/lib/projects.ts`   | The `/projects` list                                                 |
| `src/lib/personal.ts`   | `/movies`                                                  |
| `src/lib/gears.ts`      | `/gears`                                                             |
| `src/lib/brands.ts`     | Which tools get a real brand mark (see below)                       |

Writing lives in `content/blog/*.mdx`. One file per post, with frontmatter:

```mdx
---
title: "Post title"
description: "One line used on the list, the feed and search results."
date: "2026-08-18"
category: "Engineering" # drives the filter pills on /blog
tags: ["Next.js", "SQL"]
---
```

The post list, category counts, related posts, sitemap and RSS feed are all
derived from these files. Add a file and the whole site picks it up.

## Things you will want to replace

- **`src/lib/site.ts` → `domain` and `url`** — currently `mhvinay.pages.dev`.
  These feed the canonical URLs, the sitemap, the RSS feed and the social
  preview, so set them to wherever you actually deploy.
- The prose in `books`, `movies` and `gears` is placeholder. Replace it with your
  own. Anything without an `href` renders as plain text, so you cannot
  accidentally ship a link that goes nowhere.

Everything in `site.ts`, `experience.ts` and `projects.ts` was transcribed from
your LinkedIn profile export, so it is real content: three roles, the four
projects you have shipped, NSRIT, and the four certifications. Two deliberate
omissions:

- **No phone number.** The profile export does not carry one, and a portfolio is
  the wrong place to publish a number that was not checked. Add `phone` to
  `site.ts` and it will appear in the header line.
- **No CGPA.** The profile export does not state one.

The project rows have no `href` yet, so they render as plain text rather than
links that go nowhere. Add a real URL to each and they become clickable with no
other change.

## The resume PDF

`public/resume.pdf` is embedded by `/resume` in the browser's own PDF viewer, so
it works offline and needs no third-party embed. Drop in a newer export with the
same file name and nothing else changes.

The current file was rebuilt from a screenshot of the previous export after that
file was deleted by mistake, so it is a reconstruction rather than the original.
Re-export it from whatever produced it if you want it exact.

`/education` holds the degree and certifications. Both live in
`src/lib/experience.ts`, so they stay in one place with the rest of your
background.

## Tool marks on /work

`/work` shows a real brand mark for each tool where one genuinely exists, taken
from the `simple-icons` set. There is deliberately no invented two-letter
stand-in: for a tool with no real mark (SQL Server, Dynamics 365, Power Apps,
Power Automate and anything else you add from the Microsoft stack) the tile is
carried by its name alone.

To give a tool a mark, add its entry to `src/lib/brands.ts`. The keys are
lowercased tool names and the values are the matching `si*` export from
`simple-icons`. Anything you list but do not register simply falls back to the
name, which is the intended behaviour rather than a missing feature.

## The footer Spotify player

The third footer column is a Spotify playlist embed, 152px tall and lazy-loaded.
The playlist ID sits at the top of `src/components/site-footer.tsx`. Change that
one string to swap in a different playlist, or delete the whole third `<div>` to
remove the player.

## The cursor cat

`src/components/oneko.tsx` puts a small pixel cat on the page that follows your
pointer. It is mounted once in the root layout, so it follows you on every route.

**One cat at a time, and a different colour each visit.** The coat is chosen at
random when the component first mounts, so a refresh brings back a different cat.
The pick lives in a module-level variable rather than in state: a value in state
would have to be seeded by an effect, and picking during render would reshuffle
the colour on every re-render. To change the possible coats, edit `COATS`.

The pale coat is a CSS custom property (`--pet-pale`, defined for both themes in
`globals.css`) rather than a fixed colour, because a literal white sprite is
invisible against the light background. It resolves to a warm near-black on the
light theme and off-white on the dark one.

Four deliberate limits, all visible in the code:

- **Decorative.** `aria-hidden`, never focusable, and the pointer is not
  hijacked, so it changes nothing about how the site works.
- **No cursor, no cat.** A coarse pointer (touch) means there is nothing to
  chase, so the component does not mount at all.
- **Respects reduced motion.** `prefers-reduced-motion: reduce` means no cat.
- **The loop stops when the tab is hidden**, so a backgrounded tab costs nothing.

It never sits on top of a control. It is `pointer-events-none`, so it cannot
swallow a click.

The sprite is the 256x128 sheet from the MIT-licensed
[oneko.js](https://github.com/adryd325/oneko.js) project, a 32px grid 8 cells
wide and 4 tall. The frame table in the component is that project's own, and it
uses the full behaviour: eight-direction walk, sleep, alert, and scratching at
the walls. See `public/oneko/LICENCE.txt`, which ships alongside the asset as
the licence requires.

The colour is applied with a mask rather than a filter chain. The sprite is black
line art on a transparent background, so its alpha channel is exactly the cat's
silhouette; filling that with a flat colour tints it with no guesswork. A
`sepia() hue-rotate() saturate()` chain was tried first and was unreliable,
because pure black has no hue to rotate, so some of the cats stayed black.
## Design notes

Light and dark are the same layout with a different token set, defined at the top
of `src/app/globals.css`. The theme follows your OS by default and remembers a
manual choice. An inline script in `<head>` applies the stored theme before first
paint, so there is no flash of the wrong background.

Two deliberate decisions worth knowing about, because they differ from what you
might expect:

- **Tool names are always visible on `/work`.** They are not revealed on hover.
  A hover-revealed label is invisible on a touch device, and a row of unlabelled
  marks tells you nothing.
- **There are no scroll-in animations anywhere.** Nothing on the page starts
  hidden and fades in, so no content can ever get stranded invisible if an
  animation does not run.

Hover states change colour and background only. Nothing lifts, scales or gains a
drop shadow.
