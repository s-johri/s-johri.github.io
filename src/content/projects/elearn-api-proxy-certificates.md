---
title: 'elearn-api-proxy: Certificate & Transcript Generation at Scale'
summary: 'A dedicated Go service generating transcripts, certificates, and grade sheets for a 180,000-user student portal, with 52,000+ documents generated to date.'
tech: ['Go', 'REST APIs', 'PDF generation']
kind: 'case-study'
order: 2
---

## Context

elearn-api-proxy is a Go service that issues the elearn platform's official documents: transcripts,
provisional and degree certificates, grade sheets, CGPA-conversion certificates, and bonafide
certificates. It pulls program, degree, and division data from an ERP student-status API and renders
each document to PDF. Another engineer built the initial foundation; I own its ongoing feature work,
across roughly 68 commits and many batches of formatting changes.

## Constraints

- These are official, student-facing documents. Layout details (semester counts per page, fonts,
  signatory names, stamps, reference numbers) must match institutional formatting exactly, and any
  mistake is visible to students and alumni, not just internal staff.
- Six document types share one ERP data-fetch pipeline but each carry their own layout and rendering
  rules, so a change to one must not regress the others.
- The service had to stay a small, independently deployable Go binary rather than grow into a second
  monolith beside the elearn Django app.

## Architecture decision

I kept generation as a standalone Go service, decoupled from the Django platform, built around a
shared data-fetch layer over the ERP API and per-document-type rendering (with its own bundled
fonts, CourierPrime and Roboto Bold, for consistent output). That boundary lets a formatting fix for
one certificate ship on its own schedule, independent of the other document types and of the main
elearn release cycle.

## Outcome

The service has generated 52,000+ certificates and transcripts to date. Its layouts have been
refined repeatedly, signatories, stamps, reference numbers, and per-page semester counts among them,
without the proxy ever becoming a bottleneck for the platform it serves.
