---
title: 'sshush'
summary: 'A keyboard-driven terminal UI unifying SSH key management, ssh-agent control, and ~/.ssh/config editing in one Go app.'
tech: ['Go', 'GitHub Actions', 'Homebrew']
kind: 'oss'
repo: 'https://github.com/s-johri/sshush'
order: 4
---

sshush is a keyboard-driven TUI that brings SSH key management, ssh-agent control, and
`~/.ssh/config` editing together in one terminal app, instead of juggling `ssh-add`, `ssh-keygen`,
and a text editor separately. Config edits are gated behind a confirmation step with automatic
`.bak` backups, since a bad edit to `~/.ssh/config` can lock you out of every host it manages.

It's my personal flagship project: 124 commits over active development, tagged releases, a GitHub
Actions CI and release pipeline, and a published Homebrew tap
([s-johri/homebrew-tap](https://github.com/s-johri/homebrew-tap)) for one-line installs.
MIT-licensed and publicly starred.
