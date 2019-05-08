const test = require('ava')
const accumulator = require('../obj-accumulator')
const defineAccumulatorFactory = require('../define-accumulator')
const arr = require('./data.mock')

const checkProperties = (t, methodName, getterNameParam) => {
  const getterName = getterNameParam || methodName+'s'
  const storage = {}

  const defineAccumulator = defineAccumulatorFactory(accumulator)
  defineAccumulator(storage, methodName, getterNameParam)
  t.true(typeof storage[methodName] === "function")
  t.true(Array.isArray(storage[getterName]))
}

test('defineAccumulator() adds two properties to storage: module() and moduleList', checkProperties, 'module', 'moduleList')

test('defineAccumulator() adds two properties to storage: module() and modules', checkProperties, 'module')

test('defineAccumulator(): storage.modules and storage.module() work as expected', t => {
  const storage = {}
  const defineAccumulator = defineAccumulatorFactory(accumulator)
  defineAccumulator(storage, 'module')
  arr.forEach(obj => storage.module(obj.name, obj))

  const names = arr.map(obj => obj.name)
  t.deepEqual(storage.modules, names)

  const [obj] = arr
  t.deepEqual(storage.module(obj.name), obj)
})
