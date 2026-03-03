---
title: "e-mrtd"
slug: "e-mrtd"
tagline: "Java-based ePassport emulator implementing ICAO 9303 core protocols for issuance and verification flows."
date: "2026-02-27"
status: "active"
role: "Backend/System Developer"
stack:
  - "Java"
  - "Java Card"
  - "Maven"
  - "JavaFX"
  - "BouncyCastle"
tags:
  - "Backend"
  - "Java"
  - "Security"
  - "Research"
links:
  - label: "GitHub Repository"
    url: "https://github.com/realmfikri/e-mrtd"
  - label: "Project README"
    url: "https://github.com/realmfikri/e-mrtd#readme"
featured: true
highlights:
  - "Implemented dynamic personalization for EF.COM, DG1, DG2, DG3, DG4, DG15, and SOD."
  - "Built host-side BAC and secure messaging tooling for issuance and verification workflows."
  - "Integrated JavaFX runner paths for simulation and real-reader testing scenarios."
---

## Overview

`e-mrtd` is a Java-based electronic Machine Readable Travel Document (ePassport) simulator. It focuses on ICAO 9303 core protocol behavior and supports both educational use and integration testing.

## Problem / Context

Smartcard and passport protocol workflows are hard to test repeatedly without controlled environments. I needed a reproducible setup to run personalization, authentication, and verification flows without relying only on physical cards.

## What I built (your responsibilities)

- Implemented and maintained host-side flows that orchestrate issuance and verification.
- Worked on personalization handling for key LDS files including EF.COM, DG1, DG2, DG3, DG4, DG15, and EF.SOD.
- Added/used BAC and secure messaging tooling paths for end-to-end read/verify scenarios.
- Wired JavaFX launcher paths and command-line run scenarios for different test modes.

## Architecture

![Architecture placeholder for e-mrtd showing Java Card applet, host tooling, and verification pipeline.](/diagrams/e-mrtd.svg)

The project is structured around a Java Card applet simulation layer and host tools (`emu`) that drive personalization and verification scenarios. `ReadDG1Main` acts as the orchestrator for common issuance+verification runs.

## Tech stack

- Java 17
- Maven
- Java Card applet model
- JavaFX (UI runner)
- BouncyCastle

## Key challenges & solutions

- **Challenge:** Keeping protocol experiments reproducible.
  **Solution:** Added deterministic command-line scenario entry points and repeatable run commands.
- **Challenge:** Handling multiple data-group personalization paths.
  **Solution:** Structured personalization flow per LDS group and standardized generated artifacts.
- **Challenge:** Balancing simulator flexibility with security behavior realism.
  **Solution:** Kept BAC/secure messaging and passive-auth verification flows in the host toolchain.
- **Challenge:** Supporting both CLI and UI-driven workflows.
  **Solution:** Maintained JavaFX launch path while preserving CLI-first testing.

## Outcomes / current status

The project remains active and currently includes broad LDS personalization coverage, BAC/secure messaging support, and scenario-oriented execution for development and testing.

## Links

- [GitHub Repository](https://github.com/realmfikri/e-mrtd)
- [README](https://github.com/realmfikri/e-mrtd#readme)
