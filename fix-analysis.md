# Analýza a řešení ESLint/Prettier problémů - sparrow-ai-tech

## Současný stav
✅ **Build úspěšný** - kritické chyby vyřešeny v předchozí konverzaci
❌ **2408 ESLint problémů** - formátování a quality pravidla

## Kategorie problémů

### 1. Prettier formátovací chyby (~1500+ chyb)
- Nekonzistentní formátování JSX tagů
- Špatné zarovnání CSS tříd
- Chybějící lomítka nových řádků

### 2. ESLint no-undef chyby (~200+ chyb)
- `document`, `window` - browser globals
- `process` - Node.js globals  
- `Response`, `fetch` - Web API globals
- `require`, `module` - CommonJS globals

### 3. React specifické chyby (~100+ chyb)
- `react/display-name` - chybějící displayName u komponent
- `no-unused-vars` - nepoužité proměnné v komponentách

### 4. TypeScript parsing chyby (~50+ chyb)
- Nesprávný parser pro .astro soubory
- Missing type definitions

## Řešení

### A. Nové konfigurační soubory
1. **`.eslintrc.cjs`** - kompletní ESLint config pro Astro+React+TS
2. **`.prettierrc.mjs`** - Prettier config s Astro pluginem
3. **`package.json`** - updated lint scripts

### B. Opravené soubory
1. **React komponenty** - přidání displayName, cleanup unused vars
2. **API routes** - správné env globals
3. **TypeScript files** - import syntax fixes
4. **Astro files** - formátování a syntax

### C. Automatizační skript
- Bezpečné nahrazení všech souborů
- Backup existujících verzí
- Spuštění `npm install` pro nové dependencies
- Spuštění `npm run lint -- --fix` po update