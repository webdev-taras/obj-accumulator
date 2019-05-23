function getter(itemName, listName) {
  return (target, prop) => {
    if (!target.hasOwnProperty(prop)) {
      throw new Error(`${itemName} "${prop}" is not present in ${listName}`)
    }
    return target[prop]
  }
}

module.exports = getter
