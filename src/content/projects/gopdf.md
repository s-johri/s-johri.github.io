---
title: 'signintech/gopdf: two merged upstream contributions'
summary: 'Two feature PRs merged into signintech/gopdf (~2,900 stars): full-justify alignment for Cell and MultiCell, and superscript/subscript font styles derived from OS/2 font metrics.'
tech: ['Go', 'PDF internals']
kind: 'oss'
repo: 'https://github.com/signintech/gopdf'
order: 4
---

[gopdf](https://github.com/signintech/gopdf) is a ~2,900-star Go library for generating PDFs, and
the one behind the certificate and transcript generation I work on. Two gaps in it cost me
hand-rolled workarounds often enough to be worth fixing upstream. Both PRs were merged as-is in
July 2026, with no change requests.

## Justify text alignment (PR #347)

gopdf supported left, center, and right alignment, but not full justification, so justified
paragraphs meant hand-rolling the whole thing: measuring each line, splitting at word boundaries,
and distributing leftover width across gaps. Logic that belongs in the library.

[PR #347](https://github.com/signintech/gopdf/pull/347) adds a `Justify` alignment option for
`CellWithOption` and `MultiCellWithOption`. The interesting constraint: gopdf renders subset/CID
fonts as `TJ` glyph arrays, so the PDF `Tw` word-spacing operator can't work (it only affects
single-byte code 32). Instead, leftover line width is distributed by injecting negative position
adjustments into the `TJ` array after each interior space, the same channel already used for
kerning, so the two coexist. Wrapped lines are justified except the paragraph's last line
(word-processor behaviour), with graceful fallback to left-aligned output when a line has no
interior spaces or no slack.

## Superscript and subscript font styles (PR #348)

The style flags stopped at bold, italic, and underline, so exponents, chemical formulas, and
footnote markers had to be faked by drawing a second, smaller text run at a hand-computed offset
that needed recomputing for every font size.

[PR #348](https://github.com/signintech/gopdf/pull/348) adds `Superscript` and `Subscript` style
flags. Rather than guess at proportions, the glyph size and baseline shift are read from the
font's own OS/2 metrics (`ySuperscriptYSize`/`YOffset` and their subscript counterparts), which
gopdf's TTF parser had been skipping over, with conventional ratios as a fallback for fonts that
omit them. Rendering uses the PDF text-rise operator `Ts`, emitted on every draw because text
state persists across `BT`/`ET` blocks. The caller's font size still governs line height and
baseline placement, so a script run sits on the same baseline as the text around it with no
arithmetic on the caller's side, while width measurement uses the scaled size so wrapping and
justification stay accurate.

## Shape of the work

Both PRs are purely additive: no exported signature changes, and existing output is byte-for-byte
unchanged unless a caller opts in. Together they are +900/-22 across 12 files, with unit tests for
the pure helpers, integration tests on rendered PDFs (including that justification and kerning
still coexist), visual demo tests, and README sections.
