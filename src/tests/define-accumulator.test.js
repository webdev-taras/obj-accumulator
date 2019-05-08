const test = require('ava')
// const accumulator = require('../obj-accumulator')
const defineAccumulatorFactory = require('../define-accumulator')
const { method, getter, accumulator } = require('./obj-accumulator.mock')

const checkProperties = (t, methodName, getterNameParam) => {
  const getterName = getterNameParam || methodName+'s'
  const storage = {}

  const defineAccumulator = defineAccumulatorFactory(accumulator)
  defineAccumulator(storage, methodName, getterNameParam)
  t.true(storage.hasOwnProperty(methodName))
  t.true(storage.hasOwnProperty(getterName))

  const methodNameProps = Object.getOwnPropertyDescriptor(storage, methodName)
  t.is(methodNameProps.value, method)
  t.false(methodNameProps.writable)

  const getterNameProps = Object.getOwnPropertyDescriptor(storage, getterName)
  t.is(getterNameProps.get, getter)
  t.false(!!getterNameProps.writable)
}

test('defineAccumulator() adds two properties to storage: module() and moduleList', checkProperties, 'module', 'moduleList')

test('defineAccumulator() adds two properties to storage: module() and modules', checkProperties, 'module')
