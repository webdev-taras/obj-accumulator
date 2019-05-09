const test = require('ava')
const sinon = require('sinon')
const accumulator = require('../obj-accumulator')
const arr = require('./data.mock')

test.beforeEach(t => {
  t.context = accumulator()
})

test('accumulator() returns object with two functions: { method, getter }', t => {
  t.deepEqual(Object.keys(t.context), ['method', 'getter'])
  t.is(typeof t.context.method, 'function')
  t.is(typeof t.context.getter, 'function')
})

test('accumulator().getter() returns ampty array from the beginning', t => {
  t.deepEqual(t.context.getter(), [])
})

test('accumulator().getter() returns array of accumulated objects', t => {
  arr.forEach(obj => t.context.method(obj.name, obj))
  const names = arr.map(obj => obj.name)
  t.deepEqual(t.context.getter(), names)
})

test('accumulator().method(name, obj) accumulate object by name and return it', t => {
  const [obj] = arr
  t.deepEqual(t.context.method(obj.name, obj), obj)
})

test('accumulator().method(name, obj) throws error if name already present in storage', t => {
  const [obj] = arr
  t.context.method(obj.name, obj)
  t.throws(() => t.context.method(obj.name, obj), { instanceOf: Error, message: `item "${obj.name}" already present in list` })
})

test('accumulator().method(name, obj) throws error if obj is empty', t => {
  const name = 'obj'
  const obj = null
  t.throws(() => t.context.method(name, obj), { instanceOf: Error, message: `value for item "${name}" should not be empty` })
})

test('accumulator().method(name) returns object by name if it exists', t => {
  const [obj] = arr
  arr.forEach(obj => t.context.method(obj.name, obj))
  t.deepEqual(t.context.method(obj.name), obj)
})

test('accumulator().method(name) throws error if object doesnt exist', t => {
  const [obj] = arr
  t.throws(() => t.context.method(obj.name), { instanceOf: Error, message: `item "${obj.name}" is not present in list` })
})

test('accumulator(validator).method(name, obj) validate the obj', t => {
  const name = 'token'
  const obj = 'blablabla'
  const validator = sinon.spy((p) => typeof(p) === 'string')
  t.context = accumulator('item', 'list', validator)
  t.context.method(name, obj)
  t.is(t.context.method(name), obj)
  t.true(validator.calledWith(obj));
  t.true(validator.returned(true));
})

// test('accumulator(validator).method(name, obj) throws error if obj is not valid', t => {
//   const name = 'obj'
//   const obj = 1
//   const validator = (p) => typeof(p) === 'string'
//   t.context = accumulator(validator)
//   t.throws(() => t.context.method(name, obj), { instanceOf: Error, message: `value for item "${name}" should not be empty` })
// })
