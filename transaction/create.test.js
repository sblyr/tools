const expect = require('expect')
const create = require('./create')

describe('Transaction', () => {

    describe('#create()', () => {

        it("should create a transaction", () => {

            const schema = {
                ModelDatas: {
                    Event: {
                        id: "Event",
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
                            },
                            {
                                id: "virtualName",
                                type: "text",
                                virtual: true
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
                ],
                "formula/Person.virtualName": [
                    () => ({ firstName, lastName }) => [firstName, lastName].join(' ')
                ]
            }

            const ctx = { schema, hooks }

            const result = create(ctx)({
                modelId: 'Person',
                data: {
                    firstName: 'Luke',
                    lastName: 'Skywalker'
                }
            })

            console.log(JSON.stringify(result, null, 2))

            expect(result).toEqual({
                operations: [
                    {
                        type: "insert",
                        payload: {
                            modelId: "Person",
                            data: {
                                id: expect.anything(),
                                firstName: "Luke",
                                lastName: "Skywalker",
                                name: "Luke Skywalker"
                            }
                        }
                    },
                    {
                        type: "insert",
                        payload: {
                            modelId: "Event",
                            data: {
                                type: "Person:created",
                                entityType: "Person",
                                entityId: expect.anything(),
                                id: expect.anything(),
                                payload: {
                                    entityType: "Person",
                                    entityId: expect.anything(),
                                    entity: {
                                        id: expect.anything(),
                                        firstName: "Luke",
                                        lastName: "Skywalker",
                                        name: "Luke Skywalker"
                                    }
                                }
                            }
                        }
                    }
                ]
            })
        })
    })
})