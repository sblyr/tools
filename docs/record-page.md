# Record Page

A record page is one of the resources that can be defined in the [schema](/docs/schema.md) and contains the following properties:

```yaml
apiVersion: 1
kind: RecordPage
spec:
  tableId: Coin
  layout:
    - id: "Coin/default"
    - id: "Coin/graph"
```

```yaml
apiVersion: 1
kind: Layout
spec:
  id: "Coin/graph"
  children:
    - type: Field
      fieldId: CoinGraph