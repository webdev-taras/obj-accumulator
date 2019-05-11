const accumulator = require('./src/accumulator')
const defineAccumulator = require('./src/define-accumulator')(accumulator)

module.exports = {
  accumulator,
  defineAccumulator
}
