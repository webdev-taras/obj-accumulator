const test = require('ava')
const getValidator = require('../src/get-validator')

test('getValidator(validator) checks if validator is a function', t => {
  const validator = () => {}
  t.is(getValidator(validator), validator)
  t.not(getValidator('test'), validator)
})

test('getValidator(Class) checks if validator is a class-function', t => {
  class Empty {}
  const validator = getValidator(Empty)
  t.true(validator(new Empty()))
  t.false(validator({}))
})
