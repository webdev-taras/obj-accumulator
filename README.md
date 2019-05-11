# obj-accumulator

Provides reliable way to accumulate and store objects in safe storage not changeable outside.

Adding object into storage can be restricted by validation (e.g. instanceof, typeof, duck typing...) in order to be sure if all objects in storage are the same type.

## Install

> Install on Node.JS with [npm](https://www.npmjs.com/)

```bash
$ npm install --save webdev-taras/obj-accumulator
```

## Usage

Two ways are provided to use `obj-accumulator` functionality:
1. Add apropriate properties to some object using **defineAccumulator()**
2. Receive function as a result of calling **accumulator()** and use it for access to storage

### Use defineAccumulator()

Just required function **defineAccumulator** from module:
```javascript
const { defineAccumulator } = require('obj-accumulator')
```
Then we can define *item* and *list* for some object, for example **app**, in order to collect modules, services, etc.:
```javascript
const app = {}

defineAccumulator(app, isObject, 'module')
// or
defineAccumulator(app, isObject, 'service')
```
For example, `isObject` - the function for validate that value (waht will be added to the storage) is object.

Further we can add *services* by *name* to our *app*:
```javascript
app.service('common', { id: 1, title: 'common service'})
app.service('main', { id: 2, title: 'main service'})
app.service('my-first-service', { id: 3, title: 'my first service'})
```
Also we can get *service* by name:
```javascript
const mainService = app.service('main')
// result: { id: 2, title: 'main service'}
```
And get the list of names (of services):
```javascript
const names = app.services
// result: ['common', 'main', 'my-first-service']
names.forEach(name => {
  const { id, title } = app.service(name)
  console.log(id, title)
})
```
Or even tranform name list to whole list of services if it needed:
```javascript
const services = app.services.map(name => app.service(name))
```

### Use accumulator()

Second option is to receive function as a result of calling **accumulator()** and use it for access to storage:

```javascript
const { accumulator } = require('obj-accumulator')
const service = accumulator(isObject)
```

Further we can add *services* by *name*:

```javascript
service('common', { id: 1, title: 'common service'})
service('main', { id: 2, title: 'main service'})
service('my-first-service', { id: 3, title: 'my first service'})
```
and get *service* by name:
```javascript
service('main')
// result: { id: 2, title: 'main service'}
```

To get the list of names need to call list() method:

```javascript
service.list()
// result: ['common', 'main', 'my-first-service']
```


## API

### defineAccumulator(object, validator, item-name, \[list-name\])

> Attaches two properties to **object**: "item-name" and "list-name".
If "list-name" is not passed then uses plural form of "item-name" (+"s")

```javascript
const { defineAccumulator } = require('obj-accumulator')
const app = {}

defineAccumulator(app, isObject, 'service', 'services')
// or
defineAccumulator(app, isObject, 'service')

// as a result, new properties are added:
// app.service(name, object)
// app.services
```
> Second argument `validator` (e.g. isObject) is a function takes a value as the only argument, returns true if the value is valid and false otherwise. Here is some useful examples with use cases:
```javascript
Array.isArray
// defineAccumulator(storage, Array.isArray, 'vector', 'list')

const isTypeOf = (typeName) =>
  (value) => typeof(value) === typeName
// defineAccumulator(storage, isTypeOf('string'), 'token', 'tokens')

const isInstanceOf = (className) =>
  (value) => value instanceof className
// defineAccumulator(app, isInstanceOf(MyService), 'service')
```
Also you can use validation functions from widely used libraries.

### accumulator(\[validator\], \[item-name\], \[list-name\])

> Returns the function to provide access to storage

```javascript
const { accumulator } = require('obj-accumulator')
const service = accumulator()
```

### \<item\>(name, object)

> Adds to storage passed object (by name) and return it

```javascript
service('main', { id: 2, title: 'main service'})
service('main')
// result: { id: 2, title: 'main service'}
```

### \<item\>.list()

> Returns the list of object names

```javascript
service.list()
// result: ['common', 'main', 'my-first-service']
```

## License

MIT © [Taras Panasyuk](sumy.taras@gmail.com)
