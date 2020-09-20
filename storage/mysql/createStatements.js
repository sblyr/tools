const assert = require('assert')
const scalarTypes = require('./scalarTypes')

const parseData = (data, { model }) => {

    assert(model.fields, `${model.id}.fields not defined`)

    const fields = model.fields

    data = {
        ...data
    }

    fields.forEach(field => {

        const { type } = field

        const scalarType = scalarTypes[type]

        if (!scalarType) {
            return
        }

        let value = data[field.id]

        value = scalarType.parseValue(value)

        data[field.id] = value
    })

    return data
}

const transformers = {
    insert: (operation, { model }) => ({
        query: `INSERT INTO ${model.tableName} SET ?`,
        bindings: parseData(operation.payload.data, { model })
    })
}

const operationToStatement = ctx => operation => {

    const { modelId, data } = operation.payload
    const model = ctx.schema.ModelDatas[modelId]

    assert(model, `model ${modelId} not found`)

    assert(model.tableName, `${modelId}.tableName not defined`)

    const transformer = transformers[operation.type]

    return transformer(operation, { model })
}

const createStatements = ctx => transaction => {

    const { operations } = transaction

    return operations.map(operation =>
        operationToStatement(ctx)(operation)
    )
}

module.exports = createStatements