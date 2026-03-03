---
title: "monitoring-toilet"
slug: "monitoring-toilet"
tagline: "IoT public restroom monitoring system connecting sensor firmware, backend services, dashboard UI, and operations tooling."
date: "2025-12-24"
status: "active"
role: "Full-Stack / Systems Developer"
stack:
  - "TypeScript"
  - "Express"
  - "Prisma"
  - "React"
  - "Nginx"
  - "PostgreSQL"
tags:
  - "IoT"
  - "TypeScript"
  - "Backend"
  - "DevOps"
  - "Product"
links:
  - label: "GitHub Repository"
    url: "https://github.com/realmfikri/monitoring-toilet"
  - label: "Runbook"
    url: "https://github.com/realmfikri/monitoring-toilet/blob/main/docs/runbook.md"
featured: true
highlights:
  - "Built a multi-part repo structure spanning firmware, backend API, frontend dashboard, and infra automation."
  - "Integrated operations assets: runbooks, health checks, deployment workflows, and backup scripts."
  - "Included alerting-oriented backend pieces (Telegram integration, API key controls, and rate limiting)."
---

## Overview

`monitoring-toilet` is an IoT monitoring system for restroom operations. The repository combines hardware-facing firmware, backend telemetry services, a web dashboard, and deployment/operations assets in one codebase.

## Problem / Context

Facility teams need quick visibility into consumables and room conditions, but hardware telemetry alone is not enough. A usable system also needs ingest APIs, dashboards, incident processes, and infrastructure that can be operated consistently.

## What I built (your responsibilities)

- Worked on a full stack that includes firmware modules, backend services, frontend dashboard, and Nginx/ops setup.
- Structured backend services with TypeScript, Prisma, auth/API-key controls, and health endpoints.
- Supported dashboard delivery with React/Vite and environment-specific deployment paths.
- Added operational support through runbooks, deployment notes, backup scripts, and monitoring SLO docs.

## Architecture

![Architecture placeholder for monitoring-toilet showing sensor firmware -> ingestion API -> database -> dashboard and alerting pipeline.](/diagrams/monitoring-toilet.svg)

Firmware modules (water/soap/tissue/ammonia related sensor components in the repo) push telemetry to backend endpoints. Backend persists snapshots/history, then powers dashboard views and alerting workflows.

## Tech stack

- TypeScript (backend/frontend)
- Express + Prisma + PostgreSQL
- React + Vite dashboard
- Nginx reverse proxy and deployment scripts
- Ops tooling (health checks, backup, CI/CD workflows)

## Key challenges & solutions

- **Challenge:** Aligning firmware, backend, frontend, and ops in one repository.
  **Solution:** Kept clear top-level domains (`backend`, `frontend`, `firmware`, `infra`, `scripts`, `docs`) with explicit runbooks.
- **Challenge:** Avoiding brittle manual deployment steps.
  **Solution:** Documented repeatable deployment flows and included environment-specific CI workflows.
- **Challenge:** Making alerts actionable instead of noisy.
  **Solution:** Combined API key controls, rate limiting, and Telegram integration support with operational response docs.
- **Challenge:** Keeping reliability visible.
  **Solution:** Added health endpoints plus SLO/observability documentation.

## Outcomes / current status

The project is active and positioned as a practical IoT operations stack with both engineering and day-2 operations concerns addressed in-repo.

## Links

- [GitHub Repository](https://github.com/realmfikri/monitoring-toilet)
- [Runbook](https://github.com/realmfikri/monitoring-toilet/blob/main/docs/runbook.md)
