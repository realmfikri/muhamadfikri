---
title: "AsterSearch"
slug: "astersearch"
tagline: "Full-text search engine using BM25 and inverted indexes, exposed as both library and HTTP service."
date: "2025-11-24"
status: "completed"
role: "Backend/Search Engineer"
stack:
  - "Go"
  - "HTTP API"
  - "BM25"
  - "Inverted Index"
  - "k6"
tags:
  - "Backend"
  - "Go"
  - "Research"
  - "Product"
links:
  - label: "GitHub Repository"
    url: "https://github.com/realmfikri/AsterSearch"
  - label: "Project README"
    url: "https://github.com/realmfikri/AsterSearch#readme"
featured: true
highlights:
  - "Designed ranked retrieval with BM25 over segment-based inverted indexes."
  - "Exposed indexing, search, and admin endpoints for standalone or embedded use."
  - "Added highlighting and load-test scenarios tied to latency/QPS targets."
---

## Overview

AsterSearch is a backend-centric full-text search engine project. It implements an inverted-index architecture with BM25 ranking and can run as a standalone HTTP service or as an embeddable library.

## Problem / Context

Application teams often need search capabilities without adopting a heavy external platform too early. The goal was to build a compact engine with clear indexing/search contracts and practical operational controls.

## What I built (your responsibilities)

- Implemented document indexing and query processing primitives in Go.
- Defined index/schema APIs and search endpoints (`/v1/search`, index/admin routes).
- Structured storage around segment concepts to support incremental indexing and merging.
- Added highlight/snippet handling and observability-oriented endpoints (`/v1/metrics`, `/v1/health`).

## Architecture

![Architecture placeholder for AsterSearch showing ingest API, indexing pipeline, segment storage, and search query path.](/diagrams/astersearch.svg)

The service accepts batched indexing requests, tokenizes and writes postings/doc stores into segments, then serves ranked BM25 results from query endpoints with optional highlighting.

## Tech stack

- Go
- HTTP REST endpoints
- Inverted index + posting lists
- BM25 scoring
- k6 load-test scenarios

## Key challenges & solutions

- **Challenge:** Keeping indexing and query flow understandable.
  **Solution:** Split responsibilities into schema registry, index/search internals, and storage segments.
- **Challenge:** Balancing retrieval quality with speed.
  **Solution:** Combined BM25 ranking with field weighting and posting-list based term lookups.
- **Challenge:** Preventing operational blind spots.
  **Solution:** Included health/metrics endpoints and documented load-test thresholds.
- **Challenge:** Supporting controlled write/admin access.
  **Solution:** Added token-based protection options for admin and indexing endpoints.

## Outcomes / current status

The project is in a stable, documented state with working API contracts and load-test scaffolding. README targets mention throughput goals (including >100 queries/s target on a single node) and latency/QPS validation via `loadtest/`.

## Links

- [GitHub Repository](https://github.com/realmfikri/AsterSearch)
- [README](https://github.com/realmfikri/AsterSearch#readme)
