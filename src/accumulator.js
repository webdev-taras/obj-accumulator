const getValidator = require('./get-validator')
const getter = require('./getter')
const setter = require('./setter')
const list = require('./list')

function accumulator(validator, itemName = 'item', listName = 'list') {
  const storage = {}
  const getProp = getter(itemName, listName)
  const setProp = setter(getValidator(validator), itemName, listName)

  function item(name, obj) {
    if (arguments.length > 1) {
      setProp(storage, name, obj)
      return storage[name]
    } else {
      return getProp(storage, name)
    }
  }

  item.list = list(storage)
  return item
}

module.exports = accumulator
