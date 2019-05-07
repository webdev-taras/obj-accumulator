const accumulator = require('./obj-accumulator')

module.exports = defineAccumulator

function defineAccumulator(obj, methodName, getterNameParam) {
  const getterName = getterNameParam || methodName+'s'
  const { method, getter } = accumulator()
  Object.defineProperty(obj, methodName, { value: method })
  Object.defineProperty(obj, getterName, { get: getter })
}
