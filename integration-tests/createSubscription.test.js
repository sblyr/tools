const expect = require('expect')
const moment = require('moment')
const create = require('../transaction/create')
const createStatements = require('../storage/mysql/createStatements')

describe('Integration Tests', () => {

    describe('create a subscription', () => {

        it("should create a transaction", () => {

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
                    Plan: {
                        id: "Plan",
                        tableName: "plans",
                        fields: [
                            {
                                id: "id",
                                type: "id"
                            },
                            {
                                id: "name",
                                type: "text"
                            }
                        ]
                    },
                    Customer: {
                        id: "Customer",
                        tableName: "customers",
                        fields: [
                            {
                                id: "id",
                                type: "id"
                            },
                            {
                                id: "name",
                                type: "text"
                            }
                        ]
                    },
                    Subscription: {
                        id: "Subscription",
                        tableName: "subscriptions",
                        fields: [
                            {
                                id: "id",
                                type: "id"
                            },
                            {
                                id: "customerId",
                                type: "relationship",
                                settings: {
                                    type: "hasOne",
                                    foreignModel: "Customer"
                                }
                            },
                            {
                                id: "planId",
                                type: "relationship",
                                settings: {
                                    type: "hasOne",
                                    foreignModel: "Plan"
                                }
                            },
                            {
                                id: "startDate",
                                type: "date"
                            },
                            {
                                id: "endedAt",
                                type: "date"
                            }
                        ]
                    }
                },
                Model: [
                    "Event",
                    "Plan",
                    "Subscription"
                ]
            }

            const hooks = {
                "defaultValue/Subscription.planId": () => () => "PLAN_1",
                "defaultValue/Subscription.status": () => () => "ACTIVE",
                "formula/Subscription.startDate": [
                    ctx => () => {
                        const today = moment();
                        return today
                            .clone()
                            .startOf("year")
                            .toDate();
                    }
                ],
                "formula/Subscription.currentPeriodStart": [
                    ctx => () => {
                        const today = moment();
                        return today
                            .clone()
                            .startOf("year")
                            .toDate();
                    }
                ],
                "formula/Subscription.currentPeriodEnd": [
                    ctx => () => {
                        const today = moment();
                        return today
                            .clone()
                            .startOf("year")
                            .add(1, "year")
                            .toDate();
                    }
                ]
            }

            const ctx = { schema, hooks }

            const transaction = create(ctx)({
                modelId: "Subscription",
                data: {
                    customerId: "f33ffdea-1adc-40e6-8117-38e7fd359259"
                },
                includeEvents: true
            })

            expect(transaction).toMatchObject({
                operations: [
                    {
                        type: "insert",
                        payload: {
                            modelId: "Subscription",
                            data: {
                                id: expect.anything(),
                                startDate: moment().clone().startOf("year").toDate(),
                                customerId: "f33ffdea-1adc-40e6-8117-38e7fd359259",
                                planId: "PLAN_1",
                                endedAt: null
                            }
                        }
                    },
                    {
                        type: "insert",
                        payload: {
                            modelId: "Event",
                            data: {
                                id: expect.anything(),
                                entityType: "Subscription",
                                entityId: expect.anything(),
                                type: "Subscription:created",
                                payload: {
                                    entity: {
                                        id: expect.anything(),
                                        startDate: moment().clone().startOf("year").toDate(),
                                        customerId: "f33ffdea-1adc-40e6-8117-38e7fd359259",
                                        planId: "PLAN_1",
                                        endedAt: null
                                    }
                                }
                            }
                        }
                    }
                ]
            })

            const statements = createStatements(ctx)(transaction)

            expect(statements).toMatchObject([
                {
                    query: 'INSERT INTO subscriptions SET ?',
                    bindings: {
                        id: expect.anything(),
                        startDate: moment().clone().startOf("year").toDate(),
                        customerId: "f33ffdea-1adc-40e6-8117-38e7fd359259",
                        planId: "PLAN_1",
                        endedAt: null
                    }
                },
                {
                    query: 'INSERT INTO events SET ?',
                    bindings: {
                        id: expect.anything(),
                        type: 'Subscription:created',
                        entityId: expect.anything(),
                        payload: expect.anything()
                    }
                }
            ])
        })
    })
})