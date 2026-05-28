# Next.js-prosjekt for Stokkerfestival

## Kom i gang

1. Installer avhengigheter:
   ```sh
   pnpm install
   ```
2. Start utviklingsserver:
   ```sh
   pnpm dev
   ```

## Viktige mapper og filer

- `app/` – Hovedkodebase (Next.js App Router)
- `public/` – Offentlige filer
- `img/` – Råbilder og media (ikke berørt av Next.js)
- `.husky/` – Git hooks
- `.prettierrc` – Prettier-konfig
- `lint-staged.config.js` – lint-staged-oppsett
- `eslint.config.mjs` – ESLint-oppsett
- `tsconfig.json` – TypeScript-konfig

## Kodekvalitet og conventions

- TypeScript for all kode
- Automatisk linting og formatering på commit (Husky + lint-staged)
- Importer fra `@/` for rot (`app/`)
- Følg Copilot-forslag, men vurder alltid kodekritisk
- Dokumentasjon og commit-meldinger på norsk

Se PROSJEKTSTRUKTUR.md for detaljer.
