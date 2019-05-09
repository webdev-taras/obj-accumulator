const test = require('ava')
const defineAccumulatorFactory = require('../src/define-accumulator')
const { method, getter, accumulator } = require('./accumulator.fake')

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

test('defineAccumulator() calls accumulator()', t => {
  const storage = {}
  const defineAccumulator = defineAccumulatorFactory(accumulator)
  defineAccumulator(storage, 'module')

  t.true(accumulator.calledWith('module', 'modules'));
  t.true(accumulator.returned({ method, getter }));
})
