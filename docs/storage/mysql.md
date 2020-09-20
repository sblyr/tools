# MySQL

## createStatements

Turns a transaction with operations into sql statements that can be executed in within a mysql transaction.


### Examples

Below is an example of a create action that's turned into a transaction and then turned into sql statements that can then be executed against a database.
```js
const createTransaction = require('@sublayer/tools/transaction/createTransaction')
const createStatements = require('@sublayer/tools/storage/mysql/createStatements')
const db = require('./db')

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
            tableName: "persons",
            fields: [
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
        "Person",
        "Event"
    ]
}

const ctx = {
    schema,
    hooks: {}
}

const transaction = createTransaction(ctx)({
    type: "update",
    modelId: "Person",
    data: {
        id: "0106c862-db09-4060-97fb-8716997b0c21",
        firstName: "Anakin"
    }
})

const statements = createStatements(ctx)(transaction)

try {

    await Promise.all(
        statements.map(({ query, bindings }) =>
            db.query(query, bindings)
        )
    )

    await db.query('COMMIT;')

} catch (e) {
    //

    await db.query('ROLLBACK;')
}

```

Statements:

```js
[
    {
        query: "INSERT INTO persons SET ?",
        bindings: {
            id: "0106c862-db09-4060-97fb-8716997b0c21",
            firstName: "Luke",
            lastName: "Skywalker",
            name: "Luke Skywalker"
        }
    },
    {
        query: "INSERT INTO events SET ?",
        bindings: {
            id: "86910eef-ddad-4147-9ccd-7878b5341a0a",
            type: "Person:created",
            entityType: "Person",
            entityId: "0106c862-db09-4060-97fb-8716997b0c21",
            payload: "{\"entityType\":\"Person\",\"entityId\":\"0106c862-db09-4060-97fb-8716997b0c21\",\"entity\":{\"id\":\"0106c862-db09-4060-97fb-8716997b0c21\",\"firstName\":\"Luke\",\"lastName\":\"Skywalker\",\"name\":\"Luke Skywalker\"}}"
        }
    }
]
```