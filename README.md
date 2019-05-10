# obj-accumulator

Provides safe and reliable way to accumulate and store objects in storage not reachable outside.

Adding object into storage can be restricted by validation (e.g. instanceof, typeof, duck typing...) in order to be sure if all objects in storage are the same type.

## Install

> Install on Node.JS with [npm](https://www.npmjs.com/)

```bash
$ npm install --save webdev-taras/obj-accumulator
```

## Usage

Just required function **defineAccumulator** from module:
```javascript
const { defineAccumulator } = require('obj-accumulator')
```
Then we can define *method* and *getter* for some object, for example **app**, in order to collect modules, services, etc.:
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
```
And get the list of names (of services):
```javascript
const names = app.services
names.forEach(name => {
  const { id, title } = app.service(name)
  console.log(id, title)
})
```
Or even tranform name list to whole list of services if it needed:
```javascript
const services = app.services.map(name => app.service(name))
```

## API

Two ways are provided to use `obj-accumulator` functionality:
- add apropriate properties to some object using **defineAccumulator()**
- receive functions *method* and *getter* as a result of calling **accumulator()** and use them separately

### defineAccumulator(object, validator, method-name, \[getter-name\])

> Attachs two properties to **object**: "method-name" and "getter-name".
If "getter-name" is not passed then uses plural form of "method-name" (+"s")

```javascript
const { defineAccumulator } = require('obj-accumulator')
const app = {}

defineAccumulator(app, isObject, 'service', 'services')
// or
defineAccumulator(app, isObject, 'service')

// as a result - new properties:
// app.service(name, object)
// app.services
```
> Second argument `validator` (e.g. isObject) is a function takes a value as the only argument, returns true if the value is valid and false otherwise. Here is some useful examples with use cases:
```javascript
Array.isArray
// defineAccumulator(storage, 'vector', 'list', Array.isArray)

const isTypeOf = (typeName) =>
  (value) => typeof(value) === typeName
// defineAccumulator(storage, 'token', 'tokens', isTypeOf('string'))

const isInstanceOf = (className) =>
  (value) => value instanceof className
// defineAccumulator(app, 'service', '', isInstanceOf(MyService))
```
Also you can use validation functions from widely used libraries.

### accumulator(\[validator\], \[item-name\], \[list-name\])

> Returns the object with two functions { method, getter } which provide access to storage

```javascript
const { accumulator } = require('obj-accumulator')
const { method, getter } = accumulator()
```

### method(name, object)

> Adds to storage passed object (by name) and return it

```javascript
method('common', { id: 1, title: 'common service'})
method('main', { id: 2, title: 'main service'})
method('my-first-service', { id: 3, title: 'my first service'})

method('main')
// result: { id: 2, title: 'main service'}
```

### getter()

> Returns the list of object names

```javascript
getter()
// result: ['common', 'main', 'my-first-service']
```

## License

MIT © [Taras Panasyuk](sumy.taras@gmail.com)
