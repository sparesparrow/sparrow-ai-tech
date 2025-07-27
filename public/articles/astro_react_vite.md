## Přehled projektu

`sparrow-ai-tech` je **moderní webová aplikace** postavená na Astro + React. Repo obsahuje:

- **Plně statický frontend** (Astro) s možností hydratačních React-komponent.
- **Tailwind CSS** s defaultním _dark-mode_ a přepínačem tématu.
- **astro-i18n** pro vícejazyčnost.
- **Back-end API endpointy** pro ElevenLabs a generování PDF.
- **Jednotkové (Jest) a E2E (Cypress) testy**.
- Automatizované **CI/CD v GitHub Actions** s Lighthouse kontrolou a nasazením na GitHub Pages[1].

## Struktura kódu

| Složka              | Účel                                                     | Poznámky                          |
| ------------------- | -------------------------------------------------------- | --------------------------------- |
| `src/`              | Stránky, komponenty React, layouty Astro, globální styly | Jádro aplikace                    |
| `public/`           | Statické soubory (obrázky, manifest, lokalizační JSON)   | Build se kopíruje beze změn       |
| `articles/`         | Markdown články a dokumentace                            | Generováno do blogu/Docs          |
| `infographics/`     | Samostatné HTML infografiky                              | Mimo hlavní Astro routing         |
| `cypress/`          | Testovací scénáře, fixtures, support                     | _data-cy_ selektory pro stabilitu |
| `dist/`             | Výstupní build Astro/Vite                                | Deploy na gh-pages                |
| `build/`, `/_site/` | Historické artefakty (CRA, Jekyll)                       | Lze smazat po migraci             |

Díky čistému dělení lze aplikaci **snadno rozšířit** o další jazyky, design-témata či nové API route.

## Závislosti a build

- **Node.js ≥ 18 LTS**
- **Astro v4** s integracemi pro React a Tailwind CSS
- **Vite** jako bundler (Astro používá interně)
- **PostCSS** & **autoprefixer** pro zpracování a optimalizaci CSS
- **ESLint** & **Prettier** pro statickou analýzu a formátování kódu
- **Jest** & **Testing Library** pro testování komponent
- **Cypress** pro end-to-end testy (klikací scénáře)
- **Lighthouse CI** pro audit výkonu a přístupnosti

Lokální skripty (`npm run dev/build/preview/test`) jsou standardní; výstup `dist/` slouží k nasazení na GitHub Pages.

## GitHub Actions (CI/CD)

Workflow v **`.github/workflows/ci.yml`** (jméno se může lišit) typicky provádí:

1. **Check-out kódu**
2. **Setup Node / pnpm / npm-cache**
3. **Install** – `npm ci` pro reprodukovatelnou instalaci
4. **Lint & type-check** – ESLint, případně `tsc --noEmit`
5. **Unit testy** – `npm test -- --runInBand`
6. **E2E (headless)** – `npm run cy:run` na Chrome Electron
7. **Lighthouse CI** – generuje JSON a HTML report, ukládá artefakt
8. **Build** – `npm run build` (Astro → `dist/`)
9. **Deploy**
   - buď `actions/upload-pages-artifact` + `actions/deploy-pages`,
   - nebo `peaceiris/actions-gh-pages` pro push do `gh-pages` větve.
10. **Caching** (actions/cache) pro `~/.npm` a Cypress-binary → zkracuje běh.

Pipeline běží na **každý push do hlavní větve** a na **pull-requesty**; nasazení spouští jen merge/tag.

## GitHub Pages (`sparesparrow.github.io/sparrow-ai-tech`)

Produkční stránka je **statický build** Astro hostovaný na CDN GitHub Pages:

- **Rychlé TTFB** (globální CDN), automatic HTTPS.
- **Dark-mode** je řízený CSS `data-theme`, preference se ukládá do `localStorage`.
- **Vícejazyčnost** (např. `/?lang=cs`) generuje samostatné HTML soubory.
- **Interaktivní prvky** (přepínač jazyka, tlačítka) se hydratují jako React-islands, zbytek zůstává čisté HTML → výborné _core-web-vitals_.
- **SEO**: Astro generuje `meta` a `link rel=alternate` pro každou lokalizaci, sitemap.xml lze doplnit.
- **A11y**: Semantic HTML + `aria-label`, testováno Cypress i Lighthouse.

## Silné stránky

- **Čisté oddělení prezentace a logiky** díky Astro-komponentám.
- **Přísné testování** (Jest + Cypress) a Lighthouse audit zvyšují spolehlivost.
- **Bezstavový statický deploy** → nulové provozní náklady.
- **Multi-locale** připravené pro budoucí expanzi.

## Návrhy na vylepšení

| Oblast            | Doporučení                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| **Build-time**    | Zapnout **incremental build** v Astro (`experimental: { assets:true }`) a `pnpm` workspace cache. |
| **CI rychlost**   | Vytáhnout Cypress do paralelních jobs (`matrix.browser`) a sdílet artefakty.                      |
| **Bezpečnost**    | Přidat `dependabot.yml` + SCA scan (e.g. `actions/setup-node` + `audit-ci`).                      |
| **CD**            | Přepnout na **deployment environment** s ochrannými pravidly (review required).                   |
| **Monitoring**    | Vložit `lighthouse-badges` do README + GitHub Pages Insights.                                     |
| **I18n workflow** | Automatizovat kontrolu nevyplněných překladů pomocí skriptu v CI.                                 |
| **Legacy složky** | Archivovat / odstranit `build/` a `/_site/` (CRA, Jekyll) pro čistší repo.                        |
| **Design system** | Export Figma → Tailwind tokens, generovat přímo do configu (`tailwindcss-fluid`).                 |
| **Accessibility** | Doplnit jest-axe testy a Pa11y CI skript pro regresní kontrolu.                                   |

## Shrnutí

Repo `sparrow-ai-tech` představuje **ukázkovou Astro + React aplikaci** s důrazem na rychlost, přístupnost a mezinárodní podporu. GitHub Actions pipeline pokrývá celý životní cyklus – od linters po plně automatizované nasazení na GitHub Pages – a poskytuje solidní základ, který lze dále optimalizovat pro škálování i podnikovou úroveň[1].
