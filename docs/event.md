# Event

Whenever a record get's created, updated or removed event's are emitted.

The default Event table looks as follows:

```yaml
apiVersion: 1
kind: Table
spec:
  id: Event
  slug: events
  tableName: events
  collectionKey: events
  primaryField: name
  fields:
    - id: profile
      description: Who triggered the event
      type: text
    - id: source
      description: What triggered the event
      type: text
    - id: type
      type: text
    - id: name
      type: text
    - id: tableId
      type: relationship
      settings:
        type: hasOne
        foreignTable: Table
    - id: recordId
      type: relationship
      settings:
        type: hasOne
        polymorphic: true
    - id: payload 
      type: json
    - id: createdAt
      type: date
      settings:
        includeTime: true
```

## Event Types

Listed below are base events, they contain information about changes in the system.

| name                  | description                              |
| --------------------- | ---------------------------------------- |
| `record/created`      | When a record has been created           |
| `record/batchCreated` | When a batch of records has been created |
| `record/created`      | When a record has been updated           |
| `record/batchUpdated` | When a batch of records has been updated |
| `record/deleted`      | When a record has been deleted           |
| `record/batchDeleted` | When a batch of records has been deleted |

### record/created

Contains the created record.

```json
{
  "type": "record/created",
  "tableId": "Person",
  "recordId": "04345518-a1a6-481d-ae06-f3eabde46f02",
  "createdAt": "2020-11-16T15:13:51.200Z",
  "payload": {
    "record": {
      "id": "04345518-a1a6-481d-ae06-f3eabde46f02",
      "name": "Luke Skywalker"
    }
  }
}
```

### record/updated

Contains the previous record, the current record and a list of changes that describes the previous and next values of the fields that have been changed.

```json
{
  "type": "record/updated",
  "tableId": "Person",
  "recordId": "04345518-a1a6-481d-ae06-f3eabde46f02",
  "createdAt": "2020-11-16T15:13:51.200Z",
  "payload": {
    "prev": {
      "id": "04345518-a1a6-481d-ae06-f3eabde46f02",
      "name": "Skywalker"
    },
    "record": {
      "id": "04345518-a1a6-481d-ae06-f3eabde46f02",
      "name": "Luke Skywalker"
    },
    "changes": [
      {
        "fieldId": "name",
        "prev": "Skywalker",
        "next": "Luke Skywalker"
      }
    ]
  }
}
```

### record/deleted

Contains the deleted record.

```json
{
  "type": "record/deleted",
  "tableId": "Person",
  "recordId": "04345518-a1a6-481d-ae06-f3eabde46f02",
  "createdAt": "2020-11-16T15:13:51.200Z",
  "payload": {
    "record": {
      "id": "04345518-a1a6-481d-ae06-f3eabde46f02",
      "name": "Luke Skywalker"
    }
  }
}
```


## Aggregated Event Types

The following events are being generated when the above events are triggered. These events make it easier to listen to specific changes

| name                                       | extends          | description                                                   |
| ------------------------------------------ | ---------------- | ------------------------------------------------------------- |
| `table/{tableId}/record/created`           | `record/created` | When a record in a specific table has been created            |
| `table/{tableId}/record/updated`           | `record/updated` | When a record in a specific table has been updated            |
| `table/{tableId}/record/deleted`           | `record/deleted` | When a record in a specific table has been deleted            |
| `table/{tableId}/record/{fieldId}/updated` | `record/updated` | When a field of a record in a specific table has been updated |