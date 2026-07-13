---
title: 'elearn-api-proxy — Certificate & Transcript Generation at Scale'
summary: 'A dedicated Go service generating transcripts, certificates, and grade sheets for a 75,000-student LMS — 52,000+ documents generated to date.'
tech: ['Go', 'REST APIs', 'PDF generation']
kind: 'case-study'
order: 2
---

## Context

elearn-api-proxy is a Go service that generates transcripts, provisional and degree certificates,
grade sheets, CGPA-conversion certificates, and bonafide certificates for the BITS Pilani
ecosystem's elearn platform, pulling program, degree, and division data from an ERP student-status API.
Another engineer laid the initial foundations of the service; I own its ongoing feature
work, iterating across roughly 68 commits spanning multiple ticket batches.

## Constraints

- Certificates and transcripts are official, student-facing documents — layout details
  (semester counts per page, fonts, signatory names, stamps, reference numbers) have to exactly
  match institutional formatting requirements, and mistakes are visible directly to students and
  alumni, not just internal staff.
- Six distinct document types share the same underlying ERP data-fetch pipeline but each need
  their own layout and rendering rules, so changes for one document type can't be allowed to
  regress another.
- The service needed to stay a small, independently deployable Go binary rather than growing into
  a second monolith alongside the main elearn Django app.

## Architecture decision

I kept certificate generation as a standalone Go service, separate from the Django elearn
platform, with a shared data-fetch layer against the ERP student-status API and per-document-type
rendering logic (the service bundles its own font assets — CourierPrime, Roboto Bold — for
consistent PDF output). That separation let formatting fixes for one certificate type ship
independently of both the other document types and the main LMS release cycle.

## Outcome

The service has generated 52,000+ certificates and transcripts to date for elearn's student body,
with iterative layout refinements — signatories, stamps, reference numbers, per-page semester
counts — shipped across multiple ticket batches without the proxy becoming a bottleneck for the
platform it serves.
