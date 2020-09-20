const assert = require('assert')
const uuid = require('uuid')

const defaultFieldTypeResolver = () => () => null

const getFieldTypeResolver = type => {

    const fieldTypeResolvers = {
        id: () => ({ id }) => id ? id : uuid.v4(),
        updatedTime: () => () => new Date(),
        createdTime: () => () => new Date()
    }

    return fieldTypeResolvers[type] || defaultFieldTypeResolver
}

const getData = ctx => (model, input) => {

    const { hooks = {} } = ctx

    return model.fields.reduce((data, field) => {

        const { id, type } = field

        const hookId = [model.id, field.id].join('.')

        const resolverCtx = { model, field }

        let value = null

        const fieldTypeResolver = getFieldTypeResolver(type)
        
        value = fieldTypeResolver(ctx)(data, resolverCtx)

        data[id] = value

        const defaultValueResolver = hooks['defaultValue/' + hookId]
            ? hooks['defaultValue/' + hookId]
            : null

        if (defaultValueResolver) {
            value = defaultValueResolver(ctx)(data, resolverCtx)
            data[id] = value
        }

        data[id] = value

        if (input[id]) {
            data[id] = input[id]
        }

        const formulaResolver = hooks['formula/' + hookId]
            ? hooks['formula/' + hookId]
            : null

        if (formulaResolver) {
            value = formulaResolver(ctx)(data, resolverCtx)
            data[id] = value
        }

        return data
    }, {})
}

const create = ctx => ({ modelId, data: input = {} }) => {

    let operations = []

    const model = ctx.schema.ModelDatas[modelId]

    assert(model, `model ${modelId} not found`)

    const data = getData(ctx)(model, input)

    operations.push({
        type: 'insert',
        payload: {
            modelId,
            data
        }
    })

    if (modelId !== "Event") {

        const createEventTransaction = create(ctx)({
            modelId: "Event",
            data: {
                type: `${modelId}:created`,
                entityType: modelId,
                entityId: data.id,
                payload: {
                    entityType: modelId,
                    entityId: data.id,
                    entity: data
                }
            }
        })

        operations = [
            ...operations,
            ...createEventTransaction.operations
        ]
    }

    return {
        operations
    }
}

module.exports = create