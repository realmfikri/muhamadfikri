---
title: "sync-vector-engine"
slug: "sync-vector-engine"
tagline: "CRDT-based real-time synchronization engine spec for collaborative text state with vector-clock-aware playback."
date: "2025-11-20"
status: "paused"
role: "Backend Systems Designer"
stack:
  - "Go / Rust"
  - "WebSocket"
  - "PostgreSQL"
  - "Redis"
  - "CRDT"
  - "Vector Clock"
tags:
  - "Backend"
  - "Go"
  - "Research"
  - "Product"
links:
  - label: "GitHub Repository"
    url: "https://github.com/realmfikri/sync-vector-engine"
  - label: "Project README"
    url: "https://github.com/realmfikri/sync-vector-engine#readme"
featured: true
highlights:
  - "Specified lock-free collaborative editing flow using sequence CRDT mechanics."
  - "Defined vector clock and snapshot/playback capabilities for stale-client reconciliation."
  - "Set non-functional targets around latency, concurrency, and persistence guarantees."
---

## Overview

`sync-vector-engine` is a CRDT-centric real-time synchronization project focused on text collaboration under unstable network conditions. The design treats the backend as the source of truth and uses event history to reconstruct state deterministically.

## Problem / Context

Collaborative editing systems must handle concurrent writes, stale clients, and reconnect behavior without locking users out. The project explores how to keep consistency guarantees while preserving fast user feedback.

## What I built (your responsibilities)

- Defined the synchronization model around raw WebSocket transport and delta broadcasting.
- Specified a custom sequence CRDT approach for deterministic character ordering.
- Added vector-clock-aware history rules for stale event merging.
- Designed snapshot + playback API behavior for time/operation-based state reconstruction.

## Architecture

![Architecture placeholder for sync-vector-engine showing WebSocket gateway, CRDT operation log, snapshot worker, and playback API.](/diagrams/sync-vector-engine.svg)

The design routes client deltas through a WebSocket gateway into an append-only operation log. Snapshot workers compact history, while playback endpoints rebuild state for requested operation or timestamp boundaries.

## Tech stack

- Go or Rust (target language options in spec)
- Raw WebSocket server
- PostgreSQL append-only event log
- Redis for presence/pubsub
- Custom CRDT + vector clock model

## Key challenges & solutions

- **Challenge:** Concurrent edits from multiple clients without central locking.
  **Solution:** Use sequence CRDT ordering and deterministic ID comparison rules.
- **Challenge:** Handling stale offline edits on reconnect.
  **Solution:** Track logical client clocks and merge based on vector history.
- **Challenge:** Avoiding unbounded memory/log growth.
  **Solution:** Introduce snapshot thresholds and replay from latest snapshot.
- **Challenge:** Reliability under load.
  **Solution:** Define strict non-functional targets for broadcast latency, concurrency, and WAL durability.

## Outcomes / current status

Current repository state is specification-heavy and documents intended architecture and constraints in detail. It serves as a systems design blueprint for further implementation.

## Links

- [GitHub Repository](https://github.com/realmfikri/sync-vector-engine)
- [README](https://github.com/realmfikri/sync-vector-engine#readme)
