const isClassFn = require('is-class-function')

function isNotEmpty(obj) {
  return (obj != undefined)
}

function isInstanceOf(ctr) {
  return function(obj) {
    return (obj instanceof ctr)
  }
}

function getValidator(validator) {
  return (typeof validator !== 'function')
    ? isNotEmpty
    : isClassFn(validator)
      ? isInstanceOf(validator)
      : validator
}

module.exports = getValidator
