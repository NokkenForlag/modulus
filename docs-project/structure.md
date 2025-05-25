

# 🧭 Modulus Prosjektstruktur (Backend + Frontend)

Dette dokumentet gir en oversikt over gjeldende mappe- og modulstruktur for Modulus-prosjektet.

---

## 📁 Backend (Node/Express + Feide)

```
backend/
├── public/                  # Statisk tilgjengelige filer via Express
│   ├── js/                  # Egendefinerte moduler som brukes i Webflow
│   │   └── index.mjs
│   ├── styles/              # CSS-stiler
│   │   └── styles.css
│   └── assets/fonts/        # WOFF/WOFF2-fonter til Webflow
│
├── src/                    # TypeScript-kilde
│   ├── index.ts            # Express entry point
│   ├── routes/             # API-ruter (f.eks. /api/feide)
│   │   └── feideRoutes.ts
│   └── services/           # Auth-logikk og hjelpefunksjoner
│       └── authService.ts
│
├── .env                    # Miljøvariabler (lokalt)
├── .env.example            # Eksempel .env for utviklere
├── .gitignore              # Git-unntak (dist, node_modules, .env)
├── package.json            # NPM metadata og scripts
├── tsconfig.json           # TypeScript-konfig
├── README.md               # Dokumentasjon
```

---

## 📁 Frontend (valgfritt ved migrering fra Webflow)

```
frontend/
├── test/                   # Eksperimentelle filer (f.eks. auth-bridge.html)
├── js/                     # Midlertidig JS før flytt til backend/public/js
├── styles/                 # Midlertidig CSS før flytt til backend/public/styles
├── index.html              # Root for GH Pages / statisk visning
```

---

## 🔄 Kompilert Output (automatisk)

```
backend/dist/               # Auto-generert JS fra TypeScript (aldri commit!)
```

---

## ✅ Standardkonvensjoner

- Alle statiske ressurser (JS/CSS/font) serveres fra `backend/public/`
- All funksjonell kode ligger i `backend/src/`
- Webflow peker til backend-URL-er for autentisering og ressurser
- GitHub Pages kan deaktiveres når Render tar full overlevering

---