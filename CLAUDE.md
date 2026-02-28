# CLAUDE.md — avAstro

This file documents the codebase structure, conventions, and workflows for AI assistants working on this project.

## Project Overview

**avAstro** is a personal blog and portfolio site for Andrew Vieau, built with Astro 5. It uses markdown files as the content source, Preact for interactive components, Tailwind CSS for styling, and generates an RSS feed.

- **Site URL (production placeholder):** `https://example.com` (set in `astro.config.mjs`)
- **Dev server:** `http://localhost:4321`

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Astro](https://astro.build) | ^5.13.0 | Static site framework / routing |
| [Preact](https://preactjs.com) | ^10.26.9 | Interactive UI components |
| @astrojs/preact | ^4.1.0 | Astro ↔ Preact integration |
| @astrojs/rss | ^4.0.12 | RSS feed generation |
| Tailwind CSS | ^4.1.12 | Utility-first styling |
| @tailwindcss/vite | ^4.1.12 | Vite plugin for Tailwind |

No database, no CMS, no testing framework. All content lives in markdown files.

---

## Development Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview the built site locally
npm run astro     # Run Astro CLI directly (e.g. npm run astro -- check)
```

There is no `npm test` script. There are no automated tests in this project.

---

## Repository Structure

```
/
├── public/                  # Static assets served as-is
│   ├── favicon.svg
│   └── images/              # Public images (duplicates of src/images for direct URL access)
├── src/
│   ├── blog/                # Markdown blog posts (content source)
│   │   └── *.md             # Each file = one blog post
│   ├── components/          # Reusable UI components
│   │   ├── *.astro          # Astro components (SSG, no client JS by default)
│   │   └── Greeting.jsx     # Preact component (interactive, uses hooks)
│   ├── images/              # Optimized images (processed by Astro's Image component)
│   ├── layouts/             # Page layout wrappers
│   │   ├── BaseLayout.astro          # Root layout: header + footer + slot
│   │   ├── MarkdownPostLayout.astro  # Blog post layout (uses BaseLayout)
│   │   └── MyMarkdownLayout.astro   # Minimal alternate markdown layout
│   ├── pages/               # File-based routing (every file = a route)
│   │   ├── index.astro      # Home page (/)
│   │   ├── about.astro      # About page (/about)
│   │   ├── blog.astro       # Blog listing (/blog)
│   │   ├── rss.xml.js       # RSS feed endpoint (/rss.xml)
│   │   ├── posts/
│   │   │   └── [...slug].astro  # Dynamic route: /posts/<slug>
│   │   └── tags/
│   │       ├── index.astro      # All tags (/tags)
│   │       └── [tag].astro      # Posts by tag (/tags/<tag>)
│   ├── scripts/
│   │   ├── menu.js              # Mobile hamburger menu toggle
│   │   └── andrewTheObject.js   # Unused personal data object
│   ├── styles/
│   │   └── global.css           # Global styles + Tailwind directives
│   └── content.config.ts        # Astro content collection schema
├── astro.config.mjs         # Astro configuration
├── tailwind.config.js       # Tailwind configuration (preflight disabled)
└── tsconfig.json            # TypeScript config (strict, Preact JSX)
```

---

## Content System

Blog posts are markdown files in `src/blog/`. They are loaded via Astro's Content Collections API using a glob loader.

### Required Frontmatter

Every `.md` file in `src/blog/` **must** include all of these fields (validated by Zod schema in `src/content.config.ts`):

```yaml
---
title: "Post Title"
pubDate: 2025-08-22    # ISO date — parsed as Date object
description: "Short description of the post."
author: "Andrew Vieau"
image:
  url: "https://example.com/image.jpg"
  alt: "Image description"
tags: ["astro", "blogging"]  # Array of strings; drives tag pages
---
```

### Content Collection Config (`src/content.config.ts`)

- Uses `glob` loader targeting `./src/blog/**/*.md`
- Files prefixed with `_` are excluded by the glob pattern
- Exports a single `blog` collection

### Accessing Posts in Pages

```astro
---
import { getCollection, render } from 'astro:content';
const allPosts = await getCollection('blog');
// Sort by date descending:
const sorted = allPosts.sort((a, b) =>
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---
```

### Featured Posts

A post is "featured" when its `tags` array includes the string `"featured"`. The home page displays the most recent featured post via `MostRecentFeaturedPost.astro`.

---

## Routing Conventions

Astro's file-based router maps files in `src/pages/` directly to URLs:

| File | Route |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/about.astro` | `/about` |
| `src/pages/blog.astro` | `/blog` |
| `src/pages/rss.xml.js` | `/rss.xml` |
| `src/pages/posts/[...slug].astro` | `/posts/<slug>` |
| `src/pages/tags/index.astro` | `/tags` |
| `src/pages/tags/[tag].astro` | `/tags/<tag>` |

Dynamic routes (`[tag].astro`, `[...slug].astro`) must export `getStaticPaths()` to enumerate all valid paths at build time.

---

## Component Conventions

### Astro Components (`.astro`)

- Default for all UI that doesn't need client-side interactivity.
- Component script runs at build time (server-only).
- Props are received via `Astro.props`.
- Scoped `<style>` blocks are preferred for component-specific styles.

```astro
---
// Component script (build-time only)
const { title } = Astro.props;
---
<h1>{title}</h1>
<style>
  h1 { color: var(--mainGreen); }
</style>
```

### Preact Components (`.jsx`)

- Used only when client-side interactivity is required (e.g., `Greeting.jsx`).
- Import hooks from `preact/hooks` (not `react`).
- Must be activated with a client directive where used:
  - `client:load` — hydrate immediately on page load.
  - `client:idle` — hydrate when browser is idle.
  - `client:visible` — hydrate when scrolled into view.

```astro
<!-- In an .astro file -->
<Greeting client:load messages={["Hello", "Hej"]} />
```

### Naming Conventions

- **Components:** PascalCase (`BlogPost.astro`, `Greeting.jsx`)
- **Pages:** lowercase (`index.astro`, `about.astro`, `blog.astro`)
- **Dynamic route segments:** bracket syntax (`[tag].astro`, `[...slug].astro`)
- **Utility scripts:** camelCase (`menu.js`)

---

## Layout System

All pages wrap content in `BaseLayout.astro`, which accepts:

| Prop | Type | Required | Purpose |
|---|---|---|---|
| `pageTitle` | `string` | Yes | `<title>` tag and `<h1>` heading |
| `pageImage` | `string` | No | Open Graph / social image URL |
| `pageDescription` | `string` | No | Meta description |

Blog posts use `MarkdownPostLayout.astro`, which wraps `BaseLayout` and renders post metadata (date, description, author, image, tags) above the markdown `<slot />`.

---

## Styling

### Approach

- **Global styles:** `src/styles/global.css` — imported in `BaseLayout.astro`.
- **Component styles:** Scoped `<style>` blocks inside `.astro` files.
- **Tailwind utilities:** Available in all files via the Vite plugin.

### Key Design Tokens

```css
--mainGreen: #009B77;   /* Primary green accent */
```

Palette used in CSS:
- Coral/red links: `#FF6F61`
- Blue post links: `#00539F`
- Light background: `#f1f5f9`
- Dark mode background: `#0d0950`

### Dark Mode

Dark mode is toggled by adding/removing the `.dark` class on `<html>`. The theme preference is persisted in `localStorage` under the key `theme`. Implementation is in `ThemeIcon.astro` using an inline `<script is:inline>` block to avoid hydration flash.

### Responsive Breakpoints

Single breakpoint defined in `global.css`:
- **Mobile (<636px):** Hamburger menu shown, nav links hidden.
- **Desktop (≥636px):** Hamburger hidden, nav links shown inline.

### Tailwind Preflight

Tailwind's CSS reset (`preflight`) is **disabled** in `tailwind.config.js` to avoid conflicts with existing custom styles.

---

## Image Handling

- **Optimized images:** Place in `src/images/` and import with Astro's `<Image>` component for automatic optimization.
- **Blog post images:** Referenced via URL string in frontmatter (`image.url`); rendered with a standard `<img>` tag in `MarkdownPostLayout.astro`.
- **Public images:** Files in `public/images/` are served at `/images/<filename>` with no processing.

---

## RSS Feed

Generated at `/rss.xml` via `src/pages/rss.xml.js`. It imports the blog collection and maps each post to an RSS item. Update the `site` field in `astro.config.mjs` from the placeholder (`https://example.com`) to the real domain before deploying.

---

## TypeScript

- Config extends `astro/tsconfigs/strict` (strict mode enabled).
- JSX is set to `react-jsx` with `jsxImportSource: preact`, so Preact JSX works without explicit imports.
- All source files are included; `dist/` is excluded.
- Run `npm run astro -- check` to type-check the project.

---

## Key Constraints & Watch-Outs

1. **No tests exist.** Do not add test infrastructure unless explicitly requested.
2. **No environment variables are in use.** The project requires no `.env` file to run.
3. **Tailwind preflight is off.** Do not re-enable it without reviewing global style conflicts.
4. **`site` in `astro.config.mjs` is a placeholder.** Set it to the real domain for RSS and sitemap correctness before any production deploy.
5. **`andrewTheObject.js`** in `src/scripts/` is unused. Do not import it.
6. **Obsidian config** in `src/blog/.obsidian/` — ignore this directory; it's a local editor config for the Obsidian markdown editor.
7. **No CI/CD pipeline exists.** Deployment is manual.
8. **Images are duplicated** between `src/images/` and `public/images/`. Prefer `src/images/` for new images so Astro can optimize them.
