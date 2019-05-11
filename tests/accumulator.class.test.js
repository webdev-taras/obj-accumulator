const test = require('ava')
const { Accumulator } = require('../src/accumulator.class')

test.beforeEach(t => {
  t.context.item = new Accumulator()
})

test('new Accumulator() is instance of Accumulator', t => {
  t.true(t.context.item instanceof Object)
  t.true(t.context.item instanceof Accumulator)
})

test('new Accumulator() returns object with functions "list" as a propetry', t => {
  t.is(typeof t.context.item, 'object')
  t.is(typeof t.context.item.list, 'function')
})
