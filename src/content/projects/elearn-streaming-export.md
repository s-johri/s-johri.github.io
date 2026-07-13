---
title: 'elearn: Streaming CSV Export for a 180,000-User Student Portal'
summary: 'Scaled a Django student-portal export path from an in-memory bottleneck to an async, streaming pipeline handling 2.5M rows, and shipped audited superuser impersonation for support workflows.'
tech: ['Python', 'Django', 'PostgreSQL', 'JavaScript']
kind: 'case-study'
order: 1
---

## Context

elearn is Code Argo's Django student portal for the BITS Pilani ecosystem, and the largest, longest-running
codebase I work on: roughly 180,000 total users, about 75,000 of them active students, under
continuous development for over a year. Another engineer laid the foundation and remains a major
contributor; I owned frontend development end to end early on, and now lead new features,
improvements, and fixes.

Exporting MGPA and student-evaluation datasets to CSV is a routine reporting need. As enrollment
and the course catalog grew, that export path stopped keeping up.

## Constraints

- The export has to cover an entire cohort or semester of evaluation data in one pass; its size
  scales with enrollment, not with a fixed page limit.
- Any change had to fit the existing Django request/response cycle and the staging-branch release
  workflow without destabilizing features shipping in parallel.
- It had to stay genuinely usable for staff running real reports, not merely avoid crashing. An
  export that timed out under a browser request was no better than one that failed.

## Architecture decision

The original path built the entire response in memory before sending a byte. I replaced it with an
async, streaming implementation that pulls and writes rows incrementally, so response time and
memory footprint no longer scale with dataset size. That raised the safe export ceiling to 2.5
million rows with no change to how staff use the feature.

Alongside it, I shipped superuser impersonation ("Log in as") for support staff, with full audit
logging on every session, so support can act in a student's context without losing traceability.

## Outcome

The streaming export now serves datasets up to 2.5 million rows that the in-memory version couldn't
reliably handle, and it landed without disrupting the parallel feature stream. Impersonation gives
support a fully audited way to debug on a student's behalf. Both came out of the feature ownership I
took on after moving off frontend-only work.
