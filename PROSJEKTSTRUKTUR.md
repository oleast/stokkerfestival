# Prosjektstruktur

## Oversikt
Stokkerfestivalen er en Next.js 16-applikasjon for påmelding til 30-årsfest 22. august 2026.

## Mappestruktur

```
stokkerfestival/
├── app/                        – Next.js App Router
│   ├── layout.tsx              – Root layout (metadata, Geist-font, lang="no")
│   ├── page.tsx                – Forsiden (alle seksjoner)
│   ├── globals.css             – Tailwind v4 + @theme fargepalett
│   ├── personvern/page.tsx     – Personvernerklæring
│   ├── studio/[[...tool]]/     – Embedded Sanity Studio
│   └── api/
│       ├── registration/       – POST: ny påmelding
│       └── unregister/         – POST: avmelding
├── components/
│   ├── layout/                 – Header (sticky nav), Footer
│   ├── sections/               – Hero, About, Activities, Gallery, PracticalInfo, Registration, GuestList
│   └── ui/                     – Button, Input, SectionWrapper, Countdown, Confetti
├── sanity/
│   ├── env.ts                  – Sanity miljøvariabler
│   ├── sanity.config.ts        – Studio-konfigurasjon ('use client')
│   ├── lib/
│   │   ├── client.ts           – Read-only client (CDN)
│   │   ├── writeClient.ts      – Write client (server-only)
│   │   ├── image.ts            – urlFor() bildehjelper
│   │   └── queries.ts          – GROQ-spørringer
│   └── schemas/
│       ├── index.ts            – Schema barrel export
│       ├── galleryImage.ts     – Galleribilde-dokument
│       └── registration.ts     – Påmelding-dokument
├── lib/                        – Delt logikk
│   ├── email/                  – Brevo-integrasjon
│   └── validation/             – Zod-schemas
├── public/img/                 – Statiske bilder (OG, favicon)
├── img/                        – Råbilder fra gården
├── .env.local                  – Miljøvariabler (ikke i git)
├── next.config.ts              – Next.js-konfigurasjon
├── postcss.config.mjs          – PostCSS med Tailwind-plugin
├── eslint.config.mjs           – ESLint flat config
├── tsconfig.json               – TypeScript strict
└── package.json                – Avhengigheter og scripts
```

## Oppsett

1. `pnpm install`
2. Kopier `.env.local.example` til `.env.local` og fyll inn verdier
3. `pnpm dev` — starter utviklingsserver på localhost:3000
4. `/studio` — Sanity Studio (krever innlogging)

## Konvensjoner

- **TypeScript** strict i all kode
- **Prettier + ESLint** kjøres automatisk på commit (Husky/lint-staged)
- **Tailwind v4** med `@theme`-tokens i globals.css — bruk Tailwind-klasser, ikke inline styles
- **Komponenter**: PascalCase, én per fil, organisert i layout/sections/ui
- **Sanity**: Queries i `sanity/lib/queries.ts`, aldri direkte i komponenter
- **API-validering**: Zod for all input
- **Innhold**: Norsk, uformell, selvironisk tone
- **Kode**: Engelske variabelnavn
- **`'use client'`**: Kun for interaktive komponenter (skjema, kart, animasjoner)
