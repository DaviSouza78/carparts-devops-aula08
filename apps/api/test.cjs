const assert = require('node:assert/strict');
const total = require('./preco.cjs');
assert.equal(total(10, 3), 30);
assert.equal(total(5, 0), 0);
console.log('PASS API: quantidade e total');
