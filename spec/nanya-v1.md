# .nanya v1 Specification

## Purpose

`.nanya` is a tiny repository standard for AI interaction boundaries.

It defines two path categories:

- `NO_TOUCH`: path is unavailable to AI tooling (no read, no reference, no edit)
- `READ_ONLY`: path may be read/referenced, but must not be edited

## File name and format

- File name is `.nanya` at repository root.
- UTF-8 plain text.
- One rule entry per line.
- Comments begin with `#` and are ignored.
- Blank lines are ignored.

## Supported sections

Only these section headers are recognized:

- `NO_TOUCH:`
- `READ_ONLY:`

Unknown sections are ignored.

## Rule entries

- Entry is a path pattern on its own line under a recognized section.
- Paths are normalized to forward slashes.
- Paths are normalized to start with `/`.
- Trailing slash is removed (except `/`).
- `*` is supported as a simple wildcard.

Examples:

- `/env`
- `/.env`
- `/docs/*`
- `/generated/*`
- `/infra/*`

## Matching semantics (v1)

- Exact path match is supported.
- Directory-style prefix match is supported for non-wildcard rules.
  - Rule `/infra` matches `/infra` and `/infra/main.tf`.
- Wildcard `*` is treated as a simple greedy matcher.
- Precedence: `NO_TOUCH` overrides `READ_ONLY`.

## Enforcement semantics

Given a classified path:

- `NO_TOUCH`: cannot read, cannot edit
- `READ_ONLY`: can read, cannot edit
- `OPEN`: can read, can edit

## Non-goals

v1 intentionally excludes:

- custom rule types
- nested policy layers
- roles and user identities
- YAML/JSON alternatives
- plugin packaging
- IDE integrations
- CI integrations
