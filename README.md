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

## Using `.nanya` with AI tools

`.nanya` is enforced through two layers:

- **Instructions** via `AGENTS.md` to force AI systems to parse `.nanya` first.
- **Guard logic** via this library so read/edit requests are checked before action.

AI systems should:

1. Read `.nanya` from the repository root.
2. Filter files before context building.
3. Block edits when paths are `READ_ONLY` or `NO_TOUCH`.

See `examples/guardedFileFlow.ts` for a Codex-style guarded read/edit flow.

## Default instruction snippet

Check for `.nanya` before reading or editing files.

- NO_TOUCH: do not read, reference, or modify
- READ_ONLY: read allowed, no modifications

If a request violates these rules, stop and explain why.

## Out of scope (v1)

- policy engines
- role-based permissions
- custom rule names
- plugin packaging
- IDE integration
- CI integration
- telemetry
