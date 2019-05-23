const accumulator = require('./src/accumulator')
const accumulatorFactory = require('./src/accumulator.class')
const list = require('./list')
const defineAccumulator = require('./src/define-accumulator')(accumulator, accumulatorFactory, list)
const { Accumulator } = accumulatorFactory

module.exports = {
  accumulator,
  Accumulator,
  defineAccumulator,
}
