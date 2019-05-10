const test = require('ava')
const accumulator = require('../src/accumulator')
const { validator } = require('./accumulator.fake')

test.beforeEach(t => {
  t.context = accumulator(validator, 'item', 'list')
})

test('accumulator(validator).item(name, obj) validate the obj', t => {
  const name = 'token'
  const obj = 'blablabla'
  t.context.item(name, obj)
  t.is(t.context.item(name), obj)
  t.true(validator.calledWith(obj));
  t.true(validator.returned(true));
})

test('accumulator(validator).item(name, obj) throws error if obj is not valid', t => {
  const name = 'token'
  const obj = 1
  t.throws(() => t.context.item(name, obj), { instanceOf: Error, message: `value for item "${name}" is not valid` })
  t.is(t.context.list().length, 0)
})
