const uuid = require('uuid')
const expect = require('expect')
const times = require('lodash/times')
const create = require('../../transaction/create')
const createStatements = require('./createStatements')

describe('Storage', () => {

    describe('MySQL', () => {

        describe('#createStatements()', () => {

            it("should create batch statements for operations that can be combined when combined is set to true", () => {
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

                const ctx = { hooks: {}, schema }

                const operations = [
                    {
                        type: "insert",
                        payload: {
                            modelId: "Person",
                            data: {
                                id: uuid.v4(),
                                firstName: "Luke",
                                lastName: "Skywalker",
                                name: "Luke Skywalker"
                            }
                        }
                    },
                    {
                        type: "insert",
                        payload: {
                            modelId: "Person",
                            data: {
                                id: uuid.v4(),
                                firstName: "C-3P0"
                            }
                        }
                    },
                    {
                        type: "insert",
                        payload: {
                            modelId: "Person",
                            data: {
                                id: uuid.v4(),
                                firstName: "Darth",
                                lastName: "Vader"
                            }
                        }
                    }
                ]

                const statements = createStatements(ctx)({ operations }, { combine: true })

                expect(statements).toMatchObject([
                    {
                        query: 'INSERT INTO persons (`id`, `firstName`, `lastName`, `name`) VALUES ?',
                        bindings: [
                            [
                                [expect.anything(), 'Luke', 'Skywalker', 'Luke Skywalker'],
                                [expect.anything(), 'C-3P0', null, null],
                                [expect.anything(), 'Darth', 'Vader', null]
                            ]
                        ]
                    }
                ])
            })

            it("should create batch statements of max 1000 records for insert operations that can be combined when combined is set to true", () => {
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

                const ctx = { hooks: {}, schema }

                const operations = times(1500).map(() => ({
                    type: "insert",
                    payload: {
                        modelId: "Person",
                        data: {
                            id: uuid.v4(),
                            firstName: "Luke",
                            lastName: "Skywalker",
                            name: "Luke Skywalker"
                        }
                    }
                }))

                const statements = createStatements(ctx)({ operations }, { combine: true })

                // expect(statements).toMatchObject([
                //     {
                //         query: 'INSERT INTO persons (`id`, `firstName`, `lastName`, `name`) VALUES ?',
                //         bindings: [
                //             times(1000).map(() => expect.anything())
                //         ]
                //     },
                //     {
                //         query: 'INSERT INTO persons (`id`, `firstName`, `lastName`, `name`) VALUES ?',
                //         bindings: [
                //             times(500).map(() => expect.anything())
                //         ]
                //     }
                // ])
            })

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
                    },
                    includeEvents: true
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