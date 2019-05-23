const { accumulator } = require('../index')

const service = accumulator()

service('common', { id: 1, title: 'common service'})
service('main', { id: 2, title: 'main service'})
service('my-first-service', { id: 3, title: 'my first service'})

console.log('main service', service('main'))

const names = service.list()
console.log('names', names)
