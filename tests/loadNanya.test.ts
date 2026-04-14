import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { loadNanya } from '../src/loadNanya.js';

const tempDirs: string[] = [];

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    if (dir) {
      rmSync(dir, { recursive: true, force: true });
    }
  }
});

describe('loadNanya', () => {
  it('returns null when .nanya is missing', () => {
    const dir = mkdtempSync(join(tmpdir(), 'nanya-'));
    tempDirs.push(dir);

    expect(loadNanya(dir)).toBeNull();
  });

  it('loads and parses .nanya when present', () => {
    const dir = mkdtempSync(join(tmpdir(), 'nanya-'));
    tempDirs.push(dir);

    writeFileSync(
      join(dir, '.nanya'),
      `NO_TOUCH:\n/secrets/*\nREAD_ONLY:\n/docs/*\n`,
      'utf8'
    );

    expect(loadNanya(dir)).toEqual({
      noTouch: ['/secrets/*'],
      readOnly: ['/docs/*']
    });
  });
});
