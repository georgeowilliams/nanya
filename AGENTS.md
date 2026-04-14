# AI Agent Instructions

This repository uses a `.nanya` file to define AI interaction boundaries.

Before reading or modifying any files:
1. Locate and parse `.nanya` in the repo root.
2. Apply the following rules:

- NO_TOUCH:
  - Do not read
  - Do not reference
  - Do not summarize
  - Do not modify

- READ_ONLY:
  - You may read and reference
  - You must not modify

If a requested action violates `.nanya`, stop and explain:
- which path is blocked
- which rule applies

These rules are strict and must never be bypassed.
