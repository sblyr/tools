# Model

A model can contain the following properties:

| name | description |
| --- | --- |
| id | Unique identifier for the model. This identifier will be used to reference the model |
| name | A short name by which the model can be recognised when displayed. |
| plural | The plural version of the models name. This name is used to display the plural version of the name when applicable. When left blank, the plural name will be auto-generated. This isn't always accurate. E.g. `Housing Contract` will translate to `Housing Contracts` |
| tableName | The name of the database table. This property is intended to be used by the MySQL-adapter. When left blank, a snake case, plural version of the id will be generated. E.g. `HousingContract` will translate to `housing_contracts` |
| collectionKey | The name of the collection. This property is intended to be used by the generated client. When left blank, a camel case, plural version of the id will be generated. E.g. `HousingContract` will translate to `housingContracts`. When a client is generated the collection will be accessible as `client.housingContracts.create()`, `client.housingContracts.update()`, etc. |
| primaryField | The id of the field that acts as the primary field. The primary field is used to describe the record (an instance of this model). Rather than describing a record by it's id, it's preferable to define a primary field that describes each record with a recognisable name. Example: `address` |
| fields | An array of `Field` objects. For more information, look at [Field](/docs/field.md) |


## Example

```yaml
apiVersion: 1
kind: Model
spec:
  id: HousingContract
  name: Housing Contract
  plural: Housing Contracts
  tableName: housing_contracts
  collectionKey: housingContracts
  primaryField: address
  fields:
    - id: address
      name: Address
      type: text
    - id: signer
      name: Signer
      type: relationship
      settings:
        type: hasOne
        foreignModel: Signer
    - id: createdAt
      name: Created at
      type: date
      settings:
        includeTime: true
```