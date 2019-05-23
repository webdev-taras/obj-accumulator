module.exports = (accumulator, accumulatorFactory) => {
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
      ? () => Object.keys(storage)
      : storage.list

    return Object.defineProperties(obj, {
      [item]: { value: storage, enumerable: false },
      [listName]: { get: listFn, enumerable: false },
    })
  }
}
