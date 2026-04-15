import { classifyPath } from './matchPath.js';
import type { NanyaRules } from './parseNanya.js';
import { isInActiveMap, type ActiveVersionMap } from './versionMap.js';

export function canRead(filePath: string, rules: NanyaRules): boolean {
  return classifyPath(filePath, rules) !== 'NO_TOUCH';
}

export function canEdit(filePath: string, rules: NanyaRules): boolean {
  return classifyPath(filePath, rules) === 'OPEN';
}

export function canEditInActiveMap(
  filePath: string,
  rules: NanyaRules,
  activeMap: ActiveVersionMap
): boolean {
  return canEdit(filePath, rules) && isInActiveMap(filePath, activeMap);
}

export function assertReadable(filePath: string, rules: NanyaRules): void {
  if (!canRead(filePath, rules)) {
    throw new Error('Blocked by .nanya');
  }
}

export function assertEditable(
  filePath: string,
  rules: NanyaRules,
  activeMap: ActiveVersionMap
): void {
  if (!canEdit(filePath, rules)) {
    throw new Error('Blocked by .nanya');
  }

  if (!isInActiveMap(filePath, activeMap)) {
    throw new Error('Blocked: not in active version map');
  }
}

export function explainBlock(filePath: string, rules: NanyaRules): string {
  const type = classifyPath(filePath, rules);
  return `Blocked by .nanya: ${filePath} is ${type}`;
}
