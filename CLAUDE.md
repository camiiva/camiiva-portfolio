# CLAUDE.md — Camila Valencia Portfolio

## Project overview

Personal portfolio landing page for Camila Valencia, Senior Product Designer.
Stack: **Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript**
Design source: Figma file `c5tzbslW6wSPwVWVaKMsEs`

---

## Commands

```bash
npm run dev      # local dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

---

## Project structure

```
app/
  globals.css    # Design tokens (@theme) + base styles
  layout.tsx     # Root layout — fonts loaded here
  page.tsx       # Landing page (single page)
public/          # Static assets (images, SVGs)
CLAUDE.md
```

---

## Design tokens (Tailwind CSS v4)

Tokens live in `app/globals.css` under `@theme inline`. Tailwind v4 has **no `tailwind.config.ts`** — extend the theme here.

### Colors

| Token class         | Hex value  | Usage                          |
|---------------------|------------|--------------------------------|
| `bg-bg`             | `#071e21`  | Page background                |
| `bg-surface`        | `#0b3439`  | Hover/active project card bg   |
| `bg-footer`         | `#0a2326`  | Footer background              |
| `bg-img-bg`         | `#185259`  | Image placeholder background   |
| `border-border`     | `#133e43`  | Card/section borders           |
| `text-accent`       | `#33fab3`  | Accent (mint green)            |
| `bg-accent`         | `#33fab3`  | Button background              |
| `text-text-dark`    | `#0a2326`  | Text on accent (button label)  |
| `text-muted`        | `#eff9fa`  | Light-grey body text on dark backgrounds |
| `text-meta`         | `#70a2a8`  | Muted teal metadata text (client/year line) |

Always use token classes, never raw hex values in components.

### Typography

| CSS variable              | Font                | Tailwind class    | Usage                        |
|---------------------------|---------------------|-------------------|------------------------------|
| `--font-space-grotesk`    | Space Grotesk       | `font-heading`    | Nav, headings, buttons, meta |
| `--font-ibm-plex-sans`    | IBM Plex Sans       | `font-body`       | Body / description text      |

Fonts are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables.

### Border radius

| CSS variable      | Value   | Tailwind usage                  |
|-------------------|---------|---------------------------------|
| `--radius-card`   | `12px`  | `rounded-card`                  |
| `--radius-pill`   | `999px` | `rounded-pill`                  |

### Type scale (from Figma)

| Element           | Size   | Weight  | Tracking       | Line height |
|-------------------|--------|---------|----------------|-------------|
| Hero headline     | 64px   | Bold    | -0.64px        | 1.1         |
| Hero greeting     | 40px   | Medium  | —              | 1.2         |
| Nav links         | 16px   | Medium  | 1.28px         | 1.2         |
| Project title     | 24px   | Bold    | -0.24px        | 1.1         |
| Project body      | 20px   | Regular | —              | 1.4         |
| Project metadata  | 20px   | Medium  | —              | 1.4         |
| Button label      | 20px   | Bold    | -0.2px         | 1.1         |
| Footer links      | 16px   | Medium  | —              | 1.2         |

---

## Component patterns

### Button (pill)
```tsx
<a
  href={href}
  className="inline-flex items-center justify-center rounded-pill bg-accent px-8 py-3 font-heading text-[20px] font-bold leading-[1.1] tracking-[-0.2px] text-text-dark"
>
  View case study
</a>
```

### Project card
```tsx
<article className="flex items-start justify-end gap-18 p-12 border-b-2 border-border">
  {/* Left: text content + button */}
  <div className="flex flex-1 flex-col items-start justify-between self-stretch min-w-0">
    ...
  </div>
  {/* Right: image */}
  <div className="h-[526px] w-[773px] shrink-0 rounded-card bg-img-bg" />
</article>
```
- First card gets `bg-surface border-t-2` for the hover/featured state.

### Nav link (active)
```tsx
<a href="#work" className="underline decoration-accent decoration-wavy">WORK</a>
```

---

## Styling rules

- **Tailwind v4** — no `tailwind.config.ts`. All custom tokens go in `globals.css > @theme inline`.
- Use `font-heading` / `font-body` utility classes (mapped to CSS variables in `@theme`).
- Use token classes (`bg-bg`, `text-accent`, `border-border`, etc.) — never hardcode hex values.
- Use `rounded-card` and `rounded-pill` for border radius (NOT `rounded-card` — `@theme inline` doesn't emit runtime CSS vars).
- No dark mode handling needed — the design is dark-only.
- Layout is **1440px design width** but use responsive Tailwind classes for real responsiveness.

---

## Assets

- Static images go in `/public/`.
- Use `next/image` (`<Image>`) for photos and optimized images.
- Figma asset URLs expire after 7 days — download them and save to `/public/` immediately.

---

## Figma integration

- **File key:** `c5tzbslW6wSPwVWVaKMsEs`
- Use `mcp__figma-remote-mcp__get_design_context` with `fileKey` + `nodeId` from the URL.
- Convert `node-id=7-890` → `nodeId: "7:890"` (dash → colon).
- Figma outputs React + Tailwind with hardcoded values. Always convert to project tokens before using.
- Map Figma raw values to tokens:
  - `#071e21` → `bg-bg`
  - `#0b3439` → `bg-surface`
  - `#133e43` → `border-border` / `bg-border`
  - `#33fab3` → `text-accent` / `bg-accent`
  - `#0a2326` → `bg-footer` / `text-text-dark`
  - `#185259` → `bg-img-bg`
  - `font-['Space_Grotesk:...]` → `font-heading`
  - `font-['IBM_Plex_Sans:...]` → `font-body`
