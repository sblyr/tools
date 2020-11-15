# Field

A field can contain the following properties:

| name | description |
| --- | --- |
| id | unique identifier for field. this identifier will be used to reference the field |  
| name | primary description of the field |
| description | longer description of the field |
| type | type of the field, this primarily acts as the data type. for different displayment of the same data type, look at the displayType property. Available types: `text`, `longText`, `date`, `number`, `boolean`, `singleSelect`, `json`, `relationship`, `button`. For more information, look at [Field Types](field-types.md) |
| displayType | Based on the type property multiple displayTypes are available: text (`phone`, `url`, `email`), longText (`markdown`, `code`, `html`), number (`progressBar`) |
| virtual | Either `true` or `false`. Defaults to `false`. When set to `true` this field will not be written to. When being read it will look if a hook is present to read this fields value. For more information, look at [Hooks](/docs/hooks.md) |
| settings | An object containing properties specific to the field type / displayType. For more information, look at [Field Types](field-types.md) |


## Available hooks

The following types of hooks can be defined and have an effect on how the field works: `defaultValue`, `batchFormula`, `formula`. For more information, look at [Hooks](/docs/hooks.md).