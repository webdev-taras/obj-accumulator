module.exports = (accumulator, Accumulator) => {
  return function defineAccumulator(obj, validator, itemName, listNameParam, useProxy = false) {
    const listName = listNameParam || itemName+'s'
    const item = (useProxy)
      ? new Accumulator(validator, itemName, listName)
      : accumulator(validator, itemName, listName)

    return Object.defineProperties(obj, {
      [itemName]: { value: item, enumerable: false },
      [listName]: { get: item.list, enumerable: false },
    })
  }
}
