const test = require('ava')
const accumulator = require('../src/accumulator')

test.beforeEach(t => {
  t.context = accumulator()
})

test('accumulator() returns object with two functions: { item, list }', t => {
  t.deepEqual(Object.keys(t.context), ['item', 'list'])
  t.is(typeof t.context.item, 'function')
  t.is(typeof t.context.list, 'function')
})
