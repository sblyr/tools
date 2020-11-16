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
        name: 'Luke Skywalker'
    }
])
```

## Create multiple records at once

```js
const [lukeSkywalker, r2d2] = await client.persons.create([
    {
        name: 'Luke Skywalker'
    },
    {
        name: 'R2-D2
    }
])
```

> In case of a MySQL insert the records will be inserted in batches of 1000 rows.