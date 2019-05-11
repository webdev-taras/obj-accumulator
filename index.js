const accumulator = require('./src/accumulator')
const { Accumulator } = require('./src/accumulator.class')
const defineAccumulator = require('./src/define-accumulator')(accumulator, Accumulator)

module.exports = {
  accumulator,
  Accumulator,
  defineAccumulator,
}
