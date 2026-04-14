import { canEdit, canRead, explainBlock, loadNanya } from '../src/index.js';

const repoRoot = process.cwd();
const rules = loadNanya(repoRoot);

function readFile(path: string) {
  if (rules && !canRead(path, rules)) {
    throw new Error(explainBlock(path, rules));
  }

  console.log(`Reading file: ${path}`);
  // simulate read
}

function editFile(path: string) {
  if (rules && !canEdit(path, rules)) {
    throw new Error(explainBlock(path, rules));
  }

  console.log(`Editing file: ${path}`);
  // simulate edit
}

try {
  readFile('/docs/architecture.md');
  editFile('/docs/architecture.md');
  readFile('/contracts/token.sol');
  editFile('/src/index.ts');
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
