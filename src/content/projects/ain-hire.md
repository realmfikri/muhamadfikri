---
title: "AIN Hire"
slug: "ain-hire"
tagline: "Bahasa Indonesia voice-screening prototype with bounded interviews, evidence-backed AI scoring, and required recruiter sign-off."
date: "2026-06-29"
status: "active"
role: "Applied AI / Product Engineer"
stack:
  - "Python"
  - "Streamlit"
  - "Gemini / Vertex AI"
  - "Speech-to-Text"
  - "Text-to-Speech"
  - "BigQuery"
  - "Google Cloud Storage"
tags:
  - "AI"
  - "Python"
  - "Backend"
  - "Product"
links:
  - label: "GitHub Repository"
    url: "https://github.com/realmfikri/ain-hire"
  - label: "Project README"
    url: "https://github.com/realmfikri/ain-hire#readme"
featured: true
highlights:
  - "Designed a deterministic interview state machine that keeps AI-led screening bounded, repeatable, and auditable."
  - "Separated the conversational interviewer from the scorer so candidate interaction and final evaluation have distinct responsibilities."
  - "Built evidence review, knockout enforcement, ranked shortlists, and mandatory human sign-off into the recruiter workflow."
---

## Overview

AIN Hire is a mobile-first prototype for screening entry-level direct-sales candidates through a short Bahasa Indonesia voice interview. It captures consent, runs a structured conversation, scores the resulting transcript against a sales competency rubric, and gives recruiters a ranked, evidence-rich shortlist to review.

The project is deliberately more than a chatbot. It is a controlled decision-support workflow with explicit boundaries around what the AI can ask, how results are scored, what evidence is retained, and where a human must make the final call.

## Problem / Context

High-volume entry-level hiring creates a practical screening problem: recruiters need a consistent first pass without turning the process into an opaque automated rejection system. A useful prototype therefore needed to balance four concerns:

- a natural voice experience for candidates,
- repeatable interview coverage across sessions,
- structured evidence for recruiters,
- and clear human accountability for the final outcome.

## What I built

- A candidate-facing Streamlit flow with consent, turn-based audio, speech provider interfaces, and a text fallback for local testing.
- A deterministic interviewer state machine with bounded probing, objection role-play, integrity and coachability checks, and a defined wrap-up.
- A separate scorer interface with a pinned Gemini path for Google Cloud mode and a heuristic path for no-cost local demos.
- A validated `InterviewResult` schema with competency scores, evidence quotes, knockout rules, and a ranking helper.
- Local JSON persistence plus Google Cloud Storage and BigQuery adapters that preserve the same logical data model.
- A recruiter dashboard with ranked candidates, transcripts, evidence, audio review, and explicit human sign-off controls.
- Tests for schema validation and interview-state progression.

## Architecture

![AIN Hire architecture showing candidate voice turns entering a bounded interview state machine, transcript scoring, evidence storage, and a recruiter review dashboard.](/diagrams/ain-hire.svg)

The conversational path and the evaluation path are intentionally separated. The interviewer gathers evidence through a constrained state machine; only after the interview is complete does the scorer produce structured results. Recruiters then review the evidence and retain final authority.

## Responsible automation decisions

### Deterministic control around the model

The interviewer does not get an open-ended mandate. A state machine controls which stage is active, how much probing is allowed, and when the interview must move forward. This makes sessions easier to test and reduces behavioral drift.

### Evidence before ranking

Competency scores are paired with evidence from the transcript. The dashboard exposes those quotes and the full conversation so a recruiter can inspect why a score was produced instead of trusting a number in isolation.

### Human sign-off stays mandatory

The prototype supports ranking and decision assistance, but it does not make an irreversible hiring decision on its own. Recruiter sign-off is required before final rejection.

### Speech style is not a penalty

Accent, dialect, code-switching, and informal speech are explicitly excluded as scoring penalties. The rubric focuses on job-relevant evidence rather than presentation style that could create unfair proxies.

## Key engineering challenges & solutions

- **Challenge:** Keeping AI-led interviews consistent without making them feel like a static form.  
  **Solution:** Combined a deterministic stage machine with bounded model-generated prompts and follow-ups.
- **Challenge:** Avoiding self-evaluation by the same component that conducts the interview.  
  **Solution:** Separated interviewer and scorer interfaces, prompts, and execution timing.
- **Challenge:** Supporting realistic development without provisioning cloud resources immediately.  
  **Solution:** Mirrored the production-oriented interfaces with local storage, heuristic scoring, and provider stubs.
- **Challenge:** Giving recruiters a useful result instead of an opaque score.  
  **Solution:** Preserved transcripts, evidence quotes, competency-level scores, knockouts, and review actions as one audit trail.

## Current status

The v0 prototype supports a full local demonstration and includes adapters and deployment helpers for a Google Cloud path. Cloud infrastructure is intentionally not created by the repository itself; provisioning and deployment remain explicit approval steps.

## Links

- [GitHub Repository](https://github.com/realmfikri/ain-hire)
- [README](https://github.com/realmfikri/ain-hire#readme)
