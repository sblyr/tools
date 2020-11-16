# Client

In order to write less code a client can be generated based on the schema. This client makes it easier to make changes to your data.


## Create a client

```js
const client = createClient()
```

## Create a record

```js
const [record] = await client.persons.create([
    {
        fields: {
            name: 'Luke Skywalker'
        }
    }
])
```

## Create multiple records at once

```js
const [lukeSkywalker, r2d2] = await client.persons.create([
    {
        fields: {
            name: 'Luke Skywalker'
        }
    },
    {
        fields: {
            name: 'R2-D2
        }
    }
])
```

> Triggers `record/batchCreated` event. For more info see [events](/docs/event.md).

## Update a record

```js
const [lukeSkywalker] = await client.persons.update([
    {
        id: 'fa382609-4453-410c-a13f-728804e56ed3',
        fields: {
            name: 'Skywalker'
        }
    }
])
```

> In case of a MySQL insert the records will be inserted in batches of 1000 rows.