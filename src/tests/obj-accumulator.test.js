const test = require('ava')
const accumulator = require('../obj-accumulator')
const arr = require('./data.mock')

test.beforeEach(t => {
  t.context = accumulator()
})

test('accumulator() returns object with two functions: { method, getter }', t => {
  t.deepEqual(Object.keys(t.context), ['method', 'getter'])
  t.true(typeof t.context.method === "function")
  t.true(typeof t.context.getter === "function")
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

test('accumulator().method(name) returns object by name if it exists', t => {
  const [obj] = arr
  arr.forEach(obj => t.context.method(obj.name, obj))
  t.deepEqual(t.context.method(obj.name), obj)
})

test('accumulator().method(name) returns undefined if object doesnt exist by name', t => {
  t.is(t.context.method('obj'), undefined)
})
