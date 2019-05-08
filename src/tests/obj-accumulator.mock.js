const sinon = require('sinon')

function method() {}
function getter() {}

const accumulator = sinon.spy((itemName = 'item', listName = 'list') => {
  return { method, getter }
})

module.exports = { method, getter, accumulator }
