const assert = require('assert')
const chunk = require('lodash/chunk')
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
    }),
    batchInsert: (operation, { model }) => {

        const rows = operation.payload.rows.map(row => {
            return parseData(row, { model })
        })

        let fields = {}

        rows.forEach(row => {
            const keys = Object.keys(row)
            keys.forEach(key => {
                fields[key] = true
            })
        })

        fields = Object.keys(fields)

        const escaped_fields = fields.map(field => '`' + field + '`')

        const valueObjects = rows.map(row =>
            fields.map(field =>
                row.hasOwnProperty(field) ? row[field] : null
            )
        )

        return {
            query: `INSERT INTO ${model.tableName} (${escaped_fields.join(', ')}) VALUES ?`,
            bindings: [
                valueObjects
            ]
        }
    }
}

const operationToStatement = ctx => operation => {

    const { modelId, data } = operation.payload
    const model = ctx.schema.ModelDatas[modelId]

    assert(model, `model ${modelId} not found`)

    assert(model.tableName, `${modelId}.tableName not defined`)

    const transformer = transformers[operation.type]

    return transformer(operation, { model })
}

const combineOperations = () => operations => {

    const data = operations.reduce((result, operation) => {

        if (operation.type === 'insert') {
            const combineOperationKey = [operation.payload.modelId, 'insert'].join(':')
            let combineOperation = result.combinedDatas[combineOperationKey]

            if (!combineOperation) {

                combineOperation = {
                    type: 'batchInsert',
                    payload: {
                        modelId: operation.payload.modelId,
                        rows: []
                    }
                }

                result.combinedDatas[combineOperationKey] = combineOperation
                result.combined.push(combineOperationKey)
            }

            combineOperation.payload.rows.push(operation.payload.data)
            return result
        }

        result.operations.push(operation)
        return result
    }, {
        operations: [],
        combinedDatas: {},
        combined: []
    })

    combined = data.combined
        .reduce((result, key) => {
            const operation = data.combinedDatas[key]

            // When it's type of batchInsert
            // Split the operation into separate 1000 row operations due to MySQL limitations
            if (operation.type === 'batchInsert') {
                const chunks = chunk(operation.payload.rows, 1000)

                const operations = chunks.map(chunk => ({
                    type: 'batchInsert',
                    payload: {
                        modelId: operation.payload.modelId,
                        rows: chunk
                    }
                }))

                return [
                    ...result,
                    ...operations
                ]
            }

            result.push(operation)

            return result

        }, [])

    return [
        ...data.operations,
        ...combined
    ]
}

const createStatements = ctx => (transaction, { combine = false } = { combine: false }) => {

    let { operations } = transaction

    if (combine) {
        operations = combineOperations(ctx)(operations)
    }

    return operations.map(operation =>
        operationToStatement(ctx)(operation)
    )
}

module.exports = createStatements