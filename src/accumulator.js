module.exports = accumulator

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

function getter(itemName, listName) {
  return (target, prop) => {
    if (!target.hasOwnProperty(prop)) {
      throw new Error(`${itemName} "${prop}" is not present in ${listName}`)
    }
    return target[prop]
  }
}

function setter(validator, itemName, listName) {
  return (target, prop, value) => {
    if (target.hasOwnProperty(prop)) {
      throw new Error(`${itemName} "${prop}" already present in ${listName}`)
    }
    if (validator && !validator(value)) {
      throw new Error(`value for ${itemName} "${prop}" is not valid`)
    }
    target[prop] = value
  }
}

function isNotEmpty(obj) {
  return (obj != undefined)
}
