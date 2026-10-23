const assert = require('node:assert/strict');
assert.equal(require('../../libs/ui/index.cjs')(12), 'R$ 12.00');
console.log('PASS portal: integração com UI');
