module.exports = (accumulator) => {
  return function defineAccumulator(obj, validator, itemName, listNameParam) {
    const listName = listNameParam || itemName+'s'
    const item = accumulator(validator, itemName, listName)

    Object.defineProperty(obj, itemName, { value: item, enumerable: false })
    Object.defineProperty(obj, listName, { get: item.list, enumerable: false })
  }
}
