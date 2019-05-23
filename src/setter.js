function setter(validator, itemName, listName) {
  return (target, prop, value) => {
    if (target.hasOwnProperty(prop)) {
      throw new Error(`${itemName} "${prop}" already present in ${listName}`)
    }
    if (validator && !validator(value)) {
      throw new Error(`value for ${itemName} "${prop}" is not valid`)
    }
    target[prop] = value
    return true
  }
}

module.exports = setter
