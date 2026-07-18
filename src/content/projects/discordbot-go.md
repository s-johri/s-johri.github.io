---
title: 'discordbot-go'
summary: 'A Discord/Google account-linking gate bot serving a real community of ~250 members, with self-healing membership sync and dynamic per-cohort role assignment.'
tech: ['Go', 'PostgreSQL', 'Valkey/Redis', 'Discord API']
kind: 'oss'
repo: 'https://github.com/s-johri/discord-verify-bot'
order: 6
---

discordbot-go gates access to a Discord server behind a Discord-and-Google account-linking flow,
serving a real community of roughly 250 members. It's a public mirror of engineering work I do
through Code Argo; see the Experience section for the client-facing context.

Highlights: a reconciliation/self-healing sweep that detects and corrects membership drift instead
of letting it silently accumulate; a storage migration for identity and cohort-channel data, first
from a local JSON file to PostgreSQL, then to Valkey/Redis as reliability needs grew; dynamic
per-cohort Discord role assignment driven by a CSV mapping; and inherited-channel-permission
handling with Discord permission-bit masking, including a fallback path for Discord's 403/50013
permission errors. 51 commits, the most active repo in my personal GitHub namespace.
