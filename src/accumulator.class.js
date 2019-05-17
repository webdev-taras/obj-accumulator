class Accumulator {
  constructor(validator = isNotEmpty, itemName = 'item', listName = 'list') {
    const handler = {
      get: (target, prop) => {
        if (!target.hasOwnProperty(prop)) {
          throw new Error(`${itemName} "${prop}" is not present in ${listName}`)
        }
        return target[prop]
      },
      set: (target, prop, value) => {
        if (target.hasOwnProperty(prop)) {
          throw new Error(`${itemName} "${prop}" already present in ${listName}`)
        }
        if (validator && !validator(value)) {
          throw new Error(`value for ${itemName} "${prop}" is not valid`)
        }
        target[prop] = value
        return true
      },
      deleteProperty() {
        return false
      },
    }
    return new Proxy(this, handler)
  }
}

function isNotEmpty(obj) {
  return (obj != undefined)
}

module.exports = (...params) => {
  return new Accumulator(...params)
}

module.exports.Accumulator = Accumulator
