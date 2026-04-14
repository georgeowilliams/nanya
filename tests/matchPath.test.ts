import { describe, expect, it } from 'vitest';
import { classifyPath } from '../src/matchPath.js';
import type { NanyaRules } from '../src/parseNanya.js';

const rules: NanyaRules = {
  noTouch: ['/contracts/*', '/docs/private/*', '/.env'],
  readOnly: ['/docs/*', '/generated/*']
};

describe('classifyPath', () => {
  it('matches exact paths', () => {
    expect(classifyPath('/.env', rules)).toBe('NO_TOUCH');
  });

  it('matches wildcard patterns', () => {
    expect(classifyPath('/generated/api/types.ts', rules)).toBe('READ_ONLY');
    expect(classifyPath('/contracts/token.sol', rules)).toBe('NO_TOUCH');
  });

  it('uses NO_TOUCH precedence over READ_ONLY', () => {
    expect(classifyPath('/docs/private/secret.md', rules)).toBe('NO_TOUCH');
  });

  it('returns OPEN when no rule matches', () => {
    expect(classifyPath('/src/index.ts', rules)).toBe('OPEN');
  });

  it('matches simple directory-style prefixes', () => {
    const prefixRules: NanyaRules = {
      noTouch: ['/infra'],
      readOnly: []
    };

    expect(classifyPath('/infra', prefixRules)).toBe('NO_TOUCH');
    expect(classifyPath('/infra/main.tf', prefixRules)).toBe('NO_TOUCH');
  });
});
