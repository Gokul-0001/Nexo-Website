const fs = require('fs');
const path = require('path');
const code = fs.readFileSync(process.argv[2], 'utf8');
const parser = require(path.join(process.cwd(), 'node_modules', '@babel', 'parser'));
try {
  parser.parse(code, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
  console.log('OK');
} catch (e) {
  console.log('ERROR:', e.message);
  console.log('LOC:', JSON.stringify(e.loc));
  console.log('POS:', e.pos);
  if (typeof e.pos === 'number') {
    const start = Math.max(0, e.pos - 100);
    const end = Math.min(code.length, e.pos + 100);
    console.log('CONTEXT:');
    console.log(code.slice(start, end));
    console.log(' '.repeat(Math.max(0, e.pos - start)) + '^');
  }
}