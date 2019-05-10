const sinon = require('sinon')

function item() {}
function list() {}
const validator = sinon.spy((p) => typeof(p) === 'string')

const accumulator = sinon.fake.returns({ item, list })

module.exports = { item, list, validator, accumulator }
