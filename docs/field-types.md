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
  - [Select](#select)
    - [Single select](#single-select)
    - [Multiple select](#multiple-select)
    - [Options with prefix / suffix](#options-with-prefix--suffix)
  - [Relationship](#relationship)
    - [Has One](#has-one)
    - [Has Many](#has-many)
  - [Boolean](#boolean)
    - [Checkbox](#checkbox)
    - [Toggle](#toggle)
  - [Date](#date)
    - [Date only](#date-only)
    - [Include time](#include-time)
  - [Attachment](#attachment)
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

## Select

| setting | description |
| --- | --- |
| type | Type of select. Possible values: `single`, `multiple`. Defaults to `single`. |
| expanded | Whether to make the values take up more space in the cell when being displayed. Defaults to `false`. |
| coloredOptions | Whether the options should appear colored or not. Defaults to `true`. |
| options | List of options |

Option properties:
| property | description |
| --- | --- |
|  id | Unique identifier for the option |
|  name | Display name for the option |
|  description | Longer description of the option |
|  color | Define a color for the option. Either a preset: `blue`, `green`, `red`, `pink`, `yellow`. Or you can define your own colors by passing an object (see down below). By default each option will get a default color for it's index. |

Custom color
```yaml
color:
  backgroundColor: "#cfdfff"
  color: "#102046"
```

### Single select

```yaml
id: formatOwned
name: Format Owned
type: select
settings:
  type: single
  options: 
    - id: paperback
      color: blue
    - id: hardback
      color: green
    - id: need_a_copy
      color: gray
```

### Multiple select

```yaml
id: formatOwned
name: Format Owned
type: select
settings:
  type: multiple
  options: 
    - id: paperback
      color: blue
    - id: hardback
      color: green
    - id: need_a_copy
      color: gray
```

When you specify the color property the schema will output a predefined backgroundColor, color based on your input. Alternatively you can define the backgroundColor / color yourself.

### Options with prefix / suffix

```yaml
id: weatherType
name: Weather Type
type: select
settings:
  type: single
  options: 
    - id: rainy
      prefix: 🌧
    - id: sunny
      prefix: ☀️
```

## Relationship

| setting | description |
| --- | --- |
| type | Type of relationship. Possible value: `hasOne`, `hasMany`. Defaults to `hasOne`. |
| foreignTable | The foreign table of the records being referenced. |

### Has One

```yaml
id: relationship_hasOne
type: relationship
settings:
  type: hasOne
  foreignTable: Author
```

### Has Many

```yaml
id: popularAuthors
name: Popular Authors
type: relationship
settings:
  type: hasMany
  foreignTable: Author
data:
  query: WHERE popularity > 5 ORDER BY popularity DESC
  bindings:
    - ${source.id}
```

## Boolean

| setting | description |
| --- | --- |
| ui | How the field should be displayed. Possible values: `checkbox`, `toggle`. Defaults to `checkbox`. |
| trueLabel | A label to be displayed when the value is `true`. Defaults to `null`. |
| falseLabel | A label to be displayed when the value is `false`. Defaults to `null`. |

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

| setting | description |
| --- | --- |
| includeTime | Whether to display the time. Defaults to `false` |
| dateFormat | Format to display the date in. Defaults to `european`. Possible values: `iso` (`YYYY-MM-DD`), `european` (`DD/MM/YYYY`), `friendly` (`D MMMM YYYY`, 16 November 2018). It's also possible to enter a custom format. |
| timeFormat | Format to display the time in. Defaults to `24`. Possible values: `24`, `12`. It's also possible to enter a custom format. |

> When you don't want to make use of the `dateFormat`, `timeFormat` defaults you can enter a custom format. The date field makes use of the [Moment.js](https://momentjs.com/) library for date formatting.

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
  includeTime: true
```

## Attachment

```yaml
id: upload
type: attachment
settings:
  type: single
```

| setting | description |
| --- | --- |
| type | Possible values: `single`, `multiple`. Defaults to `single` |

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