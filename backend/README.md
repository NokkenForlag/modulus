# Modulus Backend

Dette er backend-serveren for Modulus-prosjektet. Den er bygget med Express og TypeScript og håndterer blant annet autentisering via Feide/OIDC.

---

## 🚀 Formål

- Rutehåndtering for Feide-login og callback
- Fremtidig verifisering av ID-token og utledning av roller
- Klart for integrasjon med Webflow-frontend via `auth.html`

---

## 🧱 Teknologi

- Node.js
- Express
- TypeScript
- dotenv
- axios

---

## 📂 Struktur

modulus-backend/
├── src/
│   ├── index.ts                # Oppstart av Express-server
│   ├── routes/
│   │   └── feideRoutes.ts      # /api/feide/login og /callback
│   └── services/
│       └── authService.ts      # Genererer login-redirect-URL
├── .env                        # (lokalt) miljøvariabler – ikke i Git!
├── .env.example                # Eksempelvariabler
├── package.json
├── tsconfig.json
└── dist/                       # Byggede filer etter npm run build

---

## ⚙️ Miljøvariabler (.env)

Opprett `.env` basert på `.env.example`:

```env
FEIDE_CLIENT_ID=din-klient-id
FEIDE_CLIENT_SECRET=din-klient-secret
FEIDE_REDIRECT_URI=http://localhost:3000/api/feide/callback
FEIDE_ISSUER=https://auth.dataporten.no
FEIDE_TOKEN_ENDPOINT=https://auth.dataporten.no/oauth/token


⸻

🛠 Scripts

npm run dev     # Starter serveren med ts-node
npm run build   # Kompilerer til dist/
npm start       # Kjører serveren fra dist/index.js


⸻

🔐 API-ruter
	•	GET /ping
→ Enkel test-rute (pong ✅)
	•	GET /api/feide/login
→ Redirecter til Feide for autentisering
	•	GET /api/feide/callback?code=...
→ Tar imot kode, henter access_token og id_token

⸻

🧪 Test

npm install
npm run build
npm start

	•	Åpne: http://localhost:3000/ping
	•	Test Feide: http://localhost:3000/api/feide/login

⸻

📝 Lisens

Dette prosjektet er utviklet og vedlikeholdt av [Nøkken Forlag AS].

---