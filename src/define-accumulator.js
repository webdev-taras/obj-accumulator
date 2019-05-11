module.exports = (accumulator, Accumulator) => {
  return function defineAccumulator(obj, validator, itemName, listNameParam, useProxy = false) {
    const listName = listNameParam || itemName+'s'
    const item = (useProxy)
      ? new Accumulator(validator, itemName, listName)
      : accumulator(validator, itemName, listName)

    Object.defineProperty(obj, itemName, { value: item, enumerable: false })
    Object.defineProperty(obj, listName, { get: item.list, enumerable: false })
  }
}
