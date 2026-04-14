export type NanyaRules = {
  noTouch: string[];
  readOnly: string[];
};

function normalizeRulePath(value: string): string {
  const trimmed = value.trim().replaceAll('\\', '/');
  if (!trimmed) {
    return '';
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const compacted = withLeadingSlash.replace(/\/+/g, '/');

  if (compacted.length > 1 && compacted.endsWith('/')) {
    return compacted.slice(0, -1);
  }

  return compacted;
}

export function parseNanya(content: string): NanyaRules {
  const noTouch = new Set<string>();
  const readOnly = new Set<string>();

  let section: 'NO_TOUCH' | 'READ_ONLY' | null = null;

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    if (line === 'NO_TOUCH:') {
      section = 'NO_TOUCH';
      continue;
    }

    if (line === 'READ_ONLY:') {
      section = 'READ_ONLY';
      continue;
    }

    if (line.endsWith(':')) {
      section = null;
      continue;
    }

    if (!section) {
      continue;
    }

    const normalized = normalizeRulePath(line);
    if (!normalized) {
      continue;
    }

    if (section === 'NO_TOUCH') {
      noTouch.add(normalized);
    } else {
      readOnly.add(normalized);
    }
  }

  return {
    noTouch: [...noTouch],
    readOnly: [...readOnly]
  };
}

export { normalizeRulePath };
