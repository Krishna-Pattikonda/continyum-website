# Continyum website

Static site built with [Astro](https://astro.build). All copy lives in `src/content/` and is edited in the browser with [Pages CMS](https://pagescms.org). See **[EDITING.md](EDITING.md)** for the non-technical guide.

## Local development

Requires Node 22.23.4 or newer.

```bash
npm install
npm run dev       # http://localhost:4321
npm run check     # type-check (astro check)
npm run build     # build to dist/
npm run preview   # serve dist/ locally
```

## Project layout

| Path | What it is |
| --- | --- |
| `src/content/site/home.yaml` | Headline, subline, footer tagline, intros for the Research/Products/Team pages |
| `src/content/site/contact.yaml` | Contact page + footer "Get in touch" (email, address, channels) |
| `src/assets/brand/` | Logo: `continyum-logo.png` (header) and `continyum-logo-light.png` (footer) |
| `src/assets/fonts/` + `src/styles/fonts.css` | Self-hosted Newsreader + Inter (Newsreader uses `font-display: optional` to avoid layout shift) |
| `public/` | `favicon.svg`, `apple-touch-icon.png`, `og-image.png` (link previews), `.htaccess` (Apache hosts only) |
| `src/content/research/*.md` | One file per research entry |
| `src/content/products/*.md` | One file per product |
| `src/content/team/*.yaml` | One file per person |
| `src/assets/uploads/` | Images uploaded through Pages CMS (optimised at build) |
| `src/content.config.ts` | Content schemas. A field change here also needs a change in `.pages.yml` |
| `src/styles/global.css` | Design tokens and base styles |
| `.pages.yml` | Pages CMS configuration |
| `.github/workflows/deploy.yml` | Build + deploy to GitHub Pages on every push to `main` |

## Deploy: GitHub Pages

1. Create a GitHub repository and push this folder to its `main` branch.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push (or run the workflow from the **Actions** tab). The site appears at `https://<user>.github.io/<repo>/`.

The workflow reads the correct URL and base path from GitHub automatically (`SITE_URL`, `BASE_PATH`), so project sites and custom domains both work with no code changes.

### Custom domain

1. **Settings → Pages → Custom domain**: enter `continyum.in` and save.
2. At your DNS provider:
   - Apex domain (`continyum.in`): four `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (optionally `AAAA` records `2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153`).
   - `www`: a `CNAME` record pointing to `<user>.github.io`.
3. Once DNS resolves, tick **Enforce HTTPS**.
4. Re-run the deploy workflow so canonical URLs and the sitemap use the custom domain.

## Deploy: Vercel (alternative)

Import the repository in Vercel. It detects Astro automatically; no settings needed. The site URL defaults to `https://continyum.in`; set a `SITE_URL` environment variable in Vercel if you use a different domain.

## Connecting Pages CMS

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with GitHub.
2. Install the Pages CMS GitHub app on the repository when prompted.
3. Open the repository. Pages CMS reads `.pages.yml` and shows Home, Research, Products, Team and Contact.

Each save commits to `main`, which triggers the deploy workflow.

## Rules for this codebase

- No client-side JavaScript. The mobile menu is a native `<details>` element.
- No CSS framework or component library: plain CSS only.
- No copy in components. Text belongs in `src/content/`.
- Colour lives in `src/styles/global.css`. Each section has an **ink** (safe for text, ≥ 4.9:1 on white) and a **tint** (pastel, decoration only, never behind small grey text). Pages pick theirs up from `data-section` on `<body>`. Brass (`#C9A961`) is decorative only, never text.
- All motion is CSS (`rise`, `drift`, scroll-driven `.reveal`) and is switched off entirely under `prefers-reduced-motion`. Browsers without scroll-driven animation support just show the content.
