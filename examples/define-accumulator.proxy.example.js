const { defineAccumulator } = require('../index')

const app = {}

class MyService {
  constructor({ id, title }) {
    this.id = id
    this.title = title
  }
}

defineAccumulator(app, {
  validator: MyService,
  item: 'service',
  useProxy: true,
})

app.service['common'] =  new MyService({ id: 1, title: 'common service'})
app.service['main'] = new MyService({ id: 2, title: 'main service'})
app.service['my-first-service'] = new MyService({ id: 3, title: 'my first service'})

const mainService = app.service['main']
console.log('mainService', mainService)

const names = app.services
console.log('names', names)

names.forEach(name => {
  const { id, title } = app.service[name]
  console.log(id, title)
})

const services = app.services.map(name => app.service[name])
console.log('services', services)
