const test = require('ava')
const accumulatorFactory = require('../src/accumulator.class')
const { Accumulator } = accumulatorFactory

test.beforeEach(t => {
  t.context.item = new Accumulator()
})

test('new Accumulator() is instance of Accumulator', t => {
  const { item } = t.context
  t.true(item instanceof Object)
  t.true(item instanceof Accumulator)
})

test('new Accumulator() returns object which props can not be deleted', t => {
  const { item } = t.context
  const prop = 'test'
  item[prop] = 'some text'
  t.false(delete item[prop])
})

test('accumulatorFactory() is instance of Accumulator', t => {
  const item = accumulatorFactory()
  t.true(item instanceof Object)
  t.true(item instanceof Accumulator)
})
