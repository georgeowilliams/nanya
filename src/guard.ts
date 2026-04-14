import { classifyPath } from './matchPath.js';
import type { NanyaRules } from './parseNanya.js';

export function canRead(filePath: string, rules: NanyaRules): boolean {
  return classifyPath(filePath, rules) !== 'NO_TOUCH';
}

export function canEdit(filePath: string, rules: NanyaRules): boolean {
  return classifyPath(filePath, rules) === 'OPEN';
}

export function explainBlock(filePath: string, rules: NanyaRules): string {
  const type = classifyPath(filePath, rules);
  return `Blocked by .nanya: ${filePath} is ${type}`;
}
