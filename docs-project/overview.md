# 🧠 Modulus – Conversation Map & Collaboration Guide

This document outlines how topic-specific conversations in ChatGPT are structured to ensure consistency, reuse, and focused progress throughout the Modulus development lifecycle.

## 🗂 Conversation Structure

| Conversation Title                                     | Description & Focus                                                    |
|--------------------------------------------------------|------------------------------------------------------------------------|
| `📄 README og roadmap oppdatering`                     | Project documentation, versioning, milestone logs                      |
| `🧭 Overblikk & Myldring`                              | High-level brainstorming, concepts across frontend/backend             |
| `🚀 GitHub Pages: deploy og struktur`                  | GitHub Pages deployment, `frontend/docs` layout, static auth files     |
| `🧠 Planlegging: Fremtidig migrering til fullstack-løsning` | Strategy for migrating away from Webflow to a fullstack domain    |
| `🧪 Rollevisning og test-filer`                        | Role-based access UI, test helpers like `test-rollevisning.html`       |
| `🔐 Feide login og auth.html`                          | Feide/OIDC login, `auth.html` and `auth-bridge.html` integration       |
| `🌐 Webflow: medlemskap og rollebasert innhold`        | Webflow CMS visibility, eCommerce roles, Feide and membership sync     |

---

## 🛠 How to Use This Overview

- 🔹 Each conversation acts as a **dedicated workspace** for a specific project area.
- 🧠 **Prefix all requests** with the conversation name (e.g. `🔐 Feide login...`) to maintain topic separation and reuse context.
- 📌 Use `📄 README og roadmap oppdatering` for documentation improvements or cross-topic summaries.
- 🧪 Use `🧪 Rollevisning...` for testing role visibility logic or new HTML helpers.
- 📁 This document is your source of truth for which thread to use.

## 🔄 Updating This Overview

- Add a new row when a long-term conversation is started.
- Adjust descriptions as project scope shifts.
- Archive conversations only if deprecated and replaced.

_Last updated: 2025-05-22_