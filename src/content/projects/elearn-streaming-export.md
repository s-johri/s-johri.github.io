---
title: 'elearn — Streaming CSV Export for a 75,000-Student LMS'
summary: 'Scaled a Django LMS export path from an in-memory bottleneck to an async, streaming pipeline handling 2.5M rows, and shipped audited superuser impersonation for support workflows.'
tech: ['Python', 'Django', 'PostgreSQL', 'JavaScript']
kind: 'case-study'
order: 1
---

## Context

elearn is Code Argo's Django LMS/WILP platform, built for BITS Pilani WILP and still under active
development after 17+ months. It's the largest and longest-running codebase I work on, and it
serves roughly 75,000 active students. Another engineer laid the project's
foundation and still contributes significantly; I owned frontend development end-to-end early in
the engagement, and I'm now the lead engineer for new features, improvements, and fixes as they
come up.

One recurring operational need was exporting MGPA and student-evaluation datasets to CSV for
downstream reporting. As the student body and course catalog grew, that export path became a
scaling problem.

## Constraints

- The export had to work across an entire cohort/semester's worth of evaluation data at once —
  dataset size grows with enrollment, not with a fixed page size.
- Any fix had to slot into the existing Django request/response cycle and the project's
  staging-branch release workflow without destabilizing other features shipping in parallel.
- The export needed to stay usable for staff doing real reporting work, not just avoid crashing —
  slow-but-safe wasn't good enough if it timed out under a browser request.

## Architecture decision

I replaced the export's "build the full response in memory, then send it" approach with an
async, streaming implementation: rows are pulled and written out incrementally instead of being
materialized as one in-memory dataset before the response starts. That decoupled response time and
memory footprint from dataset size, and let me raise the safe export ceiling to 2.5 million rows
without changing how staff use the feature.

In the same engagement, I also shipped superuser impersonation ("Log in as") for support staff,
with full audit logging on every impersonated session — a separate but related piece of
infrastructure work that gives support a safe way to debug on a student's behalf without losing
traceability.

## Outcome

The streaming export now handles datasets up to 2.5M rows that the previous in-memory approach
couldn't reliably serve, and it shipped without disrupting the parallel feature stream. The
impersonation feature is in daily use by support staff, with every session captured in the audit
log. Both are part of the ongoing feature ownership I've taken on for elearn since moving off
frontend-only work.
