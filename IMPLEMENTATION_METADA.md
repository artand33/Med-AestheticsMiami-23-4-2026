# Metadata Implementation Plan

## Goal
Replace the current generic/Lovable-style URL preview with a branded website snapshot and implement complete, production-grade metadata for SEO and social sharing.

## Current State (Observed)
- Metadata is currently hardcoded in `index.html`.
- Open Graph image points to an external Unsplash URL (not a branded site snapshot).
- Twitter metadata is minimal (`twitter:card` only).
- No canonical URL is defined.
- No explicit robots tag, theme color, or social profile linkage metadata.
- No structured data (JSON-LD) is present.

## Success Criteria
- Shared links on WhatsApp, iMessage, Facebook, LinkedIn, X, and Slack render a branded preview image from your website.
- Metadata includes full Open Graph + Twitter card fields.
- Canonical and technical SEO metadata are present and consistent.
- Structured data validates in Google Rich Results / Schema validators.
- Metadata remains maintainable as pages or services evolve.

## Implementation Scope

### 1) Brand Preview Image (Replace Current Preview)
- Capture a high-quality website snapshot from the live homepage hero section.
- Produce social-ready assets:
  - `og-image.jpg` at 1200x630 (Open Graph standard).
  - Optional `twitter-image.jpg` at 1600x900 if a platform-specific crop is preferred.
- Optimize image size (target under ~300 KB without visible quality loss).
- Host images on the primary domain under a stable path (for example `/social/og-image.jpg`).
- Ensure image URL is publicly accessible without auth and returns `200 OK`.

### 2) Core SEO Metadata
- Define production constants:
  - Site name, default title, title template, default description.
  - Canonical base URL (final production domain).
- Add/verify:
  - `title`
  - `meta name="description"`
  - `link rel="canonical"`
  - `meta name="robots"` (index, follow for production)
  - `meta name="author"`
  - `meta name="theme-color"`
  - Optional geo/business hints if relevant to local SEO strategy.

### 3) Open Graph Metadata (Social Platforms)
- Implement full OG set:
  - `og:title`
  - `og:description`
  - `og:type=website`
  - `og:url`
  - `og:site_name`
  - `og:locale` (likely `en_US`)
  - `og:image`
  - `og:image:secure_url`
  - `og:image:width`
  - `og:image:height`
  - `og:image:alt`
- Ensure values are aligned with on-page positioning and brand language.

### 4) Twitter/X Metadata
- Implement full Twitter card metadata:
  - `twitter:card=summary_large_image`
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`
  - `twitter:image:alt`
  - `twitter:site` (if official handle exists)
  - `twitter:creator` (optional)

### 5) Structured Data (JSON-LD)
- Add baseline schema for local clinic discovery and trust signals:
  - `MedicalBusiness` (or `LocalBusiness` if preferred initially)
  - Name, URL, logo/image, phone, address, area served
  - Opening hours
  - SameAs social profile links (Instagram, Facebook, LinkedIn, YouTube, etc. as available)
- Optional phase-two schemas:
  - `WebSite` with search action
  - `FAQPage` if validated FAQ content is present
  - `Service` entries for top treatments

### 6) Per-Route Metadata Strategy (SPA-Safe)
- Decide metadata approach for routes (`/`, `/privacy`, `/terms`):
  - Baseline now: robust default metadata from `index.html`.
  - Upgrade path: dynamic route-level metadata using a head manager (`react-helmet-async`) or prerendering.
- Ensure legal pages have unique titles/descriptions if route-level metadata is introduced.

### 7) Social & Technical Validation
- Validate with:
  - Facebook Sharing Debugger
  - LinkedIn Post Inspector
  - X Card Validator
  - Slack/Discord preview checks
  - Google Rich Results Test
  - Schema Markup Validator
- Force recrawl after deployment for stale previews.
- Confirm no mixed-content or blocked image URLs.

### 8) Performance and Reliability Guardrails
- Keep social preview images static and cacheable.
- Avoid query-string-dependent preview image URLs unless cache-busting is intentional.
- Ensure metadata values do not depend on client-side JS execution for crawler-critical tags.

### 9) Governance and Content Ownership
- Define who owns metadata updates (marketing vs engineering).
- Maintain a metadata checklist for future launches/campaign pages.
- Document social image template specs (safe text zone, contrast, logo position).

## Proposed Execution Phases

### Phase A - Strategy and Assets
- Confirm final domain and social handles.
- Capture/select final branded website snapshot.
- Export, optimize, and host final OG/Twitter image assets.

### Phase B - Metadata Implementation
- Update base metadata set and complete OG + Twitter fields.
- Add canonical and technical tags.
- Add JSON-LD for business + social profile linkage.

### Phase C - QA and Launch
- Validate in all social preview tools.
- Fix crawler/cache issues and force re-scrape.
- Deploy and verify live tags from the production URL source.

### Phase D - Post-Launch Hardening
- Add per-route metadata handling for non-home pages.
- Add monitoring/checklist so metadata remains correct after updates.

## Required Inputs Before Implementation
- Production canonical domain.
- Official social profile URLs/handles.
- Preferred title and description copy (or approval to use current copy).
- Final website snapshot image (or permission to generate one from production).
- Business schema fields (phone, address, opening hours, service area).

## Acceptance Checklist
- [ ] No external stock image remains in social metadata.
- [ ] OG tags are complete and return expected values in page source.
- [ ] Twitter tags are complete and validated.
- [ ] Canonical URL matches production domain.
- [ ] JSON-LD passes schema validation.
- [ ] Link previews display correctly on key social/messaging platforms.
- [ ] Documentation exists for future metadata maintenance.

## Notes / Risk Awareness
- Social platforms cache previews aggressively; fixes may not appear immediately.
- SPA-only setups can limit per-route metadata quality without prerender/SSR.
- Inconsistent domain usage (`www` vs non-`www`) can fragment preview/indexing signals.
