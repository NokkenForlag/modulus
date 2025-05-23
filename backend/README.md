# Modulus Backend – Feide/OIDC Authentication

This backend service handles authentication via [Feide](https://www.feide.no/) using OpenID Connect (OIDC). It is part of the Modulus platform, which integrates GitHub Pages, Webflow, and secure login flows for role-based access.

## Features

- 🔐 Secure Feide login with automatic role extraction
- 🔁 Redirects to `auth-bridge.html` with extracted role as query parameter
- 💾 Supports front-end access control via `localStorage` or cookies
- 🌱 Built with lightweight Next.js API routes
- ✅ Designed for seamless integration with Webflow Memberships

## 📁 Project Structure

```
backend/
├── lib/
│   └── feideClient.ts        → OIDC client configuration
├── services/
│   └── authService.ts        → Extract role and debug tokens
├── types/
│   └── feide.d.ts            → Feide-related type declarations
├── pages/
│   └── api/
│       └── feide/
│           ├── login.ts      → Starts Feide login flow
│           └── callback.ts   → Handles token exchange and userinfo
└── .env.local                → Environment variables (not committed)
```

## Environment Setup

Create a `.env.local` file:

```bash
FEIDE_CLIENT_ID=your-client-id
FEIDE_CLIENT_SECRET=your-client-secret
FEIDE_REDIRECT_URI=http://localhost:3000/api/feide/callback
```

## Run Locally

```bash
cd backend
npm install
npm run dev
```

## Auth Flow

1. User initiates login via Feide
2. `/api/feide/login` redirects to the Feide authorization endpoint
3. `/api/feide/callback` handles the authorization code exchange
4. The `feide_role` is extracted and passed to the frontend as a query parameter
5. Frontend stores the role in `localStorage` and redirects to the protected content page

---

_Last updated: 2025-05-22_