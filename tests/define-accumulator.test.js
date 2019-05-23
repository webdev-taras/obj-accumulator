const test = require('ava')
const defineAccumulatorFactory = require('../src/define-accumulator')
const { item, list, validator, accumulator, accumulatorFactory } = require('./accumulator.fake')

const checkProperties = (t, itemName, listNameParam) => {
  const listName = listNameParam || itemName+'s'
  const storage = {}

  const defineAccumulator = defineAccumulatorFactory(accumulator)
  const params = { item: itemName, list: listNameParam }
  defineAccumulator(storage, params)
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
  const result = defineAccumulator(storage, { validator, item: 'module' })

  t.true(accumulator.calledWith(validator, 'module', 'modules'));
  t.true(accumulator.returned(item));
  t.is(result, storage)
})

test('defineAccumulator(storage, null, "module", "moduleList", true) adds one property to storage', t => {
  const item = 'module'
  const list = 'moduleList'
  const storage = {}

  const defineAccumulator = defineAccumulatorFactory(accumulator, accumulatorFactory)
  const params = { validator, item, list, useProxy: true }
  defineAccumulator(storage, params)
  t.true(storage.hasOwnProperty(item))
  t.true(storage.hasOwnProperty(list))

  const itemNameProps = Object.getOwnPropertyDescriptor(storage, item)
  t.not(itemNameProps.value, item)
  t.false(itemNameProps.writable)
  t.false(itemNameProps.enumerable)
})

test('defineAccumulator(storage, validator, "module", "modules", true) calls class Accumulator', t => {
  const storage = {}
  const defineAccumulator = defineAccumulatorFactory(() => {}, accumulatorFactory)
  const params = { validator, item: 'module', list: 'modules', useProxy: true }
  const result = defineAccumulator(storage, params)

  t.true(accumulator.calledWith(validator, 'module', 'modules'));
  t.true(accumulator.returned(item));
  t.is(result, storage)
})
