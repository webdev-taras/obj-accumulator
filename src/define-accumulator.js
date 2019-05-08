module.exports = (accumulator) => {
  return function defineAccumulator(obj, methodName, getterNameParam) {
    const getterName = getterNameParam || methodName+'s'
    const { method, getter } = accumulator(methodName, getterName)
    Object.defineProperty(obj, methodName, { value: method })
    Object.defineProperty(obj, getterName, { get: getter })
  }
}
