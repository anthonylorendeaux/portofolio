---
title: Email Cleaner API
publishedAt: 2026-01-11T00:00:00.000Z
image: /email-cleaner.jpeg
seo:
  title: Email Cleaner API
  description: High-performance Email validation & scoring API (syntax, MX, disposable/free providers) with bulk endpoint and scheduled domain uppublishedAts.
sitemap:
  loc: /projects/email-cleaner-api
slug: email-cleaner
type: Application
---

::article-header
---
:url: https://rapidapi.com/anthonylorendeaux19/api/disposable-email-checker-validator
---
Email cleaner API.

#type
Application

#description
Email Cleaner API is a high-performance backend built with Nitro (Nuxt server engine) to valipublishedAt and score email addresses for lead quality and deliverability use cases.
The API combines syntax validation, MX resolution with caching, disposable domain detection, and free-provider detection to return an actionable score and grade (HIGH / MEDIUM / LOW / INVALID).
It also includes a bulk endpoint (up to 50 emails per request) processed in parallel to minimize latency, making it suitable for batch validation workflows and integrations.

## Key features

- Syntax validation (fast reject for malformed emails).
- MX verification with timeout + cache to prevent slow DNS lookups from degrading response time.
- Disposable domain detection powered by an automatically refreshed domain list (scheduled task).
- Free provider detection (Gmail/Outlook/Yahoo, etc.) for scoring and segmentation.
- Bulk scoring endpoint (max 50) with parallel processing.

## Endpoints

- `GET /valipublishedAt?email=...` — single email analysis.
- `POST /api/bulk-scoring` — batch analysis (JSON array of emails, max 50).

  :::infos
  #price
  €€

  #duration
  2–5 Days

  #technos
  Nitro, TypeScript, H3
  :::

  :::showcase{:img="/email-cleaner.jpeg"}
  :::
::
