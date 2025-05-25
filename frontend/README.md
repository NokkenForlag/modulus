# Modulus Frontend

This directory contains the static frontend for the Modulus project, served by Render. It handles login routing, role storage, and access testing in coordination with Webflow and Feide.

## 📁 File Overview

These files are used for integration with Webflow and testing authentication.

| File                     | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| `auth.html`              | Login selector between Feide and Webflow Membership                        |
| `auth-bridge.html`       | Receives Feide redirect, stores user role in `localStorage`, and redirects to Webflow |
| `test-rollevisning.html` | Visual test page for role-based visibility using `localStorage`             |
| `index.html`             | Optional landing page (can be used for general entry or info)              |

---

## 🔐 Authentication Flow

- `auth.html` serves as the entry point for all unauthenticated users.
- After Feide login, users are redirected to `auth-bridge.html` with the `feide_role` included in the query string.
- `auth-bridge.html` stores the role in `localStorage` and redirects the user to a Webflow page.
- Webflow pages can use JavaScript and `data-role` attributes to conditionally display content based on the stored role.

---

## 🧪 Testing

- Use `test-rollevisning.html` to verify the role currently stored in `localStorage`.
- Helpful for validating access rules and debugging role-based content visibility.

---

_Note: These files are served from the Render frontend environment._

---

_Last updated: 2025-05-22_