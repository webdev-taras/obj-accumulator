const { isNotEmpty } = require('./validators')
const getter = require('./getter')
const setter = require('./setter')

class Accumulator {
  constructor(params = {}) {
    const { validator = isNotEmpty, item = 'item', list = 'list' } = params
    const handler = {
      get: getter(item, list),
      set: setter(validator, item, list),
      deleteProperty() {
        return false
      },
    }
    return new Proxy(this, handler)
  }
}

module.exports = (validator, item, list) => {
  return new Accumulator({ validator, item, list })
}

module.exports.Accumulator = Accumulator
