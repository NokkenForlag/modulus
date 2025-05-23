


# Feide Integration Plan

This document outlines the architecture, configuration, and flow for integrating Feide authentication into the Modulus hybrid platform using a custom backend and login redirect via `auth.html`.

---

## 🎯 Purpose

To allow school users to log in securely using Feide (via OpenID Connect) and gain access to content on the Webflow-based frontend. The Feide system complements Webflow Memberships by supporting institutional access.

---

## 🔐 Authentication Flow

1. **Login Initiation**
   - User clicks a "Log in with Feide" button in Webflow or on `auth.html`
   - Redirects to backend endpoint `/api/feide/login`

2. **OIDC Redirect**
   - Redirects to `https://auth.dataporten.no` with configured client ID and scopes

3. **Callback Handling**
   - Redirected back to `/api/feide/callback` with code + state
   - Token exchange + userinfo retrieval
   - Role inferred (e.g., student, teacher)

4. **Bridge Redirect**
   - Redirects to `https://nokkenforlag.github.io/modulus/auth-bridge.html?role=teacher`
   - `auth-bridge.html` sets `localStorage` or `cookie` with `feide_role=teacher`

5. **Webflow Access**
   - Role is used in custom JS to show/hide content in Webflow

---

## 🧾 Backend Requirements

- Framework: Next.js or Express
- Library: `openid-client`
- Endpoints:
  - `/api/feide/login`
  - `/api/feide/callback`
- Env vars:
  - `FEIDE_CLIENT_ID`
  - `FEIDE_CLIENT_SECRET`
  - `FEIDE_REDIRECT_URI`

---

## 🧩 Frontend (Webflow) Integration

- Add custom code to:
  - Redirect to `/modulus/auth.html`
  - Check `localStorage.feide_role` or `document.cookie`
  - Conditionally show/hide blocks with `[data-role="teacher"]`, etc.
  - Redirect unauthorized users to a `no-access.html` page

Example Webflow script:
```js
const role = localStorage.getItem('feide_role');
if (role === 'teacher') {
  document.querySelectorAll('[data-role="teacher"]').forEach(el => el.style.display = 'block');
}
```

---

## ✅ Status Checklist

- [x] Feide client created in Dataporten
- [x] Backend login and callback routes implemented
- [ ] `auth-bridge.html` deployed to GitHub Pages
- [ ] Webflow custom code added for role gating
- [ ] Redirects and protection tested

---

_Last updated: 2025-05-21_