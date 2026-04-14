import type { NanyaRules } from './parseNanya.js';

export function buildNanyaInstruction(rules: NanyaRules): string {
  const lines: string[] = [
    'Check for a `.nanya` file before reading or editing repo files.',
    '',
    'Rules:',
    '- NO_TOUCH: do not read, reference, or modify these paths.',
    '- READ_ONLY: these paths may be read, but must not be modified.',
    '',
    'If an action would violate `.nanya`, stop and explain which path is blocked and why.'
  ];

  if (rules.noTouch.length > 0) {
    lines.push('', `NO_TOUCH paths: ${rules.noTouch.join(', ')}`);
  }

  if (rules.readOnly.length > 0) {
    lines.push(`READ_ONLY paths: ${rules.readOnly.join(', ')}`);
  }

  lines.push('', 'Respect `.nanya`.', '- NO_TOUCH = no read, no edits', '- READ_ONLY = read allowed, no edits');

  return lines.join('\n');
}
