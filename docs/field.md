# Field

A field is one of the resources that can be defined in the [schema](/docs/schema.md) and contains the following properties:


| name         | description                                                                                                                                                                                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | Unique identifier for field. this identifier will be used to reference the field                                                                                                                                                                                                                                            |
| name         | A short name by which the field can be recognised when displayed                                                                                                                                                                                                                                                            |
| description  | A longer description of the field                                                                                                                                                                                                                                                                                           |
| type         | Type of the field, this primarily acts as the data type. for different displayment of the same data type, look at the displayType property. Available types: `text`, `longText`, `date`, `number`, `boolean`, `singleSelect`, `json`, `relationship`, `button`. For more information, look at [Field Types](field-types.md) |
| displayType  | Based on the type property multiple displayTypes are available: text (`phone`, `url`, `email`), longText (`markdown`, `code`, `html`), number (`progressBar`)                                                                                                                                                               |
| required     | Whether the field is allowed to be empty or not. This will prevent new records from being created if no initial value is specified.                                                                                                                                                                                         |
| defaultValue | Default value to be set as the initial value of the field.                                                                                                                                                                                                                                                                  |
| dependsOn    | Which fields this field depends on. Read more down below.                                                                                                                                                                                                                                                                   |
| readOnly     | Either `true` or `false`. Defaults to `true`. When set to `false` this field will be editable, with some exceptions such as devired (virtual) fields.                                                                                                                                                                       |
| virtual      | Either `true` or `false`. Defaults to `false`. When set to `true` this field will not be written to. When being read it will look if a hook is present to read this fields value. For more information, look at [Hooks](/docs/hooks.md)                                                                                     |
| settings     | An object containing properties specific to the field type / displayType. For more information, look at [Field Types](field-types.md)                                                                                                                                                                                       |


## Depends On

When a field is derived from other fields within the table the `dependsOn` property can be set. This property is being used for performance reasons. If not set, in some cases the derived field will not be computed properly. For instance you would like to create a `virtual` field called `name` that's derived from both `firstName` and `lastName`, this should be done as followed:

In schema:

```yaml
apiVersion: 1
kind: Table
spec:
  id: Person
  fields:
    - id: firstName
      type: text
    - id: lastName
      type: text
    - id: name
      type: text
      virtual: true
      dependsOn:
        - firstName
        - lastName
```

In hooks:

```js
const hooks = {
  "formula/Person.name": ({ firstName, lastName }) => [firstName, lastName].join(' ')
}
```

## Available hooks

The following types of hooks can be defined and have an effect on how the field works: `defaultValue`, `batchFormula`, `formula`. For more information, look at [Hooks](/docs/hooks.md).