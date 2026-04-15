import { describe, expect, it } from 'vitest';
import {
  assertEditable,
  assertReadable,
  canEdit,
  canEditInActiveMap,
  canRead,
  explainBlock
} from '../src/guard.js';
import type { NanyaRules } from '../src/parseNanya.js';
import type { ActiveVersionMap } from '../src/versionMap.js';

const rules: NanyaRules = {
  noTouch: ['/secrets/*'],
  readOnly: ['/docs/*']
};

const activeMap: ActiveVersionMap = {
  entries: ['/src/feature.ts', '/tests/*']
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

  it('canEditInActiveMap requires OPEN and active map membership', () => {
    expect(canEditInActiveMap('/src/feature.ts', rules, activeMap)).toBe(true);
    expect(canEditInActiveMap('/src/random.ts', rules, activeMap)).toBe(false);
    expect(canEditInActiveMap('/docs/guide.md', rules, activeMap)).toBe(false);
  });

  it('assertReadable throws for NO_TOUCH', () => {
    expect(() => assertReadable('/secrets/key.txt', rules)).toThrowError('Blocked by .nanya');
    expect(() => assertReadable('/src/app.ts', rules)).not.toThrow();
  });

  it('assertEditable throws for boundary and map violations', () => {
    expect(() => assertEditable('/docs/guide.md', rules, activeMap)).toThrowError('Blocked by .nanya');
    expect(() => assertEditable('/src/random.ts', rules, activeMap)).toThrowError(
      'Blocked: not in active version map'
    );
    expect(() => assertEditable('/src/feature.ts', rules, activeMap)).not.toThrow();
  });

  it('explainBlock reports the matched rule type', () => {
    expect(explainBlock('/secrets/key.txt', rules)).toBe(
      'Blocked by .nanya: /secrets/key.txt is NO_TOUCH'
    );
    expect(explainBlock('/docs/guide.md', rules)).toBe(
      'Blocked by .nanya: /docs/guide.md is READ_ONLY'
    );
  });
});
