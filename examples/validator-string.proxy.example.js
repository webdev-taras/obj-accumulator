const { Accumulator } = require('../index')

const isTypeOf = (typeName) =>
  (value) => typeof(value) === typeName

const token = new Accumulator({
  validator: isTypeOf('string')
})

token['my-first-token'] = 'my first token'
token['common'] = 'common token'
token['main'] = 'main token'

try {
  token['any number'] = 123
} catch(err) {
  console.error(err.message)
}
  
try {
  token['some object'] = {}
} catch(err) {
  console.error(err.message)
}
  
console.log(delete token['common'])
  
console.log('common', token['common'])

try {
  token['main'] = 'another main token'
} catch(err) {
  console.error(err.message)
}

console.log('main', token['main'])
