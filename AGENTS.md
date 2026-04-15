# AI Execution Rules

This repository uses `.nanya` to define AI boundaries.

Before reading or modifying any files:

1. Load `.nanya`
2. Apply rules:
   - NO_TOUCH → do not read or modify
   - READ_ONLY → read allowed, no modification

3. Apply execution scope:
   - Only modify files included in the active version map
   - If a file is not in the active map, do not modify it

If an action is blocked:
- explain which rule caused it
- do not proceed
