const { isNotEmpty } = require('./validators')
const getter = require('./getter')
const setter = require('./setter')

function accumulator(validator = isNotEmpty, itemName = 'item', listName = 'list') {
  const storage = {}
  const getProp = getter(itemName, listName)
  const setProp = setter(validator, itemName, listName)

  function item(name, obj) {
    if (arguments.length > 1) {
      setProp(storage, name, obj)
      return storage[name]
    } else {
      return getProp(storage, name)
    }
  }
  
  function list() {
    return Object.keys(storage)
  }

  item.list = list
  return item
}

module.exports = accumulator
