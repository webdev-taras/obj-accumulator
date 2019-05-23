const { spy, fake } = require('sinon')

function item() {}
item.list = list
function list() {}

const validator = spy((p) => typeof(p) === 'string')
const listFactory = fake.returns(list)
const accumulator = fake.returns(item)
const isNotEmpty = fake.returns(true)

class Accumulator {
  constructor(params = {}) {
    const { validator = isNotEmpty, item = 'item', list = 'list' } = params
    accumulator(validator, item, list)
  }
}

const proxy = new Accumulator()

const accumulatorFactory = fake.returns(proxy)
  

module.exports = { item, list, validator, accumulator, accumulatorFactory, proxy, listFactory }
