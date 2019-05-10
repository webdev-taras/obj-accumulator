module.exports = (accumulator) => {
  return function defineAccumulator(obj, methodName, getterNameParam, validator) {
    const getterName = getterNameParam || methodName+'s'
    const { method, getter } = accumulator(methodName, getterName, validator)
    Object.defineProperty(obj, methodName, { value: method })
    Object.defineProperty(obj, getterName, { get: getter })
  }
}
