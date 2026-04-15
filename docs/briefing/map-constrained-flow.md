# Map-Constrained Execution Example Flow

User: "Refactor /src/random.ts"
→ Blocked: not in active version map

User: "Refactor /src/feature.ts"
→ Allowed

User: "Edit /contracts/token.sol"
→ Blocked: NO_TOUCH
