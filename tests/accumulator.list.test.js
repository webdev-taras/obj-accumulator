const test = require('ava')
const accumulator = require('../src/accumulator')
const arr = require('./data.mock')

test.beforeEach(t => {
  t.context = accumulator()
})

test('accumulator().getter() returns ampty array from the beginning', t => {
  t.deepEqual(t.context.getter(), [])
})

test('accumulator().getter() returns array of accumulated objects', t => {
  arr.forEach(obj => t.context.method(obj.name, obj))
  const names = arr.map(obj => obj.name)
  t.deepEqual(t.context.getter(), names)
})
