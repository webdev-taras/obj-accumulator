module.exports = accumulator

function accumulator() {
  const storage = {}
  return { method, getter }

  function method(name, obj) {
    if (obj) {
      storage[name] = obj
    }
    return storage[name]
  }
  
  function getter() {
    return Object.keys(storage)
  }
}
