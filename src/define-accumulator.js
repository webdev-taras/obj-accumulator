module.exports = (accumulator, accumulatorFactory) => {
  return function defineAccumulator(obj, params) {
    const {
      validator,
      item,
      list,
      useProxy = false
    } = params
    const listName = list || item+'s'
    const createAccumulator = (useProxy) ? accumulatorFactory : accumulator
    const storage = createAccumulator(validator, item, listName)

    if (!useProxy) {
      Object.defineProperty(obj, listName, { get: storage.list, enumerable: false })
    }
    return Object.defineProperty(obj, item, { value: storage, enumerable: false })
  }
}
