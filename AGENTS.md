<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Stokkerfestivalen – Copilot Guiderails

## Prosjekt
Norskspråklig festivalside for 30-årsdag 22. august 2026. Single-page design med påmelding, bildegalleri, kart, nedtelling, konfetti.

## Tech Stack
- **Framework**: Next.js 16.2.6 (App Router, Server Components default)
- **Styling**: Tailwind CSS v4 (PostCSS plugin, `@theme` i globals.css)
- **CMS**: Sanity (eksternt studio på `stokkerfestival.sanity.studio`, deploy med `pnpm deploy:studio`)
- **Hosting**: Cloudflare Pages (auto-deploy fra GitHub)
- **E-post**: Brevo (europeisk, GDPR)
- **Kart**: OpenStreetMap + Leaflet
- **Validering**: Zod

## Next.js 16 – Viktige regler
- `params` og `searchParams` er **async** — må awaites i page/layout-komponenter
- `middleware.ts` heter nå `proxy.ts` med `proxy()`-funksjon
- Turbopack er default bundler
- `revalidateTag()` krever andre argument
- `images.remotePatterns` bruker `new URL()` syntaks
- `next lint` er fjernet — bruk ESLint CLI direkte
- Flat config (eslint.config.mjs) er påkrevd

## Komponent-konvensjoner
- **PascalCase** filnavn, én komponent per fil
- `'use client'` kun der nødvendig (forms, maps, animasjoner)
- Organisering:
  - `components/layout/` — Header, Footer
  - `components/sections/` — Hero, About, Activities, Gallery, PracticalInfo, Registration, GuestList
  - `components/ui/` — Button, Input, SectionWrapper, Countdown, Confetti

## Sanity-patterns
- **Queries**: `sanity/lib/queries.ts` (GROQ)
- **Read client**: `sanity/lib/client.ts` (CDN-enabled)
- **Write client**: `sanity/lib/writeClient.ts` (server-only, med token)
- **Image URLs**: `sanity/lib/image.ts` (`urlFor()`)
- **Schemas**: `sanity/schemas/` (galleryImage, registration)

## Fargepalett (fra globals.css @theme)
| Token | Hex | Bruk |
|-------|-----|------|
| `--color-primary` | #8B2500 | Låverød, CTA, aksenter |
| `--color-primary-dark` | #6B1D00 | Hover states |
| `--color-primary-light` | #A83000 | Lys variant |
| `--color-background` | #FDFBF7 | Hovedbakgrunn (off-white) |
| `--color-background-alt` | #F5F0E8 | Alternativ seksjonsbakgrunn |
| `--color-text` | #1A1A1A | Brødtekst |
| `--color-text-muted` | #4A4A4A | Sekundær tekst |
| `--color-accent` | #D4A574 | Varm aksent |
| `--color-border` | #E5DDD3 | Skillelinjer |

## Norsk tone
- **Stil**: Selvironisk, humoristisk, uformell
- **Språk**: Alt brukervendt innhold på norsk
- **Kode**: Engelske variabelnavn, norske kommentarer kun der nødvendig
- **Commit-meldinger**: Norsk
- **Eksempel**: "30 år. Halvveis til 60. Det krever en fest."

## Mappestruktur
```
app/                    – Next.js App Router
├── layout.tsx          – Root layout (metadata, fonter, lang="no")
├── page.tsx            – Forsiden (single-page)
├── globals.css         – Tailwind + fargepalett
├── personvern/         – Personvernerklæring
└── api/                – API routes (registration, unregister)
components/
├── layout/             – Header, Footer
├── sections/           – Seksjon-komponenter
└── ui/                 – Gjenbrukbare UI-komponenter
sanity/
├── env.ts              – Miljøvariabler
├── sanity.config.ts    – Studio-konfigurasjon
├── lib/                – Client, queries, image helper
└── schemas/            – Dokumenttyper
lib/                    – Utilities (email, validation)
public/img/             – Optimaliserte bilder for OG etc.
img/                    – Råbilder (ikke prosessert av Next.js)
```

## Regler
- TypeScript strict, ingen `any`
- Zod for all API-input-validering
- `next/image` for alle bilder (med Sanity URL-builder)
- Semantic HTML (section, nav, main, header, footer)
- WCAG AA: kontrast, fokusringer, labels, alt-tekst
- Mobil-først responsive design
