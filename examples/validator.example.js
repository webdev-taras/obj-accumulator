const { accumulator } = require('../index')

const service = accumulator()

service('number', 123)
service('string', 'test')

try {
  service('null', null)
} catch(err) {
  console.error(err.message)
}
  
try {
  service('undefined', undefined)
} catch(err) {
  console.error(err.message)
}
  
console.log('item ', service('string'))

try {
  console.log(service('null'))
} catch(err) {
  console.error(err.message)
}

service('object', { id: 2, title: 'main service'})

const names = service.list()
console.log('names', names)
