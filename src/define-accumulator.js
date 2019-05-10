module.exports = (accumulator) => {
  return function defineAccumulator(obj, validator, itemName, listNameParam) {
    const listName = listNameParam || itemName+'s'
    const { item, list } = accumulator(validator, itemName, listName)
    Object.defineProperty(obj, itemName, { value: item })
    Object.defineProperty(obj, listName, { get: list })
  }
}
