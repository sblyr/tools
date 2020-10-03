const expect = require('expect')
const create = require('../../transaction/create')
const createStatements = require('./createStatements')

describe('Storage', () => {

    describe('MySQL', () => {

        describe('#createStatements()', () => {

            it("should create statements for a transaction", () => {

                const schema = {
                    ModelDatas: {
                        Event: {
                            id: "Event",
                            tableName: "events",
                            fields: [
                                {
                                    id: "id",
                                    type: "id"
                                },
                                {
                                    id: "type",
                                    type: "text"
                                },
                                {
                                    id: "entityType",
                                    type: "text"
                                },
                                {
                                    id: "entityId",
                                    type: "text"
                                },
                                {
                                    id: "payload",
                                    type: "json"
                                }
                            ]
                        },
                        Person: {
                            id: "Person",
                            tableName: "persons",
                            fields: [
                                {
                                    id: "id",
                                    type: "id"
                                },
                                {
                                    id: "firstName",
                                    type: "text"
                                },
                                {
                                    id: "lastName",
                                    type: "text"
                                },
                                {
                                    id: "name",
                                    type: "text"
                                }
                            ]
                        }
                    },
                    Model: [
                        "Person"
                    ]
                }

                const hooks = {
                    "formula/Person.name": [
                        () => ({ firstName, lastName }) => [firstName, lastName].join(' ')
                    ]
                }

                const ctx = { schema, hooks }

                const transaction = create(ctx)({
                    modelId: 'Person',
                    data: {
                        firstName: 'Luke',
                        lastName: 'Skywalker'
                    }
                })

                const statements = createStatements(ctx)(transaction)

                expect(statements).toMatchObject([
                    {
                        query: 'INSERT INTO persons SET ?',
                        bindings: {
                            id: expect.anything(),
                            firstName: 'Luke',
                            lastName: 'Skywalker',
                            name: 'Luke Skywalker'
                        }
                    },
                    {
                        query: 'INSERT INTO events SET ?',
                        bindings: {
                            id: expect.anything(),
                            type: 'Person:created',
                            entityId: expect.anything(),
                            payload: expect.anything()
                        }
                    }
                ])
            })
        })
    })
})