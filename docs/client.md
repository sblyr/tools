# Client

In order to write less code a client can be generated based on the schema. This client makes it easier to make changes to your data.

- [Client](#client)
  - [Create a client](#create-a-client)
  - [Create records](#create-records)
  - [Read records](#read-records)
    - [MySQL](#mysql)
    - [MongoDB](#mongodb)
    - [State](#state)
    - [External API](#external-api)
  - [Update records](#update-records)
  - [Delete records](#delete-records)

## Create a client

```js
const client = createClient()
```

## Create records

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

> Triggers following events:
> - `record/created`
> - `record/batchCreated`
> 
> Read more about [events](/docs/event.md).

> In case of a MySQL insert the records will be inserted in batches of 1000 rows.

## Read records

Reading records depends on the adapter that's configured for the table.

### MySQL

```js
const [record] = await client.persons.read({
    query: 'SELECT * FROM {persons} WHERE id = ?',
    bindings: [
        'fa382609-4453-410c-a13f-728804e56ed3'
    ]
})
```

### MongoDB

```js
import { ObjectId } from 'mongo'

const [record] = await client.persons.read({
    '_id': ObjectId('4ecc05e55dd98a436ddcc47c')
})

```

### State

```js
const [record] = await client.persons.read({
    selector: (state) => ([
        state.getIn(['PersonDatas', 'fa382609-4453-410c-a13f-728804e56ed3'])
    ])
})

```

### External API

```js
const [record] = await client.persons.read({
    selector: () => axios.get('https://api.sublayer.io/v0/persons/fa382609-4453-410c-a13f-728804e56ed3')
})

```

## Update records

```js
const [lukeSkywalker, r2d2] = await client.persons.update([
    {
        id: 'fa382609-4453-410c-a13f-728804e56ed3',
        fields: {
            name: 'Skywalker'
        }
    },
    {
        id: '8cc17b4b-3eff-4a6d-9bfa-f9e046c69d4a',
        fields: {
            name: 'R2-D2'
        }
    }
])
```

> Triggers following events:
> - `record/updated`
> - `record/batchUpdated`
> 
> Read more about [events](/docs/event.md).

## Delete records

```js
const [lukeSkywalker, r2d2] = await client.persons.delete([
    'fa382609-4453-410c-a13f-728804e56ed3',
    '8cc17b4b-3eff-4a6d-9bfa-f9e046c69d4a'
])
```

> Triggers following events:
> - `record/deleted`
> - `record/batchDeleted`
> 
> Read more about [events](/docs/event.md).