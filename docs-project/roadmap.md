# 🛣️ Modulus Roadmap

This document outlines the staged development plan for Modulus — a hybrid educational platform powered by Webflow and GitHub Pages, with support for dual login via Webflow Memberships and Feide.

## 🔖 Current Deployment

The latest stable version is available at:  
[https://nokkenforlag.github.io/modulus](https://nokkenforlag.github.io/modulus)

---

## ✅ Phase 1: Webflow-first with GitHub Pages integration (Status: Complete)

**Objectives:**
- Deliver CMS-powered portal pages through Webflow (`nokkenforlag.no/modulus/...`)
- Integrate static and interactive content hosted via GitHub Pages (`nokkenforlag.github.io/modulus/...`)
- Enable dual login: Webflow Memberships and Feide
- Manage access control via Webflow Collections and custom JavaScript

**Completed Tasks:**
- [x] Webflow portal structure built
- [x] GitHub Pages deployed for external modules
- [x] `auth.html` login bridge created
- [x] Feide login flow implemented
- [x] Role-based visibility via JavaScript enabled

---

## 🔄 Phase 2: Hybrid role-aware access control (Status: In Progress)

**Objectives:**
- Conditionally show/hide elements in Webflow based on Feide roles
- Allow coexistence of Webflow Membership and Feide-authenticated users

**Tasks:**
- [x] Store `feide_role` in `localStorage`
- [ ] Insert custom JavaScript in Webflow for element-level gating
- [ ] Route unauthenticated users through `auth.html`
- [ ] Frontend protection of role-gated content

---

## 🚀 Phase 3: Backend-powered progression and secure sessions (Status: Planned)

**Objectives:**
- Enable token-based login and session validation
- Support learning progression, user tracking, and persistent roles

**Tasks:**
- [ ] Set up Supabase for user data storage
- [ ] Implement API routes in Next.js backend
- [ ] Sync roles and login state across sessions
- [ ] Migrate selected dynamic components to Next.js where applicable

---

## 🌐 Phase 4: Optional migration to fullstack custom domain (modulus.no)

**Objectives:**
- Prepare for long-term independence from Webflow
- Consolidate frontend and backend under a unified domain

**Tasks:**
- [ ] Register and configure custom domain (`modulus.no`)
- [ ] Mirror GitHub Pages and backend on dedicated hosting
- [ ] Export Webflow CMS or recreate in alternative CMS (if applicable)
- [ ] Launch standalone platform with unified login system

---

_Last updated: 2025-05-22_