const fs = require('fs')
const uuid = require('uuid')
const tap = require('tap')
const createSchema = require('./createSchema')

const schema_string = `
kind: Model
spec:
  id: Customer
  name: Customer
  plural: Customers
  identifierKey: cus
  collectionKey: customers
  tableName: customers
  primaryField: name
  fields: 
    - id: id 
      name: ID
      type: id
    - id: name 
      name: Name
      type: text
    - id: email 
      name: Email
      type: text
---
kind: Model
spec:
  id: Quote
  name: Quote
  plural: Quotes
  identifierKey: quo
  collectionKey: quotes
  tableName: quotes
  fields: 
    - id: id 
      name: ID
      type: id
    - id: data 
      name: Data
      type: json
    - id: reference
      name: Reference
      type: text
    - id: attachmentUrl
      name: Attachment
      type: text
      displayType: url
    - id: customerId 
      name: Customer
      type: relationship
      settings:
        type: hasOne
        foreignModel: Customer
    - id: createdAt 
      name: Created at
      type: date
      settings:
        includeTime: true
`

const tmp_file = `/tmp/${uuid.v4()}.yaml`

fs.writeFileSync(tmp_file, schema_string)

tap.test("createSchema(): should create a schema", assert => {

    const schema = createSchema({ configPath: tmp_file })

    assert.same(schema.Model, ['Customer', 'Quote'])

    assert.end()
})