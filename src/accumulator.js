module.exports = accumulator

function accumulator(validator = isNotEmpty, itemName = 'item', listName = 'list') {
  const storage = {}
  return { item, list }

  function item(name, obj) {
    if (arguments.length > 1) {
      if (storage.hasOwnProperty(name)) {
        throw new Error(`${itemName} "${name}" already present in ${listName}`)
      }
      if (validator && !validator(obj)) {
        throw new Error(`value for ${itemName} "${name}" is not valid`)
      }
      storage[name] = obj
    } else {
      if (!storage.hasOwnProperty(name)) {
        throw new Error(`${itemName} "${name}" is not present in ${listName}`)
      }
    }
    return storage[name]
  }
  
  function list() {
    return Object.keys(storage)
  }
}

function isNotEmpty(obj) {
  return (obj != undefined)
}
