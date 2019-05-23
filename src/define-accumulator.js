module.exports = (accumulator, accumulatorFactory, listFactory) => {
  return function defineAccumulator(obj, params) {
    const {
      validator,
      item = 'item',
      list,
      useProxy = false
    } = params
    const listName = list || item+'s'
    const createAccumulator = (useProxy) ? accumulatorFactory : accumulator
    const storage = createAccumulator(validator, item, listName)

    const listFn = (useProxy)
      ? listFactory(storage)
      : storage.list

    return Object.defineProperties(obj, {
      [item]: { value: storage, enumerable: false },
      [listName]: { get: listFn, enumerable: false },
    })
  }
}
