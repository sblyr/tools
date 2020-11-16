# Storage Adapters

## MySQL

```js
const { createMySQLAdapter, createClient } = require('@sublayer/tools')


const adapter = createMySQLAdapter({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

const client = createClient({
    adapters: {
        mysql
    }
})
```

## Write your own custom adapter

```js
const createCustomAdapter = () => ({
    readRecords: params => {

    },
    createRecords: records => {

    },
    updateRecords: records => {

    },
    deleteRecords: ids => {

    }
})

const custom = createCustomAdapter()

const client = createClient({
    adapters: {
        custom
    }
})
```