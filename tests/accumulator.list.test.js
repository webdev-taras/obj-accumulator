const test = require('ava')
const accumulator = require('../src/accumulator')
const arr = require('./data.mock')

test.beforeEach(t => {
  t.context.item = accumulator()
  t.context.list = t.context.item.list
})

test('accumulator().list() returns ampty array from the beginning', t => {
  t.deepEqual(t.context.list(), [])
})

test('accumulator().list() returns array of accumulated objects', t => {
  arr.forEach(obj => t.context.item(obj.name, obj))
  const names = arr.map(obj => obj.name)
  t.deepEqual(t.context.list(), names)
})
