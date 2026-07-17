---
title: "RHEL Server Operations Lab"
slug: "rhel-server-operations-lab"
tagline: "Single-VM enterprise Linux lab covering repeatable deployment, service operations, hardening, maintenance, and reporting."
date: "2026-02-21"
status: "completed"
role: "Platform / Operations Engineer"
stack:
  - "Rocky Linux / AlmaLinux"
  - "Ansible"
  - "Podman"
  - "systemd"
  - "firewalld"
  - "SELinux"
  - "Nginx"
  - "PostgreSQL"
tags:
  - "DevOps"
  - "Operations"
  - "Backend"
  - "Security"
links:
  - label: "GitHub Repository"
    url: "https://github.com/realmfikri/rhel-server-operations-lab"
  - label: "Project README"
    url: "https://github.com/realmfikri/rhel-server-operations-lab#readme"
featured: true
highlights:
  - "Automated a RHEL-like service stack with modular Ansible roles and Podman containers managed through systemd."
  - "Applied firewalld policy, SELinux-aware operations, restricted database exposure, and repeatable validation checks."
  - "Documented HLD/LLD, runbooks, maintenance and incident procedures, and monthly operational reporting."
---

## Overview

The RHEL Server Operations Lab is a compact, single-VM environment built to practice the full operational lifecycle of an enterprise Linux service: implementation, deployment, validation, maintenance, incident handling, and reporting.

It runs a small Flask API, PostgreSQL, and Nginx stack on Rocky Linux or AlmaLinux 9. The services are containerized with Podman, managed by systemd, and deployed from a separate control node through Ansible.

## Problem / Context

Infrastructure work is often demonstrated only as a collection of configuration files. This project was designed to show a more complete operating model: clear host boundaries, repeatable configuration, security controls, health validation, recovery steps, and documentation that another operator could follow.

The single-VM constraint keeps the lab lightweight while preserving the operational patterns that matter in larger RHEL-like environments.

## What I built

- Modular Ansible roles and a top-level playbook for repeatable configuration from a separate control node.
- Podman-based PostgreSQL, Flask API, and Nginx services integrated with systemd.
- Package, firewall, and service management through RHEL-native tooling such as `dnf`, `firewalld`, and `systemctl`.
- SELinux-aware operating and troubleshooting guidance rather than disabling enforcement to make the stack work.
- Health-check, smoke-test, maintenance-check, and monthly-report scripts.
- HLD, LLD, runbook, maintenance SOP, incident SOP, role mapping, and sample operational reports.
- Explicit safety boundaries that keep changes inside the target VM and avoid altering the operator’s workstation.

## Architecture

![RHEL operations lab architecture showing an Ansible control node configuring a Rocky or AlmaLinux VM that runs Nginx, a Flask API, and PostgreSQL in Podman containers managed by systemd.](/diagrams/rhel-server-operations-lab.svg)

An Ubuntu control node stores the repository and runs Ansible over SSH. All runtime changes stay inside the Rocky/AlmaLinux target VM, where systemd manages the Podman services and firewalld limits public access. Nginx is the public entry point; PostgreSQL remains internal to the service stack.

## Operational design choices

### Native service management

Podman containers are wrapped in systemd units so they participate in normal boot, restart, status, and logging workflows. This keeps container lifecycle management aligned with how an enterprise Linux operator already works.

### Repeatability over manual setup

Ansible roles hold the desired configuration for packages, users, directories, services, and policies. Versioned variables and repeatable playbooks reduce configuration drift and make rebuilding the lab practical.

### Security controls stay visible

The lab keeps SELinux in the conversation, defines firewall exposure explicitly, and avoids publishing PostgreSQL directly. Security is treated as part of operations, not a final checklist.

### Documentation is a deliverable

The repository includes design documents, runbooks, maintenance and incident procedures, and reporting. The goal is to demonstrate not only that the services start, but also that they can be operated and explained.

## Validation

The acceptance path covers SSH access, repeatable playbook execution, service health, API and database checks, firewall policy, reporting output, and the presence of current operational documentation.

Dedicated health and smoke tests make validation repeatable after deployment or maintenance. A documented teardown path also makes the lab safely disposable.

## Outcome

The project provides a lightweight but complete platform-operations portfolio piece. It demonstrates the connective work between automation, Linux services, container runtime behavior, security policy, testing, and operational communication.

## Links

- [GitHub Repository](https://github.com/realmfikri/rhel-server-operations-lab)
- [README](https://github.com/realmfikri/rhel-server-operations-lab#readme)
