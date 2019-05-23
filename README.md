# obj-accumulator

Provides reliable way to accumulate and store objects in safe storage not changeable outside. Storage based on common Object but with several restrictions:
- Add object into storage can be restricted by validation (e.g. instanceof, typeof, duck typing...) in order to be sure if all items in storage are the same type.
- If you've already added object to storage using some key then you are not allowed to add another one with the same key (you can not override initial item)
- If you try to get object by key that doesn't present in storage then you receive an error
- Items cannot be removed from the list.

## Install

> Install on Node.JS with [npm](https://www.npmjs.com/)

```bash
npm install obj-accumulator
```

## Usage

Three ways are provided to use `obj-accumulator` functionality:
1. Receive function as a result of calling **accumulator()** and use it for access to storage
2. Create new object as an **Acumulator** instance based on `Proxy`.
3. Add apropriate properties to some object using **defineAccumulator()**

### Using accumulator()

First option is to receive function as a result of calling **accumulator()** and use it for access to storage:

```javascript
const { accumulator } = require('obj-accumulator')
const service = accumulator()
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

### Using class Accumulator

Second option is to create new object as an **Acumulator** instance and use it as a common JS object:

```javascript
const { Accumulator } = require('obj-accumulator')
const service = new Accumulator()
```

Further we can add *services* by *name*:

```javascript
service['common'] = { id: 1, title: 'common service'}
service['main'] = { id: 2, title: 'main service'}
service['my-first-service'] = { id: 3, title: 'my first service'}
```
and get *service* by name:
```javascript
service['main']
// result: { id: 2, title: 'main service'}
```

### Using defineAccumulator()

This option can be useful if you want to define accumulator as a property of some object.
Just required function **defineAccumulator** from module:
```javascript
const { defineAccumulator } = require('obj-accumulator')
```
Then we can define *item* and *list* for some object, for example **app**, in order to collect modules, services, etc.:
```javascript
const app = {}

defineAccumulator(app, MyModule, 'module')
// or
defineAccumulator(app, MyService, 'service')
```
For example, `MyModule` and `MyService` are predefined classes.

Further we can add *services* by *name* to our *app*:
```javascript
app.service('common', new MyService({ id: 1, title: 'common service'}))
app.service('main', new MyService({ id: 2, title: 'main service'}))
app.service('my-first-service', new MyService({ id: 3, title: 'my first service'}))
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

## API

### defineAccumulator(object, params)

> Attaches two properties to **object** by names defined in `item` and `list` parameters.

**params**:

- validator [function]
- item [string]
- list [string]
- useProxy [boolean]

If `list` is not passed then uses plural form of `item` (+"s").
`useProxy` is false by default. if true then will be received not function but instance of Accumulator class.

```javascript
const { defineAccumulator } = require('obj-accumulator')
const app = {}

defineAccumulator(app, {
  validator: isObject,
  item: 'service',
  list: 'services'
})
// or
defineAccumulator(app, {
  validator: isObject,
  item: 'service'
})

// as a result, new properties are added:
// app.service(name, object)
// app.services
```
> Parameter `validator` (e.g. isObject) is a function takes a value as the only argument, returns true if the value is valid and false otherwise.

Here is some useful examples with use cases:
- using - Array.isArray
```javascript
defineAccumulator(storage, {
  validator: Array.isArray,
  item: 'vector',
  list: 'list'
})
```

- validate by type
```javascript
const isTypeOf = (typeName) =>
  (value) => typeof(value) === typeName

defineAccumulator(storage,{
  validator: isTypeOf('string'),
  item: 'token',
  list: 'tokens'
})
```
- validate by class (you can specify just class-function)
```javascript
class MyService() {}

defineAccumulator(app, MyService, 'service')
```
Also you can use validation functions from widely used libraries.

### accumulator(\[validator\], \[item-name\], \[list-name\])

> Returns the function to provide access to storage

```javascript
const { accumulator } = require('obj-accumulator')
const service = accumulator()
```

### \<item\>(name, \[object\])

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

MIT © [Taras Panasyuk](webdev.taras@gmail.com)
