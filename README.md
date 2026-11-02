# NuggetVPN documentation

A documentation website for the [NuggetVPN client](https://github.com/Rigby-Foundation/NuggetVPN), built with Next.js, Fumadocs UI, Fumadocs MDX, and local multilingual search.

## Run locally

Requires Node.js 20.9 or newer and npm. The initial build was verified with Node 24.

```bash
npm ci
npm run dev
```

Open the local URL printed by Next.js (normally http://localhost:3000). The original URLs redirect to English under `/en`.

## Production

```bash
npm run build
npm start
```

Deploy as a standard Next.js app. Set `NEXT_PUBLIC_SITE_URL` to its public origin before building (see `.env.example`) so social preview URLs use the correct host. Search uses the `/api/search` route, so this configuration needs a Next.js server rather than a plain static file host. No external search account or API key is required. Fonts are bundled locally. Social previews use one shared brand image, with translated page titles and descriptions in metadata; this avoids remote font requests and the image renderer’s Persian shaping limitation.

## Edit documentation

Pages live in `content/docs/<language>/` as MDX. A page starts with `title` and `description` frontmatter. Each section's `meta.json` controls sidebar order. Fumadocs generates the table of contents, navigation, search index, and Markdown representations from these files.

- `app/[lang]/(home)/page.tsx`: documentation landing page.
- `app/[lang]/docs/`: Fumadocs reading layout and page routes.
- `app/global.css`: Nugget palette, typography, and responsive styles.
- `components/mdx.tsx`: shared MDX components.
- `lib/source.ts`: content loader and Markdown output.
- `app/api/search/route.ts`: local documentation search.
- `app/[lang]/llms.txt/` and `app/[lang]/llms-full.txt/`: machine-readable documentation.

Useful checks:

```bash
npm run types:check
npm run check:links
npm run check:i18n
npm run build
```

## Content maintenance

The first edition contains 30 pages per language (180 MDX pages in total), based on the adjacent NuggetVPN checkout inspected on 29 October 2026. User workflows were cross-checked against the README, English UI labels, and core-support code. The complete CLI and plugin references were adapted from the client's `docs/` folder, with links rewritten for this site.

When client behaviour changes, update the relevant guides. In particular, recheck platform support, signing requirements, core compatibility, build tools, settings labels, and subscription refresh behaviour. The original VPN client was not modified.


## Languages

The site matches NuggetVPN’s current languages: English (`en`), Russian (`ru`), Ukrainian (`uk`), Simplified Chinese (`zh`, HTML tag `zh-CN`), Japanese (`ja`), and Persian (`fa`).

- URLs use the locale prefix, for example `/ru/docs` or `/fa/docs/guides/routing`.
- Switching languages preserves the article path, query, and section. It loads the new document because each locale owns its HTML language, text direction, and theme initialization.
- Persian uses a right-to-left layout and a locally bundled Vazirmatn font. Code blocks stay left-to-right.
- Search indexes every translation and filters results by the current locale. No English content fallback is configured.
- Page headings keep the same explicit anchor IDs across translations, so shared section links remain valid.
- `lib/locales/` contains site and Fumadocs interface messages. `lib/i18n.ts` defines supported languages.

English is the source of truth. When editing a guide, update the corresponding file in all six folders. Keep commands, API names, URLs, code examples, and anchor IDs intact. `check:i18n` checks page coverage, MDX structure, links, anchors, code examples, and interface message keys.

The initial article translations were machine assisted. Site/interface messages, page titles, client labels, and selected technical passages were reviewed and edited separately. Further language editing can be made directly in the MDX files; translation services are not used at runtime.
