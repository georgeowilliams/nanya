# .nanya

> A `.gitignore` for AI — tell AI what’s not its business.

---

## What is this?

`.nanya` is a tiny, portable standard for defining **AI boundaries**.

It tells AI systems:
- what they must not read
- what they must not modify

Define it once. Enforce it anywhere.

---

## Example

```txt
# .nanya

NO_TOUCH:
/env
/secrets/*
/contracts/*

READ_ONLY:
/docs/*
/generated/*
```

---

## Rules

### NO_TOUCH
- do not read
- do not reference
- do not modify

> Treated as if it does not exist.

---

### READ_ONLY
- may read
- must not modify

> Reference only.

---

## How it works

`.nanya` separates rule definition from execution.

### 1. Define boundaries

You create a `.nanya` file in your repo.

### 2. Inject rules (environment-dependent)

| Environment | How |
| --- | --- |
| Repo-aware AI (Codex, etc.) | `AGENTS.md` |
| Custom scripts / APIs | `buildNanyaInstruction()` |
| Full systems | guard functions |

### 3. Enforce behavior

At runtime:

```ts
if (!canRead(path, rules)) {
  // block read
}

if (!canEdit(path, rules)) {
  // block edit
}
```

---

## Usage

### Load rules

```ts
import { loadNanya } from 'nanya';

const rules = loadNanya(process.cwd());
```

### Guard file access

```ts
import { canRead, canEdit, explainBlock } from 'nanya';

if (!canRead(path, rules)) {
  throw new Error(explainBlock(path, rules));
}

if (!canEdit(path, rules)) {
  throw new Error(explainBlock(path, rules));
}
```

---

## Using with AI tools

### Repo-aware tools (recommended)

Add an `AGENTS.md` file:

```md
This repo uses `.nanya`.

- NO_TOUCH: do not read or modify
- READ_ONLY: read only, no edits

Always respect these rules.
```

### Custom AI pipelines

Inject rules into prompts:

```ts
import { buildNanyaInstruction } from 'nanya';

const prompt = `
${buildNanyaInstruction()}

User request:
${input}
`;
```

---

## Works everywhere

`.nanya` is not tied to any one tool.

It works across:

- IDE agents
- CLI tools
- backend systems
- custom AI pipelines

> One file. Same rules. Any environment.
