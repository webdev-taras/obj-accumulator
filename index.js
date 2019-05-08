const accumulator = require('./src/obj-accumulator')
const defineAccumulator = require('./src/define-accumulator')(accumulator)

module.exports = {
  accumulator,
  defineAccumulator
}
