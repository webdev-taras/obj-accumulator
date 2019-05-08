module.exports = accumulator

function accumulator(itemName = 'item', listName = 'list') {
  const storage = {}
  return { method, getter }

  function method(name, obj) {
    if (arguments.length > 1) {
      if (storage.hasOwnProperty(name)) {
        throw new Error(`${itemName} "${name}" already present in ${listName}`)
      }
      if (obj == undefined) { // if empty obj
        throw new Error(`value for ${itemName} "${name}" should not be empty`)
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
