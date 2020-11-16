# View

A view is one of the resources that can be defined in the [schema](/docs/schema.md) and contains the following properties:

| name | description |
| --- | --- |
| id | Unique identifier for the view. This identifier will be used to reference the view |


## View types

## Grid view

```yaml
apiVersion: 1
kind: View
spec:
  id: housingContract
  name: All active contracts
  type: gridView
  fields:
    - id: address
      width: 300
    - id: signer
      visible: false
```