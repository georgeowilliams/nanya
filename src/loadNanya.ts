import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseNanya, type NanyaRules } from './parseNanya.js';

export function loadNanya(repoRoot: string): NanyaRules | null {
  const filePath = join(repoRoot, '.nanya');

  if (!existsSync(filePath)) {
    return null;
  }

  const content = readFileSync(filePath, 'utf8');
  return parseNanya(content);
}
