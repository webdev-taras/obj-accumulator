const test = require('ava')
const defineAccumulatorFactory = require('../src/define-accumulator')
const { item, list, validator, accumulator } = require('./accumulator.fake')

const checkProperties = (t, itemName, listNameParam) => {
  const listName = listNameParam || itemName+'s'
  const storage = {}

  const defineAccumulator = defineAccumulatorFactory(accumulator)
  defineAccumulator(storage, null, itemName, listNameParam)
  t.true(storage.hasOwnProperty(itemName))
  t.true(storage.hasOwnProperty(listName))

  const itemNameProps = Object.getOwnPropertyDescriptor(storage, itemName)
  t.is(itemNameProps.value, item)
  t.false(itemNameProps.writable)
  t.false(itemNameProps.enumerable)

  const listNameProps = Object.getOwnPropertyDescriptor(storage, listName)
  t.is(listNameProps.get, list)
  t.false(!!listNameProps.writable)
  t.false(listNameProps.enumerable)
}

test('defineAccumulator(storage, null, "module", "moduleList") adds two properties to storage', checkProperties, 'module', 'moduleList')

test('defineAccumulator(storage, null, "module") adds two properties to storage', checkProperties, 'module')

test('defineAccumulator(storage, validator, "module") calls accumulator()', t => {
  const storage = {}
  const defineAccumulator = defineAccumulatorFactory(accumulator)
  defineAccumulator(storage, validator, 'module')

  t.true(accumulator.calledWith(validator, 'module', 'modules'));
  t.true(accumulator.returned(item));
})
