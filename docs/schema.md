# Schema

Schema manifests are used to define resources such as [tables](/docs/table.md), [fields](/docs/field.md), [views](/docs/view.md), [layouts](/docs/layout.md), [nav items](/docs/nav-item.md), [table pages](/docs/table-page.md) and [record pages](/docs/record-page.md).

## Resource types

### Table

A table describes a list of records of the same type. For example you could define a separate table for `sales leads`, `customers`, `companies` and `deal opportunities`. Usually a table reflects a sheet in a spreadsheet.

### Fields

The fields give you a structure in which you can put the details that are relevant to each record.

Each field has a field type that determines what kind of information you can put in it, like [text](/docs/field-types.md#text), [number](/docs/field-types.md#number), [date](/docs/field-types.md#date), or [relationship](/docs/field-types.md#relationship).

### Views
### Layouts
### Nav Items
### Table Pages
### Record Pages

## Serializable

The schema doesn't contain any logic and is fully serializable. This makes for easy transfer to a client side application that can utilize (a part of) the schema to generate interface interactions.

Most resources allow their logic to be influenced / replaced by [hooks](/docs/hooks.md).


Example output:

```js
const schema = {
    TableDatas: {
        Person: {
            id: "Person",
            fields: [
                {
                    id: "firstName",
                    type: "text"
                },
                {
                    id: "lastName",
                    type: "text"
                },
                {
                    id: "name",
                    type: "text"
                }
            ]
        }
    },
    Table: [
        "Person"
    ]
}
```