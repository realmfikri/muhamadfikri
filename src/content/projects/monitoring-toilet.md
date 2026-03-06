---
title: "Public Toilet Condition Monitoring System"
slug: "monitoring-toilet"
tagline: "IoT-based restroom monitoring system with a secure server subsystem for telemetry ingest, real-time dashboarding, audit history, and Telegram-based operational response."
date: "2025-12-24"
status: "active"
role: "Backend / Server Subsystem Engineer"
stack:
  - "Node.js"
  - "TypeScript"
  - "Express"
  - "PostgreSQL"
  - "Prisma"
  - "WebSocket"
  - "Telegram Bot"
  - "Nginx"
  - "PM2"
  - "ESP32"
tags:
  - "IoT"
  - "Backend"
  - "Realtime"
  - "Systems"
  - "Operations"
links:
  - label: "GitHub Repository"
    url: "https://github.com/realmfikri/monitoring-toilet"
  - label: "Runbook"
    url: "https://github.com/realmfikri/monitoring-toilet/blob/main/docs/runbook.md"
featured: true
highlights:
  - "Built the server subsystem that receives ESP32 telemetry over HTTPS, validates payloads, and normalizes raw sensor data into operator-friendly status."
  - "Separated storage into snapshot + history tables so the dashboard stays fast while preserving audit trails, CSV export, and scheduled reports."
  - "Implemented real-time dashboard updates via WebSocket plus Telegram alert, reminder, and acknowledgement workflows for day-to-day facility operations."
---

## Overview

`monitoring-toilet` is an IoT-based public restroom monitoring system designed to make maintenance less reactive and more operationally visible.

In the broader team project, ESP32-based nodes monitor restroom conditions such as ammonia or odor, wet floor presence, tissue availability, and soap availability. My individual contribution focused on the **server subsystem**: the layer responsible for securely receiving telemetry, validating and normalizing it, storing it for both real-time use and audit, and distributing actionable information to the dashboard and Telegram.

This project matters because a monitoring system is only useful when raw sensor readings become something operators can actually trust and act on.

## Problem / Context

Public restrooms in high-traffic environments can degrade quickly throughout the day. Consumables run out, floors become wet, and odor levels can change faster than manual patrol-based maintenance can catch. In practice, manual inspection is often:

- reactive rather than preventive,
- inefficient because staff must physically check rooms that may still be fine,
- and difficult to audit because there is no clean record of what happened and when.

A working IoT solution therefore needs more than sensors. It needs a reliable backend that can safely accept telemetry, reject bad data, preserve history, present the latest state quickly, and support the human workflow after a problem is detected.

## What I built (my responsibilities)

My core responsibility was the **server subsystem**, not the physical sensor hardware itself.

I designed and implemented:

- **Telemetry ingest over HTTPS** using a `POST /data` endpoint behind a reverse proxy.
- **Authentication and validation** so only authorized, well-formed payloads can write into the system.
- **Normalization of raw sensor readings** into consistent semantic states used by the UI and notifications.
- **Debounce and anti-noise logic** so unstable readings do not immediately create misleading state transitions.
- **Snapshot + history persistence** in PostgreSQL with Prisma for fast latest-state reads and long-term auditability.
- **WebSocket-based real-time delivery** so the dashboard updates immediately after successful ingest.
- **Telegram operational workflow** for alerting, reminders, scheduled reports, and acknowledgement logging.
- **Deployment hardening** using Nginx, minimal port exposure, firewall rules, and PM2 for process recovery.

The public repository also includes frontend, firmware, infrastructure, and ops assets, but the engineering story I want to emphasize on this page is the server and backend layer I personally owned.

## Architecture

![Architecture diagram showing ESP32 restroom telemetry flowing through Nginx into the Node.js server, then through validation and normalization into snapshot/history storage, WebSocket dashboard updates, and Telegram operations workflows.](/diagrams/monitoring-toilet.svg)

At a high level, the system turns raw restroom telemetry into an operator workflow. The backend does more than store data: it acts as the control point that ensures telemetry is valid, interpretable, fast to access, and operationally useful.

## Why the architecture is structured this way

### 1. Snapshot + history instead of one giant table

The system needs two different behaviors at once:

- the dashboard must show the **latest state quickly**,
- while the system must also keep **historical records** for audit, exports, and reports.

That is why I split persistence into:

- a **snapshot table** with one latest row per device,
- and a **history table** as append-only time-series storage.

This keeps the dashboard responsive even as historical data grows.

### 2. WebSocket instead of relying on refresh or polling

Polling is wasteful and adds latency. After successful ingest, the backend pushes updates directly to the dashboard through WebSocket so operators see changes immediately without manual refresh.

### 3. Telegram focused on actionable signals

Not every sensor value deserves an instant alert. I intentionally focused the operational workflow on **consumables**, especially tissue and soap, because these are the most directly actionable for staff.

Ammonia and wet-floor signals are still valuable, but they are better suited for dashboard visibility and historical analysis unless their thresholding and smoothing are mature enough to avoid false alarms.

### 4. Debounce to reduce false alerts

Some sensor readings can fluctuate. Without debounce, transient readings can create alert spam and make operators lose trust in the system. The debounce layer requires a status transition to remain stable before it is treated as a real state change.

## Dashboard & operator workflow

The web interface is designed as the control center for day-to-day monitoring. It supports:

- **real-time status visibility** per monitored restroom or device,
- **historical data review** for auditing,
- **CSV export** for reporting,
- **logging interval configuration**,
- **notification schedule settings**,
- and **sensor visibility toggles** for operational flexibility.

On the messaging side, Telegram acts as the human-in-the-loop channel:

1. the system detects a meaningful issue,
2. an alert is sent,
3. if unresolved, reminders are sent on schedule,
4. staff can acknowledge the issue,
5. and acknowledgement events are logged for supervision and response tracking.

That means the system is not only monitoring conditions, but also helping structure the response workflow after detection.

## Key engineering challenges & solutions

### Challenge: Turning raw telemetry into something operators can trust

**Solution:** Added strict payload validation, semantic normalization, and a consistent state model shared by the dashboard and Telegram.

### Challenge: Keeping real-time visibility fast while preserving auditability

**Solution:** Separated latest-state access from historical storage using snapshot + history tables.

### Challenge: Preventing alert fatigue

**Solution:** Limited alerts to the most actionable consumable states and added debounce for unstable readings.

### Challenge: Reducing attack surface in a small deployment

**Solution:** Terminated TLS at Nginx, kept app and database ports private, enforced minimal exposure through firewall rules, and used PM2 for recovery.

### Challenge: Making the system usable as an operational tool, not just a demo

**Solution:** Added acknowledgement logging, reminders, scheduled reports, and settings for logging and notification behavior.

## Validation / Testing

I validated the subsystem through end-to-end scenarios covering both functionality and operations:

- **Ingest security validation:** valid payloads with the correct API key are accepted, malformed payloads are rejected, wrong credentials are blocked, and invalid requests do not write corrupted data.
- **Snapshot vs. history consistency:** snapshot rows update on successful ingest, history grows according to the configured logging interval, and dashboard history plus CSV export use the historical store.
- **Real-time dashboard behavior:** the UI updates immediately after ingest through WebSocket and stays consistent with the telemetry source.
- **Telegram workflow:** alerts fire on meaningful status transitions, reminders repeat while issues remain unresolved, scheduled reports reflect recent history, and acknowledgement events are recorded.
- **Deployment reliability:** public access is limited to HTTPS through Nginx, internal service ports are not exposed publicly, and PM2 restores services after crash or reboot.

## Outcomes / current status

The project reached a working end-to-end state where telemetry can move from field devices into a hardened backend pipeline, appear on the dashboard in real time, and trigger operator-facing Telegram workflows.

What I like most about this project is that it goes beyond sensor dashboard territory. It addresses the full path from:

**telemetry -> validation -> state -> history -> operator action**

That makes it a much stronger systems and backend project than a typical IoT demo that stops at raw data collection.

The repository is still useful today as a practical IoT operations stack because it combines backend engineering, real-time delivery, database design, deployment concerns, and operational response design in one project.

## What I would improve next

There are several clear next steps I would take to mature the system further:

- **Stronger device identity:** move beyond shared API keys toward per-device secrets or mutual TLS.
- **Richer incident lifecycle:** evolve from simple acknowledgement into a fuller state model such as `OPEN -> ACKNOWLEDGED -> RESOLVED -> VERIFIED`.
- **Better resilience during network issues:** add buffering and retry strategies at the edge when connectivity drops.
- **Scalability improvements for longer-term history:** add retention policies, archival strategy, and stronger observability around growth and latency.
- **More measurable observability:** add explicit metrics for ingest reliability, dashboard latency, and alert response time.

## Why I consider this project meaningful

This project sits at the intersection of IoT, backend systems, and operational software.

It taught me that building useful infrastructure is not only about receiving data, but about designing a system that people can trust in real situations: one that is secure enough to run, fast enough to use, and structured enough to support action after detection.

## Links

- [GitHub Repository](https://github.com/realmfikri/monitoring-toilet)
- [Runbook](https://github.com/realmfikri/monitoring-toilet/blob/main/docs/runbook.md)
