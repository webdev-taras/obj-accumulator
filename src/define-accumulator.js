module.exports = (accumulator, accumulatorFactory) => {
  return function defineAccumulator(obj, validator, itemName, listNameParam, useProxy = false) {
    const listName = listNameParam || itemName+'s'
    const createAccumulator = (useProxy) ? accumulatorFactory : accumulator
    const item = createAccumulator(validator, itemName, listName)

    if (!useProxy) {
      Object.defineProperty(obj, listName, { get: item.list, enumerable: false })
    }
    return Object.defineProperty(obj, itemName, { value: item, enumerable: false })
  }
}
