import { describe, expect, it } from 'vitest';
import { canEdit, canRead } from '../src/guard.js';
import type { NanyaRules } from '../src/parseNanya.js';

const rules: NanyaRules = {
  noTouch: ['/secrets/*'],
  readOnly: ['/docs/*']
};

describe('guard helpers', () => {
  it('canRead blocks only NO_TOUCH', () => {
    expect(canRead('/secrets/key.txt', rules)).toBe(false);
    expect(canRead('/docs/guide.md', rules)).toBe(true);
    expect(canRead('/src/app.ts', rules)).toBe(true);
  });

  it('canEdit allows only OPEN', () => {
    expect(canEdit('/secrets/key.txt', rules)).toBe(false);
    expect(canEdit('/docs/guide.md', rules)).toBe(false);
    expect(canEdit('/src/app.ts', rules)).toBe(true);
  });
});
