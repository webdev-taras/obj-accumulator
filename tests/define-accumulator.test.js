const test = require('ava')
const defineAccumulatorFactory = require('../src/define-accumulator')
const { method, getter, validator, accumulator } = require('./accumulator.fake')

const checkProperties = (t, methodName, getterNameParam) => {
  const getterName = getterNameParam || methodName+'s'
  const storage = {}

  const defineAccumulator = defineAccumulatorFactory(accumulator)
  defineAccumulator(storage, null, methodName, getterNameParam)
  t.true(storage.hasOwnProperty(methodName))
  t.true(storage.hasOwnProperty(getterName))

  const methodNameProps = Object.getOwnPropertyDescriptor(storage, methodName)
  t.is(methodNameProps.value, method)
  t.false(methodNameProps.writable)

  const getterNameProps = Object.getOwnPropertyDescriptor(storage, getterName)
  t.is(getterNameProps.get, getter)
  t.false(!!getterNameProps.writable)
}

test('defineAccumulator(storage, null, "module", "moduleList") adds two properties to storage', checkProperties, 'module', 'moduleList')

test('defineAccumulator(storage, null, "module") adds two properties to storage', checkProperties, 'module')

test('defineAccumulator(storage, validator, "module") calls accumulator()', t => {
  const storage = {}
  const defineAccumulator = defineAccumulatorFactory(accumulator)
  defineAccumulator(storage, validator, 'module')

  t.true(accumulator.calledWith(validator, 'module', 'modules'));
  t.true(accumulator.returned({ method, getter }));
})
