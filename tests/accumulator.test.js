const test = require('ava')
const accumulator = require('../src/accumulator')

test.beforeEach(t => {
  t.context.item = accumulator()
})

test('accumulator() returns function with functions "list" as a propetry', t => {
  t.is(typeof t.context.item, 'function')
  t.true(t.context.item.hasOwnProperty('list'))
  t.is(typeof t.context.item.list, 'function')
})
