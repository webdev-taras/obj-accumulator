## 0.3.1 / 2019-05-23
- update `README.md`
- add support the validator as a class
- release v0.3.1
- publish on npm@v0.3.1

## 0.3.0 / 2019-05-17
- add `Accumulator` class and use Proxy
- change interface `defineAccumulator`
- do some refactoring

## 0.2.1 / 2019-05-13
- update `README.md`
- `accumulator` returns just `item` as a result
- do refactoring

## 0.2.0 / 2019-05-10
- update `README.md`
- define-accumulator.test refactoring 
- add validation function as a parameter in order to check
  that objects of the same type are being added (can use: instanseof, duck typing, validation...)
- set as a default validation the restriction: cannot add empty object in storage
- test refactoring
- rename functions `method` and `getter` to `item` and `list` accordingly

## 0.1.1 / 2019-05-08
- update `README.md`
- apply DI to `defineAccumulator` function
- add restriction: cannot add object by name already present in storage
- add requirement: throw error if try to get object by name not presented in storage
- add mock for `accumulator` and rewrite unit tests for `defineAccumulator`
- add restriction: cannot add empty object in storage

## 0.0.1 / 2019-05-07
- add `CHANGELOG.md`
- add `README.md`
- export function `accumulator`
- export function `defineAccumulator`
