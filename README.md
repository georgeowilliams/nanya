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
/.env
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

`.nanya` separates **rule definition** from **execution**.

### 1. Define
Create a `.nanya` file in your repo.

### 2. Inject (depends on environment)

- Repo-aware AI → `AGENTS.md`
- Custom pipelines → prompt injection
- Systems → direct rule usage

### 3. Enforce

```ts
if (!canRead(path, rules)) block();
if (!canEdit(path, rules)) block();
```

---

## Works everywhere

`.nanya` is not tied to any tool.

It works across:
- AI coding agents
- CLI tools
- backend systems
- custom AI pipelines

> One file. Same rules. Any environment.

---

## Minimal usage

```ts
import { loadNanya, canRead, canEdit } from 'nanya';

const rules = loadNanya(process.cwd());

if (!canRead(path, rules)) throw new Error('Blocked');
if (!canEdit(path, rules)) throw new Error('Blocked');
```

---

## Philosophy

`.nanya` is intentionally small.

- not a policy engine  
- not a framework  
- not a permissions system  

It is a primitive.

> A simple way to define what AI should not touch.

---

## Summary

Define AI boundaries once.  
Enforce them everywhere.
