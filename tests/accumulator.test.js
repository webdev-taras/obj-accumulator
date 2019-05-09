const test = require('ava')
const accumulator = require('../src/accumulator')

test.beforeEach(t => {
  t.context = accumulator()
})

test('accumulator() returns object with two functions: { method, getter }', t => {
  t.deepEqual(Object.keys(t.context), ['method', 'getter'])
  t.is(typeof t.context.method, 'function')
  t.is(typeof t.context.getter, 'function')
})
