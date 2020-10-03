const assert = require('assert')
const create = require('./create')
const update = require('./update')
const remove = require('./remove')

const types = {
    create,
    update,
    remove
}

module.exports = params => {

    const { type } = params

    const typeFn = types[type]

    assert(typeFn, 'transaction type not found')

    return typeFn(params)
}