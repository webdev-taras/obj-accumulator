module.exports = accumulator

function accumulator(itemName = 'item', listName = 'list', validator = isNotEmpty) {
  const storage = {}
  return { method, getter }

  function method(name, obj) {
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
  
  function getter() {
    return Object.keys(storage)
  }
}

function isNotEmpty(obj) {
  return (obj != undefined)
}
