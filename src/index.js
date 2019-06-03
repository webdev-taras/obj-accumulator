const accumulator = require('./accumulator')
const accumulatorFactory = require('./accumulator.class')
const list = require('./list')
const defineAccumulator = require('./define-accumulator')(accumulator, accumulatorFactory, list)
const { Accumulator } = accumulatorFactory

module.exports = {
  accumulator,
  Accumulator,
  defineAccumulator,
}
