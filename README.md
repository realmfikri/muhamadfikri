# muhamadfikri.com

Recruiter-friendly portfolio site for **Muhamad Fikri** built with **Astro + TypeScript + Tailwind** and generated as a static site.

## Stack

- Astro (SSG)
- TypeScript
- Tailwind CSS
- Astro Content Collections (`src/content/projects`)
- GitHub Pages deployment workflow

## Local Development

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Project Structure

```text
.
├── public/
│   ├── CNAME
│   ├── Muhamad_Fikri_CV.pdf
│   ├── og.png
│   └── diagrams/
├── src/
│   ├── components/
│   ├── content/
│   │   ├── config.ts
│   │   └── projects/
│   ├── layouts/
│   ├── pages/
│   └── styles/
└── .github/workflows/deploy.yml
```

## Content: Add a New Project

1. Create a new Markdown file in `src/content/projects/`, for example:
   `src/content/projects/my-project.md`
2. Add frontmatter that matches `src/content/config.ts`:

```yaml
title: "My Project"
slug: "my-project"
tagline: "One-line summary"
date: "2026-03-01"
status: "active"
role: "Backend/System Developer"
stack: ["TypeScript", "Node.js"]
tags: ["Backend", "Product"]
links:
  - label: "GitHub"
    url: "https://github.com/your/repo"
featured: false
highlights:
  - "Short highlight one"
  - "Short highlight two"
```

3. In the Markdown body, keep this section format for consistency:
- Overview
- Problem / Context
- What I built (your responsibilities)
- Architecture
- Tech stack
- Key challenges & solutions
- Outcomes / current status
- Links

## Deployment (GitHub Pages)

Deployment is automated by `.github/workflows/deploy.yml`.

### One-time GitHub setup

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Ensure `main` is your deployment branch (or update the workflow trigger branch).

### How deployment works

- On push to `main`, the workflow:
  1. checks out the repo,
  2. builds the Astro site with `withastro/action`,
  3. deploys the generated `dist/` output using `actions/deploy-pages`.

## Custom Domain

- `public/CNAME` is included and set to:

```text
muhamadfikri.com
```

- `astro.config.mjs` sets:

```js
site: 'https://muhamadfikri.com'
```

No base path is configured, so the site works on the custom root domain.
