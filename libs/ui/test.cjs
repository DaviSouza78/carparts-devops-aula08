const assert = require('node:assert/strict');
assert.equal(require('./index.cjs')(30), 'R$ 30.00');
console.log('PASS UI: formato de preço');
