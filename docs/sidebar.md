# Sidebar

A sidebar is one of the resources that can be defined in the [schema](/docs/schema.md) and contains the following properties:

| name | description |
| --- | --- |
| id | Identifies the sidebar |
| items | List of menu items |

```yaml
apiVersion: 1
kind: Sidebar
spec:
  id: default
  items: 
    - type: TablePage
      tableId: People
    - type: TablePage
      tableId: Planet
    - type: TablePage
      tableId: Spaceship
```