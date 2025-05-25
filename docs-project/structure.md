# 🏗️ Modulus Architecture and Structure

This document provides an overview of the current folder and module structure for the Modulus project.

---

## 📁 Backend (Node/Express + Feide)

```
backend/
├── public/                  # Static files served by Express
│   ├── js/                  # Custom modules used in Webflow
│   └── assets/
│       ├── fonts/           # WOFF/WOFF2 fonts
│       └── rive/            # Rive animations
│
├── src/                    # TypeScript source
│   ├── index.ts            # Express entry point
│   ├── routes/             # API routes (e.g., /api/feide)
│   │   └── feideRoutes.ts
│   └── services/           # Auth logic and helper functions
│       └── authService.ts
│
├── .env                    # Environment variables (local)
├── .env.example            # Example .env for developers
├── .gitignore              # Git exclusions (dist, node_modules, .env)
├── package.json            # NPM metadata and scripts
├── tsconfig.json           # TypeScript config
├── README.md               # Documentation
```

---

## 📁 Frontend (optional when migrating from Webflow)

```
frontend/
├── public/
│   ├── assets/
│   │   ├── fonts/             # Custom fonts
│   │   └── styles/            # CSS styles used by Webflow or iFrame content
│   ├── pages/                 # Static HTML content (exported from Webflow or manually created)
│   └── test/                  # Dev tools and debug views (auth view, token tests, etc.)
├── index.html                 # Temporary main page (can be replaced by Webflow portal)
├── auth.html, auth-bridge.html, logg-ut.html, _headers  # Various support files for auth in iFrame
└── README.md
```

---

## 🔄 Compiled Output (automatic)

```
backend/dist/               # Auto-generated JS from TypeScript (never commit!)
```

---

## ✅ Standard Conventions

- All static resources (JS/CSS/fonts) are served from `backend/public/`
- All functional code resides in `backend/src/`
- Webflow points to backend URLs for authentication and resources

---