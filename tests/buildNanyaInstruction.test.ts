import { describe, expect, it } from 'vitest';
import { buildNanyaInstruction } from '../src/buildNanyaInstruction.js';

describe('buildNanyaInstruction', () => {
  it('returns the concise strict instruction block', () => {
    expect(buildNanyaInstruction({ noTouch: ['/contracts/*'], readOnly: ['/docs/*'] })).toBe(
      [
        'Check for `.nanya` before reading or editing files.',
        '',
        '- NO_TOUCH: do not read, reference, or modify',
        '- READ_ONLY: read allowed, no modifications',
        '',
        'If a request violates these rules, stop and explain why.'
      ].join('\n')
    );
  });
});
