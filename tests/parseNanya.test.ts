import { describe, expect, it } from 'vitest';
import { parseNanya } from '../src/parseNanya.js';

describe('parseNanya', () => {
  it('ignores comments and blank lines', () => {
    const content = `
# heading

NO_TOUCH:
# no touch comment
/.env

READ_ONLY:
# read only comment
/docs/*
`;

    const rules = parseNanya(content);

    expect(rules.noTouch).toEqual(['/.env']);
    expect(rules.readOnly).toEqual(['/docs/*']);
  });

  it('parses only known sections and normalizes paths', () => {
    const content = `
UNKNOWN:
  /ignored/*
NO_TOUCH:
secrets/*
infra/
READ_ONLY:
\\docs\\*
`;

    const rules = parseNanya(content);

    expect(rules.noTouch).toEqual(['/secrets/*', '/infra']);
    expect(rules.readOnly).toEqual(['/docs/*']);
  });
});
