module.exports = {
  accumulator,
  defineAccumulator
}

function defineAccumulator(obj, methodName, getterNameParam) {
  const getterName = getterNameParam || methodName+'s';
  const { method, getter } = accumulator();
  Object.defineProperty(obj, methodName, { value: method })
  Object.defineProperty(obj, getterName, { get: getter })
}

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
