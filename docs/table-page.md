# Table Page

A table page is one of the resources that can be defined in the [schema](/docs/schema.md) and contains the following properties:


```yaml
apiVersion: 1
kind: TablePage
spec:
  tableId: Coin
  views:
    - id: "Coin/default"
    - id: "Coin/alphabetical"
    - id: "Coin/highestCap"
```

```yaml
apiVersion: 1
kind: View
spec:
  id: "Coin/alphabetical"
  type: gridView
  sorters:
    - id: name
      ascending: true
  fields:
    - id: name
    - id: market_cap_rank
    - id: score
```

```yaml
apiVersion: 1
kind: View
spec:
  id: "Coin/highestCap"
  type: gridView
  sorters: 
    - id: market_cap_rank
      ascending: false
  fields:
    - id: name
    - id: market_cap_rank
    - id: score
```