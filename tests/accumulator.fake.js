const sinon = require('sinon')

function item() {}
item.list = list
function list() {}
const validator = sinon.spy((p) => typeof(p) === 'string')

const accumulator = sinon.fake.returns(item)

module.exports = { item, list, validator, accumulator }
