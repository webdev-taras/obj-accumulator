const test = require('ava')
const defineAccumulatorFactory = require('../src/define-accumulator')
const { item, list, validator, accumulator, accumulatorFactory, proxy, listFactory } = require('./accumulator.fake')

const checkProperties = (t, itemNameParam, listNameParam, useProxy = false) => {
  const itemName = itemNameParam || 'item'
  const listName = listNameParam || itemName+'s'
  const storage = {}

  const defineAccumulator = defineAccumulatorFactory(accumulator, accumulatorFactory, listFactory)
  const params = { item: itemNameParam, list: listNameParam, useProxy }
  defineAccumulator(storage, params)
  t.true(storage.hasOwnProperty(itemName))
  t.true(storage.hasOwnProperty(listName))

  const itemNameProps = Object.getOwnPropertyDescriptor(storage, itemName)
  const result = useProxy ? proxy : item
  t.is(itemNameProps.value, result)
  t.false(itemNameProps.writable)
  t.false(itemNameProps.enumerable)

  const listNameProps = Object.getOwnPropertyDescriptor(storage, listName)
  t.is(listNameProps.get, list)
  t.false(!!listNameProps.writable)
  t.false(listNameProps.enumerable)
}

test('defineAccumulator(storage, null, "module", "moduleList") adds two properties to storage', checkProperties, 'module', 'moduleList')

test('defineAccumulator(storage, null, "module") adds two properties to storage', checkProperties, 'module')

test('defineAccumulator(storage) adds two properties to storage', checkProperties)

test('defineAccumulator(storage, validator, "module") calls accumulator()', t => {
  const storage = {}
  const defineAccumulator = defineAccumulatorFactory(accumulator)
  const result = defineAccumulator(storage, { validator, item: 'module' })

  t.true(accumulator.calledWith(validator, 'module', 'modules'));
  t.is(result, storage)
})

test('defineAccumulator(storage, null, "module", "moduleList", true) adds two properties to storage', checkProperties, 'module', 'moduleList', true)

test('defineAccumulator(storage, validator, "module", "modules", true) calls class Accumulator', t => {
  const storage = {}
  const defineAccumulator = defineAccumulatorFactory(() => {}, accumulatorFactory, listFactory)
  const params = { validator, item: 'module', list: 'modules', useProxy: true }
  const result = defineAccumulator(storage, params)

  t.true(listFactory.calledWith(proxy));
  t.true(accumulatorFactory.calledWith(validator, 'module', 'modules'));
  t.is(result, storage)
})
