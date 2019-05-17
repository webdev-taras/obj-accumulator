const { isNotEmpty } = require('./validators')
const getter = require('./getter')
const setter = require('./setter')

class Accumulator {
  constructor(validator = isNotEmpty, itemName = 'item', listName = 'list') {
    const handler = {
      get: getter(itemName, listName),
      set: setter(validator, itemName, listName),
      deleteProperty() {
        return false
      },
    }
    return new Proxy(this, handler)
  }
}

module.exports = (...params) => {
  return new Accumulator(...params)
}

module.exports.Accumulator = Accumulator
