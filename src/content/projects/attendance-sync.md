---
title: 'attendance-sync — Daily Attendance Ingestion at 1.3M+ Records'
summary: 'A Go cron service reconciling merged-course meeting attendance from an external API into a Django LMS — 1.3M+ records processed to date.'
tech: ['Go', 'Cron', 'REST APIs']
kind: 'case-study'
order: 3
---

## Context

attendance-sync is a Go service that ingests course-meeting attendance dumps — including merged
courses where multiple sections meet as one session — from an external Microsoft attendance API,
and forwards organizer attendance plus a role indicator into the elearn LMS platform. It runs as a
daily cron job and was built and extended across three tickets over close to a year.

## Constraints

- Attendance data arrives as periodic dumps from an external API, not a live feed, and merged
  courses meant a single meeting couldn't be assumed to map to a single course — the sync had to
  reconcile that correctly rather than trusting a naive 1:1 mapping.
- elearn needed a role indicator alongside raw attendance to distinguish meeting organizers from
  attendees, which meant coordinating a schema and consumption change on the receiving Django side
  in lockstep with this service's output.
- The job runs unattended overnight — failures needed to be safe and idempotent rather than
  silently dropping records or double-counting them on a retry.

## Architecture decision

I built attendance-sync as a standalone Go service rather than folding the ingestion logic
directly into the Django elearn app, keeping the external-API-facing parsing and merged-course
reconciliation isolated from the LMS codebase. I extended the sync's output contract with an
organizer role field so elearn could distinguish organizer attendance from attendee attendance
without re-deriving it downstream, coordinating the corresponding model changes on the elearn side.

## Outcome

The service has processed 1.3 million+ attendance records to date, running daily and feeding
directly into elearn's attendance and enrolment views for WILP courses.
