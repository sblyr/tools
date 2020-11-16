# Field Rules

Field rules define basic validation for your fields. There are default validation rules that work out of the box and there are validation rules that you can define yourself.

## Available Rules

| name   | description                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------ |
| accept | Should be `true`. Default message format: `These terms need to be accepted`                                  |
| min    | Should have a minimum amount of characters. Default message format: `Enter a minimum of ${value} characters` |
| max    | Should have a maximum amount of charaters. Default message format: `Enter a maximum of ${value} characters`  |
| phone  | Should be a valid phone number. Default message format: `Enter a valid phone number`                         |
| email  | Should be a valid emailaddress. Default message format: `Enter a valid emailaddress`                         |


### Accept

```yaml
id: name
name: Name
type: text
rules:
  - type: min
    value: 5
```

### Min

```yaml
id: name
name: Name
type: text
rules:
  - type: min
    value: 5
```

### Max

```yaml
id: name
name: Name
type: text
rules:
  - type: max
    value: 75
```

### Phone


```yaml
id: name
name: Name
type: text
rules:
  - type: phone
```

### Email


```yaml
id: name
name: Name
type: text
rules:
  - type: email
```


## Custom Rules

A custom rule can be added as followed:

You define add it to the rules list:

```yaml
id: name
name: Name
type: text
rules:
  - type: minDrivingAge
```

You add a validator function to the [hooks](/docs/hooks.md) object.

```js
const moment = require('moment')

const hooks = {
  'ruleValidator/minDrivingAge': {
    validate: (input) => moment(input).isSameOrBefore(
        moment().subtract(18, 'years')
    ),
    message: () => `The driver should be at least 18 years old.`
  }
}
```