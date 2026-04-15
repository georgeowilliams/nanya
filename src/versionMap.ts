import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeRulePath } from './parseNanya.js';

export type ActiveVersionMap = {
  entries: string[];
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function entryMatches(filePath: string, entry: string): boolean {
  if (entry.includes('*')) {
    const regexPattern = `^${escapeRegex(entry).replace(/\\\*/g, '.*')}$`;
    return new RegExp(regexPattern).test(filePath);
  }

  if (filePath === entry) {
    return true;
  }

  return filePath.startsWith(`${entry}/`);
}

export function parseActiveVersionMap(content: string): ActiveVersionMap {
  const entries = new Set<string>();

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const normalized = normalizeRulePath(line);
    if (!normalized) {
      continue;
    }

    entries.add(normalized);
  }

  return {
    entries: [...entries]
  };
}

export function isInActiveMap(filePath: string, activeMap: ActiveVersionMap): boolean {
  const normalizedPath = normalizeRulePath(filePath);
  return activeMap.entries.some((entry) => entryMatches(normalizedPath, entry));
}

export function loadActiveVersionMap(repoRoot: string): ActiveVersionMap | null {
  const activeMapDir = join(repoRoot, 'docs/version-maps/active');

  if (!existsSync(activeMapDir)) {
    return null;
  }

  const fileName = readdirSync(activeMapDir)
    .filter((name: string) => !name.startsWith('.'))
    .sort((a: string, b: string) => a.localeCompare(b))[0];

  if (!fileName) {
    return null;
  }

  const content = readFileSync(join(activeMapDir, fileName), 'utf8');
  return parseActiveVersionMap(content);
}
