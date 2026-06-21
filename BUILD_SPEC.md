# justintimeaccesssoftware.com — Build Spec

> Status: AWAITING FINAL APPROVAL — all open questions resolved; ready to build on approval.
> Revisions: 5 guides (not 4), 5 tools (not 4), CyberArk → Palo Alto Networks (CyberArk), vendor comparison uses rich card-grid + checkbox filter panel (ASM pattern).

---

## 1. Site Identity

| Field | Value |
|---|---|
| Domain | justintimeaccesssoftware.com |
| Site name | Just-in-Time Access Software |
| Topbar brand HTML | `Just-in-Time Access <span>Software</span>` |
| Tagline | `independent guidance for JIT access buyers` |
| Newsletter name | The Independent Defender |
| Newsletter family | Defender (ASM + NHI + DSPM + JIT) |
| Feeds | Defender Free list |
| Sibling sites | nonhumanidentitysoftware.com (NHI/JIT convergence overlap), dspmsoftware.com (same newsletter, closest pattern reference) |
| Why page title | "The Vault Solves the Wrong Problem" |

---

## 2. Accent Colors

| Token | Value | Used for |
|---|---|---|
| `--accent` | `#2E7D4F` | Links, active nav, callout borders, button backgrounds, step numbers |
| `--accent-dim` | `#235E3B` | Button hover, link hover |
| `--accent-pale` | `#E5F1EA` | Verdict backgrounds, callout fills, tool gate bar |

FOUC guard in every `<head>`:
```html
<style>:root{--accent:#2E7D4F;--accent-dim:#235E3B;--accent-pale:#E5F1EA}</style>
```

---

## 3. Newsletter Infrastructure

| Field | Value |
|---|---|
| Worker URL | `https://newsletter.justintimeaccesssoftware.com/subscribe` |
| MailerLite group ID | `189858273326793780` (Defender Free — same as DSPM/NHI) |
| POST body | `{ email: "<address>", group_id: "189858273326793780" }` |
| Success check | `data.message === 'Subscribed'` |
| Wiring pattern | Class-based: auto-wire all `.newsletter-form` elements (not IDs) |
| Status element | Dynamically inserted `<p class="newsletter-status">` after the form |

---

## 4. Export Gate (Tools — new pattern)

Interactive tools render results on-screen immediately. Export functionality is gated behind a newsletter signup.

**Flow:**
1. User interacts with tool, sees results on-screen
2. "Export PDF" and "Export JSON" buttons appear below results
3. User clicks either button — an inline email form slides into view
4. User submits email → calls Worker endpoint
5. On `data.message === 'Subscribed'`: trigger the requested export; show confirmation
6. Export PDF: `window.print()` with print-specific CSS (hides nav, topbar, export gate; shows results only)
7. Export JSON: construct `Blob` from `JSON.stringify(results)`, trigger download via ephemeral `<a>` element

**Markup pattern (below each tool's results section):**
```html
<div class="export-gate" id="export-gate" style="display:none">
  <span class="page-label">Export your results</span>
  <p>Enter your email to download — you'll be added to The Independent Defender.</p>
  <div class="newsletter-form export-form">
    <input type="email" placeholder="your@email.com" aria-label="Email address">
    <button type="button" class="btn-export" data-format="pdf">Export PDF</button>
    <button type="button" class="btn-export" data-format="json">Export JSON</button>
  </div>
</div>
```

The export gate div is hidden until results are ready; JS shows it when the tool produces output.

---

## 5. Vendor Roster

**Total vendor count: 22** (20 from brief + P0 Security + Entitle)

Profile selection criteria (applied autonomously): Profiles are written for vendors that are (a) category leaders with high pre-RFP search intent, (b) architecturally distinctive enough to warrant a dedicated explanation, and (c) not already contextually obvious to the buyer from their existing platform (which excludes Okta and Microsoft). The 8 profiled vendors cover every meaningful architectural fault line.

### Category 1 — Cloud-Native & Developer-First JIT

| Vendor | Profile | Notes |
|---|---|---|
| Britive | Yes | Category pioneer; ephemeral IAM role provisioning; cross-cloud session timer cleanup |
| Apono | Yes | Context-aware bundle approach; single-click incident response access packages; policy-engine first |
| StrongDM | Yes | Zero-trust infrastructure proxy evolution; short-lived token injection for DB/SSH/K8s |
| Opal | No | Decentralized peer-approval model; strong in developer-led orgs; index only |
| Indent | No | ChatOps-centric; narrow scope; Slack/Teams request routing; index only |

### Category 2 — IdP-Native JIT/PIM

| Vendor | Profile | Notes |
|---|---|---|
| Okta (Privileged Access) | No | Buyers already know it; consolidation-native play; index only |
| Microsoft (Entra PIM) | No | Default for Microsoft-heavy shops; not a neutral evaluation choice; index only |

### Category 3 — Legacy PAM Giants

| Vendor | Profile | Notes |
|---|---|---|
| Palo Alto Networks (CyberArk) | Yes | CyberArk acquired by Palo Alto; vault-centric architecture with JIT layered on; strongest in hybrid/AD-heavy estates; acquisition context is editorial material |
| BeyondTrust | Yes | PEDM-first; UNIX/Linux/Windows endpoint privilege; vendor remote access; architecturally distinct from former CyberArk |
| Delinea | Yes | Thycotic + Centrify merger; hybrid-first; strong Linux/Unix credential elevation; user-experience focus |
| One Identity (Safeguard) | No | IGA/lifecycle integration; niche within PAM; index only |

### Category 4 — Workload, NHI & Proxy JIT

| Vendor | Profile | Notes |
|---|---|---|
| Teleport | Yes | Open-source; certificate-based (SSH/RDP/K8s/DB); no persistent keys on targets; high developer community search intent |
| Aembit | Yes | NHI-first; dynamic token provisioning for service accounts, APIs, microservices; direct content bridge to nonhumanidentitysoftware.com |
| SSH.COM PrivX | No | Pure ephemeral certificate SSH/RDP; niche positioning; index only |
| Banyan Security (SonicWall) | No | Acquired; zero-trust infrastructure layer; index only |

### Category 5 — Regional & Mid-Market

| Vendor | Profile | Notes |
|---|---|---|
| Heimdal | No | PAM + endpoint protection + app control bundle; mid-market; index only |
| WALLIX (Bastion) | No | EMEA-dominant; OT/industrial; compliance-heavy; index only |
| ARCON | No | APAC/EMEA footprint; audit-depth focus; index only |
| ManageEngine (PAM360) | No | Cost-conscious mid-tier; basic JIT + discovery; index only |
| Serval | No | AI-driven IT ops orchestration; emerging; index only |

### Additional Vendors

| Vendor | Profile | Notes |
|---|---|---|
| P0 Security | No | Cloud-native JIT; growing; notable in the challenger narrative; index only |
| Entitle | No | Acquired by Zscaler; JIT-native at acquisition; index only |

---

## 6. Page Inventory — 30 pages at launch

### Infrastructure (not pages)

| File | Notes |
|---|---|
| `styles.css` | Verbatim copy from DSPM/NHI — zero edits |
| `config.js` | New — JIT values |
| `nav.js` | New — JIT nav structure |
| `newsletter.js` | New — JIT Worker URL + group_id + class-based wiring |
| `vendors.json` | New — 22-vendor array (feeds vendor-comparison tool) |
| `favicon.svg` | Exists |
| `og-image.svg` | Exists |

### Home — `/index.html`

Sections:
- Lead paragraph: the PAM-to-JIT evaluation decision; why this is harder than it looks; what this site is
- "The problem with standing access" section
- "What this site covers" section (the four architectural fault lines)
- "Start here" card grid → Landscape, Vendors, Comparisons, Guides, Tools
- "Why independent" section

### Why — `/why/index.html`

Title: **"The Vault Solves the Wrong Problem."** Covers: why legacy PAM vendor content frames the JIT question in terms of their existing architecture, what zero standing privilege means in practice vs. in product marketing, how to use this site.

### Landscape — `/landscape/index.html`

Four fault lines as organizing frame:
1. Cloud-native ephemeral JIT vs. vault-centric PAM with JIT bolted on
2. Identity-platform-native (Okta/Entra PIM) vs. third-party overlay
3. Human access workflows vs. non-human/workload JIT (service accounts, AI agents)
4. Approval-workflow-first vs. policy-engine-first (automated grant/deny)

Sections: two-buyer framing (security/IAM lead doing PAM replacement vs. JIT overlay), category walkthrough, consolidation direction (CNAPP absorption of JIT startups), "where to go next" nav.

### Vendor Index — `/landscape/vendor-index/index.html`

All 22 vendors in tabular form, organized by category. Columns: vendor, category, deployment model, one-line description, profile link where applicable. No rankings.

### Vendor Profiles — `/vendors/[slug]/index.html`

8 pages. Each: tool-header, spec-grid, overview, architecture and key capabilities, strengths and limitations (pros-cons block), target environment, verdict, related comparisons.

| Vendor | URL |
|---|---|
| Palo Alto Networks (CyberArk) | `/vendors/cyberark/` (slug kept for search findability) |
| BeyondTrust | `/vendors/beyondtrust/` |
| Delinea | `/vendors/delinea/` |
| Britive | `/vendors/britive/` |
| Apono | `/vendors/apono/` |
| StrongDM | `/vendors/strongdm/` |
| Teleport | `/vendors/teleport/` |
| Aembit | `/vendors/aembit/` |

### Comparisons Hub — `/comparisons/index.html`

Brief framing + card grid (4 cards).

### Comparisons — 4 head-to-heads

| Page | URL | Fault line |
|---|---|---|
| Palo Alto (CyberArk) vs. BeyondTrust | `/comparisons/cyberark-vs-beyondtrust/` | Two legacy PAM giants with different architectural centers of gravity; acquisition context addressed directly |
| Britive vs. Apono | `/comparisons/britive-vs-apono/` | Two cloud-native pure-plays with different provisioning philosophies |
| JIT-Native vs. PAM-with-JIT | `/comparisons/jit-native-vs-pam-with-jit/` | The defining fault line: ephemeral-first vs. vault-first |
| Third-Party JIT vs. IdP-Native | `/comparisons/third-party-jit-vs-idp-native/` | Overlay architecture vs. Okta Privileged Access / Entra PIM |

### Guides Hub — `/guides/index.html`

Brief framing + card grid (4 cards).

### Guides — 5 at launch

| Page | URL | Topic |
|---|---|---|
| JIT and NHI convergence | `/guides/jit-nhi-convergence/` | Where JIT access and NHI governance overlap and where they diverge; cross-link to nonhumanidentitysoftware.com |
| PAM replacement vs. JIT overlay | `/guides/pam-replacement-vs-jit-overlay/` | How to evaluate whether your environment needs a replacement or an overlay before the sales cycle starts |
| Zombie session revocation | `/guides/zombie-session-revocation/` | The asynchronous token revocation problem: why JIT console claims "revoked" and active sessions disagree |
| JIT rollout without breaking on-call | `/guides/jit-rollout-oncall/` | Sizing a JIT rollout for engineering teams where access latency is an operational constraint |
| What your JIT logs tell an attacker | `/guides/jit-telemetry-overexposure/` | JIT approval channels as reconnaissance surface; resource naming conventions as attack intel; metadata masking requirements |

### Tools Hub — `/tools/index.html`

Brief framing + card grid (4 cards).

### Tools — 5 at launch

| Page | URL | Pattern | Export gate |
|---|---|---|---|
| Vendor Comparison | `/tools/vendor-comparison/` | Rich card grid with sticky checkbox filter panel (ASM pattern); data from `vendors.json`; each card shows name, tier, pricing, description, best-fit, matched-filter tags, watch note | No |
| Architecture Fit Selector | `/tools/architecture-fit/` | Decision tree: 5 questions, result paths covering PAM replacement / overlay / IdP-native / cloud-native | No |
| Approval Friction Calculator | `/tools/approval-friction-calculator/` | Form inputs → calculates engineering hours lost to approval overhead per week/year | Yes — PDF + JSON |
| Policy Sprawl Index | `/tools/policy-sprawl-index/` | Multi-cloud infrastructure allocation sliders (live total counter, must sum to 100%) → Operational Overhead Index + recommended architecture tier | Yes — PDF + JSON |
| JIT Velocity Calculator | `/tools/jit-velocity-calculator/` | Sliders for human JIT request volume vs. automated/NHI token request volume + latency tolerance → deployment blueprint separating human-workflow platforms from high-velocity token proxy requirements | Yes — PDF + JSON |

### Subscribe — `/subscribe/index.html`

Standard subscribe page.

---

## 7. vendors.json Structure

22-vendor array, matching ASM rich-card pattern. Each object:

```json
{
  "name": "Palo Alto Networks (CyberArk)",
  "slug": "cyberark",
  "tier": "Legacy PAM",
  "url": "https://www.paloaltonetworks.com",
  "pricing": "$$$",
  "profile": true,
  "profile_url": "/vendors/cyberark/",
  "description": "Vault-centric PAM platform, now part of Palo Alto Networks. JIT workflows layered on via API. Strongest in hybrid and AD-heavy estates; broadest enterprise installed base.",
  "best_fit": "Enterprises with deep on-premises AD footprints and an existing CyberArk deployment requiring JIT overlay rather than replacement.",
  "watch": "Acquisition by Palo Alto Networks is reshaping roadmap direction — verify current product strategy before evaluation.",
  "cluster": "legacy-pam",
  "deployment": "hybrid",
  "access_type": "both",
  "jit_approach": "vault-centric",
  "on_prem_support": true,
  "company_size": ["enterprise"]
}
```

**Filter fields (checkbox panel, 5 sections — matches ASM sticky left-panel pattern):**

1. **Architecture** (`cluster`): `"cloud-native-jit"` | `"legacy-pam"` | `"idp-native"` | `"workload-nhi"` | `"regional"`
2. **Access type** (`access_type`): `"human"` | `"nhi"` | `"both"`
3. **Deployment** (`deployment`): `"saas"` | `"hybrid"` | `"on-premises"` | `"open-source"`
4. **JIT approach** (`jit_approach`): `"ephemeral-tokens"` | `"vault-centric"` | `"platform-native"` | `"certificate-based"`
5. **Environment size** (`company_size`): `"mid-market"` | `"enterprise"`

**Tag display:** cluster, deployment, jit_approach badges on each card — highlighted with `vtag-matched` class when the corresponding filter is active (exact ASM pattern).

---

## 8. nav.js Structure

```
[Why]
  The vault solves the wrong problem (→ /why/)

[Landscape]
  Market overview (→ /landscape/)
  ├ Vendor index (→ /landscape/vendor-index/)

[Vendors]
  All vendors (→ /landscape/vendor-index/)
  ├ Palo Alto (CyberArk) (→ /vendors/cyberark/)
  ├ Britive (→ /vendors/britive/)
  ├ Teleport (→ /vendors/teleport/)
  └ more (→ /landscape/vendor-index/)

[Tools]
  All tools (→ /tools/)
  ├ Vendor comparison (→ /tools/vendor-comparison/)
  ├ Architecture fit (→ /tools/architecture-fit/)
  ├ Approval friction (→ /tools/approval-friction-calculator/)
  ├ Policy sprawl index (→ /tools/policy-sprawl-index/)
  └ JIT velocity calculator (→ /tools/jit-velocity-calculator/)

[Comparisons]
  All comparisons (→ /comparisons/)
  ├ Palo Alto (CyberArk) vs. BeyondTrust
  ├ Britive vs. Apono
  ├ JIT-native vs. PAM-with-JIT
  └ more (→ /comparisons/)

[Guides]
  All guides (→ /guides/)
  ├ JIT and NHI convergence
  ├ PAM replacement vs. overlay
  ├ Zombie session revocation
  └ more (→ /guides/)

[Subscribe →]  (nav-subscribe style)
```

---

## 9. Newsletter Block Markup

Standard on every content page. No IDs — newsletter.js wires by `.newsletter-form` class.

```html
<div class="newsletter-block">
  <span class="page-label">The Independent Defender</span>
  <p>Covers the JIT access market the way your PAM vendors hope you won't. Twice monthly.</p>
  <div class="newsletter-form">
    <input type="email" placeholder="your@email.com" aria-label="Email address">
    <button type="button">Subscribe free</button>
  </div>
</div>
```

---

## 10. SEO / Meta Pattern

Every page:
- `<title>`: `[Page Title] | Just-in-Time Access Software` (home: `Just-in-Time Access Software — Independent Buyer's Guide`)
- `<meta name="description">`: unique per page, no fabricated statistics
- `<link rel="canonical">`: absolute URL (`https://justintimeaccesssoftware.com/...`)
- OG tags: title, description, URL, type (`website` for home; `article` for all others)
- Two `ld+json` blocks: `WebSite` + `Organization` for home; `Article` + `BreadcrumbList` for content pages
- Inline FOUC guard before `styles.css`
- Load order: inline style → `styles.css` → `config.js defer` → (root page only) `nav.js defer`
- Root page (index.html): all local asset paths are RELATIVE (`styles.css`, `config.js`, `nav.js`, `newsletter.js`)
- Content pages: all local asset paths are ABSOLUTE (`/styles.css`, `/config.js`, etc.)
- Content pages: `nav.js` at end of `<body>` (no defer); `newsletter.js` at end of `<body>`
- `<meta name="robots" content="index, follow">` on all pages

---

## 11. What Is Reused Verbatim vs. New

### Verbatim from DSPM/NHI (zero edits)
- `styles.css` — entire design system
- HTML structural boilerplate: topbar, layout/sidebar/main wrappers, footer, breadcrumb, font preconnect
- All CSS class names and component patterns: callout, verdict, pros-cons, wins-grid, compare-table, card-grid, step-list, newsletter-block, newsletter-form
- Page-local `<style>` blocks for compare-table overrides, wins-grid — copied as-is; all reference `var(--accent)` only

### New
- `config.js`, `nav.js`, `newsletter.js`, `vendors.json`
- Export gate JS pattern (tool pages only) — new across all M&W properties
- All `<title>`, `<meta>`, canonical URLs, OG tags, LD+JSON
- All body copy

---

## 12. Build Order

1. `config.js`, `nav.js`, `newsletter.js`, `vendors.json`
2. `styles.css` (verbatim copy from DSPM)
3. Home, Why, Subscribe
4. Landscape, Vendor Index
5. Vendor profiles (8 pages)
6. Comparisons hub + 4 head-to-heads
7. Guides hub + 5 guides
8. Tools hub + 5 tools (vendor-comparison and architecture-fit first; approval-friction, policy-sprawl-index, and jit-velocity-calculator second)
