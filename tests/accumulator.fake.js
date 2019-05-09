const sinon = require('sinon')

function method() {}
function getter() {}
const validator = sinon.spy((p) => typeof(p) === 'string')

const accumulator = sinon.fake.returns({ method, getter })

module.exports = { method, getter, validator, accumulator }
