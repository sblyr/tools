# Field Types

- [Field Types](#field-types)
  - [Text](#text)
    - [Phone](#phone)
    - [Email](#email)
    - [URL](#url)
  - [Long text](#long-text)
    - [HTML](#html)
    - [Markdown](#markdown)
    - [Code](#code)
  - [Number](#number)
    - [Float](#float)
    - [Integer](#integer)
    - [Decimal](#decimal)
    - [Currency](#currency)
    - [Percentage](#percentage)
    - [Progress Bar](#progress-bar)
  - [Single select](#single-select)
  - [Relationship](#relationship)
    - [Has One](#has-one)
    - [Has Many](#has-many)
  - [Boolean](#boolean)
    - [Checkbox](#checkbox)
    - [Toggle](#toggle)
  - [Date](#date)
    - [Date only](#date-only)
    - [Include time](#include-time)
  - [Json](#json)
  - [Button](#button)

## Text

```yaml
id: author
name: Author
type: text
```

### Phone

```yaml
id: phone
name: Phone
type: text
displayType: phone
```

### Email

```yaml
id: email
name: Email
type: text
displayType: email
```

### URL

```yaml
id: url
name: URL
type: text
displayType: url
settings:
  baseURL: https://sublayer.io/product
```

## Long text

```yaml
id: notes
name: Notes
type: longText
```

### HTML

```yaml
id: html
name: HTML
type: longText
displayType: html
```

### Markdown

```yaml
id: markdown
name: Markdown
type: longText
displayType: markdown
```

### Code

```yaml
id: code
name: Code
type: longText
displayType: code
```

## Number

### Float

```yaml
id: number_float
type: number
settings:
  format: float

# output: 1.234
```

### Integer

```yaml
id: number_integer
type: number
settings:
  format: integer

# output: 1
```

### Decimal

```yaml
id: number_decimal
type: number
settings:
  format: decimal
  precision: 2

# output: 10.20
```

### Currency

```yaml
id: number_currency
type: number
settings:
  format: decimal
  precision: 2
  ui: currency

# output: € 10.20
```

### Percentage

```yaml
id: number_percentage
type: number
settings:
  format: decimal
  precision: 2
  ui: percentage

# output: 10.20%
```

### Progress Bar

```yaml
id: number_progressbar
type: number
displayType: progressBar

# output: [=====     ] 50%
```

## Single select

```yaml
id: formatOwned
name: Format Owned
type: singleSelect
settings:
    options: 
        - id: paperback
          color: blue
        - id: hardback
          color: green
        - id: need_a_copy
          color: gray
```

When you specify the color property the schema will output a predefined backgroundColor, color based on your input. Alternatively you can define the backgroundColor / color yourself.

Output:
```json
{
  "id": "formatOwned",
  "name": "Format Owned",
  "type": "singleSelect",
  "settings": {
    "options": [
      {
        "id": "paperback",
        "backgroundColor": "#cfdfff",
        "color": "#102046"
      },
      {
        "id": "hardback",
        "backgroundColor": "#d0f0fd",
        "color": "#04283f"
      },
      {
        "id": "need_a_copy",
        "backgroundColor": "#ccc",
        "color": "#040404"
      }
    ]
  }
}
```

Options with prefix / suffix

```yaml
id: weatherType
name: Weather Type
type: singleSelect
settings:
    options: 
        - id: rainy
          prefix: 🌧
        - id: sunny
          prefix: ☀️
```

## Relationship

### Has One

```yaml
id: relationship_hasOne
type: relationship
settings:
  type: hasOne
  foreignModel: Author
```

### Has Many

```yaml
id: relationship_hasOne
type: relationship
settings:
  type: hasMany
  foreignModel: Author
```

## Boolean

### Checkbox

```yaml
id: boolean_checkbox
type: boolean
settings:
  trueLabel: On
  falseLabel: Off
```
### Toggle

```yaml
id: boolean_toggle
type: boolean
settings:
  ui: toggle
```


## Date

### Date only

```yaml
id: date
name: Date
type: date
settings:
  includeTime: false
```

### Include time

```yaml
id: date
name: Date
type: date
settings:
  includeTime: false
```

## Json

```yaml
id: data
type: json
```

## Button

```yaml
id: sendMessageButton
type: button
settings:
  label: Send a message
  variant: primary
```