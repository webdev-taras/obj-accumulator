const { Accumulator } = require('../index')

const service = new Accumulator()

service['common'] = { id: 1, title: 'common service'}
service['main'] = { id: 2, title: 'main service'}
service['my-first-service'] = { id: 3, title: 'my first service'}

console.log('main service', service['main'])

const names = Object.keys(service)
console.log('names', names)
