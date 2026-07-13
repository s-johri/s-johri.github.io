---
title: 'attendance-sync: Daily Attendance Ingestion at 1.3M+ Records'
summary: 'A Go cron service reconciling merged-course meeting attendance from an external API into a Django student portal, with 1.3M+ records processed to date.'
tech: ['Go', 'Cron', 'REST APIs']
kind: 'case-study'
order: 3
---

## Context

attendance-sync is a Go service that ingests daily course-meeting attendance from an external
Microsoft API, including merged courses where several sections meet as one session, and forwards
organizer attendance and a role indicator into the elearn platform. It runs as a scheduled job and
grew across three iterations over close to a year.

## Constraints

- Attendance arrives as periodic dumps, not a live feed, and merged courses break the assumption
  that one meeting maps to one course. The sync has to reconcile that rather than trust a naive 1:1
  mapping.
- elearn needed a role indicator alongside raw attendance to tell organizers from attendees, which
  meant coordinating a schema and consumption change on the Django side in lockstep with this
  service's output.
- The job runs unattended, so failures had to surface and stay recoverable instead of silently
  dropping records.

## Architecture decision

I built it as a standalone Go service rather than folding ingestion into the Django app, keeping the
external-API parsing and merged-course reconciliation out of the portal codebase. I extended its output
contract with an organizer-role field so elearn could distinguish organizer attendance from attendee
attendance without re-deriving it downstream, and coordinated the matching model changes on the
elearn side.

## Outcome

The service has processed 1.3 million+ attendance records to date, running daily and feeding straight
into elearn's attendance and enrolment views.
