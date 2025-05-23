# Modulus – Hybrid Portal Deployment (Webflow + GitHub Pages)

Modulus is a hybrid educational portal combining structured CMS content and memberships (via Webflow) with interactive modules and statically hosted resources (via GitHub Pages).

This repository supports the GitHub Pages deployment of the static components and integrates with a Webflow-based UI and access system.

---

## ✅ Current Deployment Model

- **Webflow:** Hosts `https://nokkenforlag.no/modulus/...` (portal, memberships, CMS)
- **GitHub Pages:** Hosts `https://nokkenforlag.github.io/modulus/...` (static interactive modules)
- **Auth:** Dual login paths:
  - Webflow Memberships (native)
  - Feide (via backend + auth bridge)

---

## 🧭 Workflow Overview

```text
 VSCode ⟶ Git Commit & Push ⟶ GitHub Actions ⟶ GitHub Pages
     (You work here)                   (Auto-deploys static content)
```

---

## 📁 Folder Structure

```
modulus/
├── frontend/
│   ├── docs/             ← Static site content for GitHub Pages
│   ├── styles/           ← CSS or component styles for embeds
│   └── rive/             ← Rive animation files
├── backend/              ← Feide login handling (Next.js)
├── docs-project/         ← Planning, roadmap, architecture
├── .github/
│   └── workflows/
│       └── pages.yml     ← GitHub Actions deploy script
├── README.md
```

---

## 🚀 How to Update GitHub Pages Content

### 1. Edit files in `frontend/docs/`

Examples:
- `index.html`
- `auth.html`
- `auth-bridge.html`
- `oppgave-eksempel.html`

### 2. Deploy to GitHub Pages

To publish changes, run the deploy script:

```bash
npm run deploy
```

This will push the contents of `frontend/docs/` to the `gh-pages` branch and publish to:

- https://nokkenforlag.github.io/modulus

If a custom domain is configured (via DNS and CNAME):

- https://auth.modulus.nokkenforlag.no

---

## 🔐 Integration Notes

- Feide login redirects to `auth-bridge.html` which sets a cookie/localStorage role
- Webflow reads the role and displays content conditionally
- External modules (iframe/embed) live in this repo under `frontend/docs/`

---

## 🧠 Tips

- Keep GitHub Pages content modular and stateless
- If you need to force redeploy, use:  
  `git commit --allow-empty -m "Trigger redeploy"`
- Refer to `docs-project/roadmap.md` for long-term plans

---

Last updated: 2025-05-21
