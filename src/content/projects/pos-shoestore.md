---
title: "pos-shoestore"
slug: "pos-shoestore"
tagline: "POS and inventory platform for a shoe store with photo-first stock capture, variants, and operations-ready deployment."
date: "2025-11-19"
status: "active"
role: "Product/Backend Developer"
stack:
  - "TypeScript"
  - "Fastify"
  - "React"
  - "PostgreSQL"
  - "Prisma"
  - "PWA"
tags:
  - "Backend"
  - "TypeScript"
  - "DevOps"
  - "Product"
links:
  - label: "GitHub Repository"
    url: "https://github.com/realmfikri/pos-shoestore"
  - label: "Deployment Notes"
    url: "https://github.com/realmfikri/pos-shoestore/blob/main/docs/deployment.md"
featured: true
highlights:
  - "Scoped and implemented a store-specific POS/inventory architecture instead of forcing generic workflows."
  - "Used product+variant+stock-ledger modeling to keep inventory movement explicit and auditable."
  - "Prepared VPS deployment setup with backend/frontend services, Nginx configs, and operational docs."
---

## Overview

`pos-shoestore` is a point-of-sale and inventory system built for a real shoe retail context. It is designed around practical store operations, especially fast inventory intake, searchable variants, and dependable checkout flows.

## Problem / Context

Small retail teams often have incomplete inventory records and low tolerance for complex software. The system needed to support quick capture from mobile devices, track stock movement clearly, and remain deployable on low-cost VPS infrastructure.

## What I built (your responsibilities)

- Defined and implemented MVP architecture for POS, inventory, purchasing, and reporting paths.
- Built backend routes/services with Fastify + Prisma and PostgreSQL-based data modeling.
- Supported frontend UX for operator-first workflows (inventory capture, checkout, and dashboards).
- Documented deployment and operations on VPS with Nginx, system services, and backup considerations.

## Architecture

![Architecture placeholder for pos-shoestore showing mobile/web client, Fastify API, PostgreSQL/MinIO, and VPS deployment layers.](/diagrams/pos-shoestore.svg)

Clients (cashier + mobile inventory workflow) call Fastify APIs for inventory and sales operations. Data is modeled in PostgreSQL with Prisma; media and deployment infrastructure are documented for VPS operation.

## Tech stack

- React (Vite) + TypeScript
- Fastify + Prisma
- PostgreSQL
- Tailwind and PWA capabilities
- VPS deployment with Nginx and service scripts

## Key challenges & solutions

- **Challenge:** Inventory data starts incomplete and inconsistent.
  **Solution:** Emphasized photo-first capture and incremental enrichment workflow.
- **Challenge:** Shoe inventory needs variants (size/color) and accurate stock state.
  **Solution:** Modeled product/variant with stock-ledger entries for each movement.
- **Challenge:** Checkout needs resilience in constrained environments.
  **Solution:** Planned/implemented offline-tolerant PWA behavior and pragmatic cashier flows.
- **Challenge:** Transition from prototype to daily operation.
  **Solution:** Added deployment docs, system service configs, and operational procedures.

## Outcomes / current status

The project is active and includes both implementation and operational documentation, with clear progression from MVP scope toward broader retail workflow coverage.

## Links

- [GitHub Repository](https://github.com/realmfikri/pos-shoestore)
- [Deployment Notes](https://github.com/realmfikri/pos-shoestore/blob/main/docs/deployment.md)
