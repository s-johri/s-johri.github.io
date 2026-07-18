---
title: 'gopdf: Justify text alignment'
summary: 'Merged upstream contribution to signintech/gopdf (~2,900 stars): full-justify alignment for Cell and MultiCell via TJ glyph-position adjustments.'
tech: ['Go', 'PDF internals']
kind: 'oss'
repo: 'https://github.com/signintech/gopdf'
order: 4
---

[gopdf](https://github.com/signintech/gopdf) is a ~2,900-star Go library for generating PDFs. It
supported left, center, and right alignment, but not full justification, so justified paragraphs
in client PDF generation work meant hand-rolling the whole thing: measuring each line, splitting
at word boundaries, and distributing leftover width across gaps. Logic that belongs in the
library.

[PR #347](https://github.com/signintech/gopdf/pull/347), merged upstream in July 2026, adds a
`Justify` alignment option for `CellWithOption` and `MultiCellWithOption`. The interesting
constraint: gopdf renders subset/CID fonts as `TJ` glyph arrays, so the PDF `Tw` word-spacing
operator can't work (it only affects single-byte code 32). Instead, leftover line width is
distributed by injecting negative position adjustments into the `TJ` array after each interior
space, the same channel already used for kerning, so the two coexist. Wrapped lines are justified
except the paragraph's last line (word-processor behaviour), with graceful fallback to
left-aligned output when a line has no interior spaces or no slack.

Purely additive: no exported signature changes, and existing output is byte-for-byte unchanged
unless a caller opts in. +455/-3 across 6 files, with unit tests for the pure helpers,
integration tests on rendered PDFs (including kerning coexistence and the last-line policy), and
a README section.
