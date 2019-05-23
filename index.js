const accumulator = require('./src/accumulator')
const accumulatorFactory = require('./src/accumulator.class')
const { Accumulator } = accumulatorFactory
const defineAccumulator = require('./src/define-accumulator')(accumulator, accumulatorFactory)

module.exports = {
  accumulator,
  Accumulator,
  defineAccumulator,
}
