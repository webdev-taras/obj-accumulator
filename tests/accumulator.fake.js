const { spy, fake } = require('sinon')

function item() {}
item.list = list
function list() {}
const validator = spy((p) => typeof(p) === 'string')

const accumulator = fake.returns(item)
const isNotEmpty = fake.returns(true)

class Accumulator {
  constructor(params = {}) {
    const { validator = isNotEmpty, item = 'item', list = 'list' } = params
    accumulator(validator, item, list)
  }
}

const accumulatorFactory = (validator, item, list) =>
  new Accumulator({ validator, item, list })

module.exports = { item, list, validator, accumulator, accumulatorFactory }
