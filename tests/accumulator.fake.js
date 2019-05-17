const sinon = require('sinon')

function item() {}
item.list = list
function list() {}
const validator = sinon.spy((p) => typeof(p) === 'string')

const accumulator = sinon.fake.returns(item)

class Accumulator {
  constructor(...params) {
    const { list } = accumulator(...params)
    this.list = list
  }
}

module.exports = { item, list, validator, accumulator, Accumulator }
