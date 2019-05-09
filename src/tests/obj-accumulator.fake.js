const sinon = require('sinon')

function method() {}
function getter() {}

const accumulator = sinon.fake.returns({ method, getter })

module.exports = { method, getter, accumulator }
