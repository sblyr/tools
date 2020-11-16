# Registering hooks

Hook into these actions to customize the default behaviour.

| Action       | Description                                                    |
| :----------- | :------------------------------------------------------------- |
| defaultValue | Fires whenever a default value gets set for a field of a model |
| formula      | Fires whenever a formula fields gets computed                  |


## defaultValue
```js
const hooks = {
    // matches any field
    "defaultValue": (source, { modelId, fieldId }) => {
        
        if (modelId === 'Person' && fieldId === 'age') {
            return [firstName, lastName].join(' ')
        }
    },
    // shorthand version: matches the age field on the Person model
    "defaultValue/Person.age": () => 25,
}

const ctx = { hooks }
```
## formula
```js
const hooks = {
    // matches any field
    "formula": (source, { modelId, fieldId }) => {
        
        if (modelId === 'Person' && fieldId === 'name') {
            return [firstName, lastName].join(' ')
        }
    },
    // shorthand version: matches the name field on the Person model
    "formula/Person.name": ({ firstName, lastName }) => [firstName, lastName].join(' ')
}

const ctx = { hooks }
```