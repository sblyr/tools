# Field Types

- id
- [text](#text)
- [number](#number)
- [singleSelect](#single-select)
- [relationship](#relationship)
- [boolean](#boolean)
- date
- longText
- json
- button

## Text

Definition
```yaml
id: author
name: Author
type: text
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

Definition
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

Icons

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