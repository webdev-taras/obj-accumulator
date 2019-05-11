const test = require('ava')
const accumulator = require('../src/accumulator')
const arr = require('./data.mock')

test.beforeEach(t => {
  t.context.item = accumulator()
  t.context.list = t.context.item.list
})

test('accumulator().item(name, obj) accumulate object by name and return it', t => {
  const [obj] = arr
  t.deepEqual(t.context.item(obj.name, obj), obj)
})

test('accumulator().item(name, obj) throws error if name already present in storage', t => {
  const [obj] = arr
  t.context.item(obj.name, obj)
  t.throws(() => t.context.item(obj.name, obj), { instanceOf: Error, message: `item "${obj.name}" already present in list` })
})

test('accumulator().item(name, obj) throws error if obj is empty', t => {
  const name = 'obj'
  const obj = null
  t.throws(() => t.context.item(name, obj), { instanceOf: Error, message: `value for item "${name}" is not valid` })
  t.is(t.context.list().length, 0)
})

test('accumulator().item(name) returns object by name if it exists', t => {
  const [obj] = arr
  arr.forEach(obj => t.context.item(obj.name, obj))
  t.deepEqual(t.context.item(obj.name), obj)
})

test('accumulator().item(name) throws error if object doesnt exist', t => {
  const [obj] = arr
  t.throws(() => t.context.item(obj.name), { instanceOf: Error, message: `item "${obj.name}" is not present in list` })
})
