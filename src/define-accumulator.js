module.exports = (accumulator) => {
  return function defineAccumulator(obj, validator, methodName, getterNameParam) {
    const getterName = getterNameParam || methodName+'s'
    const { method, getter } = accumulator(validator, methodName, getterName)
    Object.defineProperty(obj, methodName, { value: method })
    Object.defineProperty(obj, getterName, { get: getter })
  }
}
