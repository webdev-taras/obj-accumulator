function list(storage) {
  return function() {
    return Object.keys(storage)
  }
}

module.exports = list
