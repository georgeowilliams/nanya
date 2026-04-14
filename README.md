# .nanya foundation (v1)

`.nanya` is a tiny file standard for AI interaction boundaries in a repo.

It works like a focused cousin of `.gitignore`, but for AI read/edit behavior.

## Why it exists

AI tools need a simple, explicit way to know which files are:

- completely off-limits
- readable but not editable

v1 keeps this intentionally small and easy to adopt.

## Rule types

- `NO_TOUCH`: no read, no reference, no edits
- `READ_ONLY`: read/reference allowed, edits forbidden

## Example `.nanya`

```txt
# .nanya

NO_TOUCH:
/.env
/secrets/*
/infra/*
/contracts/*

READ_ONLY:
/docs/*
/generated/*
```

## Usage

```ts
import {
  loadNanya,
  classifyPath,
  canRead,
  canEdit,
  buildNanyaInstruction
} from 'nanya';

const rules = loadNanya(process.cwd());

if (rules) {
  const path = '/docs/guide.md';
  const classification = classifyPath(path, rules); // READ_ONLY
  const readOk = canRead(path, rules); // true
  const editOk = canEdit(path, rules); // false
  const instruction = buildNanyaInstruction(rules);

  console.log({ classification, readOk, editOk, instruction });
}
```

## Default instruction snippet

Check for a `.nanya` file before reading or editing repo files.

Rules:
- NO_TOUCH: do not read, reference, or modify these paths.
- READ_ONLY: these paths may be read, but must not be modified.

If an action would violate `.nanya`, stop and explain which path is blocked and why.

Ultra-short:

Respect `.nanya`.

- NO_TOUCH = no read, no edits
- READ_ONLY = read allowed, no edits

## Out of scope (v1)

- policy engines
- role-based permissions
- custom rule names
- plugin packaging
- IDE integration
- CI integration
- telemetry
