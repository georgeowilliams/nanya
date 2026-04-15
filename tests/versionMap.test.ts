import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { isInActiveMap, loadActiveVersionMap, parseActiveVersionMap } from '../src/versionMap.js';

const tempDirs: string[] = [];

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    if (dir) {
      rmSync(dir, { recursive: true, force: true });
    }
  }
});

describe('version map helpers', () => {
  it('parses entries and ignores comments', () => {
    const parsed = parseActiveVersionMap(`# map\n/src/*\n\n/tests/*\n`);
    expect(parsed.entries).toEqual(['/src/*', '/tests/*']);
  });

  it('checks map membership with wildcard and exact matches', () => {
    const activeMap = parseActiveVersionMap('/src/feature.ts\n/tests/*');
    expect(isInActiveMap('/src/feature.ts', activeMap)).toBe(true);
    expect(isInActiveMap('/tests/guard.test.ts', activeMap)).toBe(true);
    expect(isInActiveMap('/src/random.ts', activeMap)).toBe(false);
  });

  it('loads the first active map file when directory exists', () => {
    const dir = mkdtempSync(join(tmpdir(), 'nanya-map-'));
    tempDirs.push(dir);

    const activeDir = join(dir, 'docs/version-maps/active');
    mkdirSync(activeDir, { recursive: true });
    writeFileSync(join(activeDir, 'a.map'), '/src/*\n', 'utf8');
    writeFileSync(join(activeDir, 'b.map'), '/tests/*\n', 'utf8');

    expect(loadActiveVersionMap(dir)).toEqual({ entries: ['/src/*'] });
  });

  it('returns null when no active version map exists', () => {
    const dir = mkdtempSync(join(tmpdir(), 'nanya-map-'));
    tempDirs.push(dir);

    expect(loadActiveVersionMap(dir)).toBeNull();
  });
});
