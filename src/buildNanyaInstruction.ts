import type { NanyaRules } from './parseNanya.js';

export function buildNanyaInstruction(_rules: NanyaRules): string {
  return [
    'Check for `.nanya` before reading or editing files.',
    '',
    '- NO_TOUCH: do not read, reference, or modify',
    '- READ_ONLY: read allowed, no modifications',
    '',
    'If a request violates these rules, stop and explain why.'
  ].join('\n');
}
