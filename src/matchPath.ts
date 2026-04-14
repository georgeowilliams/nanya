import { normalizeRulePath, type NanyaRules } from './parseNanya.js';

export type NanyaClassification = 'NO_TOUCH' | 'READ_ONLY' | 'OPEN';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function patternMatches(filePath: string, rule: string): boolean {
  if (rule.includes('*')) {
    const regexPattern = `^${escapeRegex(rule).replace(/\\\*/g, '.*')}$`;
    return new RegExp(regexPattern).test(filePath);
  }

  if (filePath === rule) {
    return true;
  }

  if (filePath.startsWith(`${rule}/`)) {
    return true;
  }

  return false;
}

export function classifyPath(filePath: string, rules: NanyaRules): NanyaClassification {
  const normalizedPath = normalizeRulePath(filePath);

  if (rules.noTouch.some((rule) => patternMatches(normalizedPath, rule))) {
    return 'NO_TOUCH';
  }

  if (rules.readOnly.some((rule) => patternMatches(normalizedPath, rule))) {
    return 'READ_ONLY';
  }

  return 'OPEN';
}
