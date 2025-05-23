


# Webflow Structure and Integration Plan

This document outlines how the Modulus educational portal is structured and managed within Webflow, and how it integrates with external content (hosted on GitHub Pages) and dual login systems (Webflow Memberships and Feide).

---

## 🌐 Webflow Site Structure

### Domain
- **Primary site:** https://nokkenforlag.no
- **Portal path:** https://nokkenforlag.no/modulus/...

### Page types
- `/modulus/` – Entry point and general portal landing page
- `/modulus/portal` – Logged-in dashboard for members or Feide users
- `/modulus/[topic]` – Topic-specific content (CMS-based)
- `/modulus/login` – Webflow Membership login
- `/modulus/no-access` – Redirect page for unauthorized visitors

---

## 📦 CMS Collections

| Collection        | Purpose                          | Example usage                    |
|-------------------|-----------------------------------|----------------------------------|
| Topics            | Major subject categories          | Algebra, Geometry, etc.          |
| Lessons           | Subsections of topics             | Linear Equations, Potensregler   |
| Resources         | Links to static GitHub Pages      | External iframe integrations     |
| Membership Plans  | Tied to Webflow subscriptions     | Elev, Lærer, Privatkunde         |

Each collection is rendered using Collection Pages and custom layouts styled in Webflow Designer.

---

## 🔐 Access Control

### Webflow Memberships
- Pages can be restricted by plan (e.g., only “Lærer” plan sees teacher content)
- Controlled via Webflow Designer's “Memberships” panel

### Feide (external login)
- External users are redirected through `auth.html`
- After login, role is injected via `localStorage` or `cookie`
- Custom JavaScript in Webflow reads this value to conditionally:
  - Show/hide content sections
  - Redirect users from unauthorized pages

---

## 🧩 GitHub Pages Integration

### Content source:
- Hosted at: https://nokkenforlag.github.io/modulus/
- Includes:
  - Interactive modules
  - Mathematical visualizations (Rive, KaTeX)
  - Feide login bridge pages

### Integration methods:
- `<iframe src="...">` within Webflow pages
- Link buttons opening static HTML in a new tab
- Content filtering based on login role

---

## ✍️ Custom Code Example (Webflow)

**Script to reveal elements by Feide role:**
```html
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem('feide_role');
    document.querySelectorAll('[data-role]').forEach(el => {
      el.style.display = (el.dataset.role === role) ? 'block' : 'none';
    });
  });
</script>
```

---

## 🔄 Update Strategy

- Webflow is used as the main UI and layout system
- All interactive or external content is hosted on GitHub Pages and integrated modularly
- Membership and Feide logic will coexist until Modulus is potentially migrated to a standalone frontend

---

_Last updated: 2025-05-21_