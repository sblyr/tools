# API

Using the [Schema](/docs/schema.md) and [Hooks](/docs/hooks.md) an API can be automatically generated, resulting in the following endpoints:

| endpoint | description |
| --- | --- |
| GET /v0/schema | Retrieve schema |
| GET /v0/:modelSlug | List records |
| GET /v0/:modelSlug/:recordId | Retrieve a record |


**Normalized responses**
Most responses contain a normalized response. This might be counter-intuitive at first but, since normally related data is nested inside each object. But it allows for smaller response sizes and takes away the need to transform the data to store it inside a Redux store.


## Get schema

Response:
```json
{
    "data": [
        {
            "Model": [
                "HousingContract"
            ],
            "ModelDatas": {
                "HousingContract": {
                    "id": "HousingContract",
                    "fields": [
                        ...
                    ]
                    ...
                }
            }
        }
    ]
}
```

## List records

`GET /v0/housing-contracts`

Response:
```json
{
    "data": {
        "HousingContract": [
            "002c014b-6f33-4358-87d7-ba61994ae5ba",
            "8aeb4944-69b6-4e37-9310-9a69b80ca7a8",
            ...
        ],
        "ModelDatas": {
            "002c014b-6f33-4358-87d7-ba61994ae5ba": {
                "id": "002c014b-6f33-4358-87d7-ba61994ae5ba",
                "address": "Broadway",
                "signer": "9761d0dc-d005-4c34-85db-65146417231b"
            },
            "8aeb4944-69b6-4e37-9310-9a69b80ca7a8": {
                "id": "8aeb4944-69b6-4e37-9310-9a69b80ca7a8",
                "address": "Abbey Road",
                "signer": "9761d0dc-d005-4c34-85db-65146417231b"
            },
            ...
        },
        "Signer": [
            "9761d0dc-d005-4c34-85db-65146417231b"
        ],
        "SignerDatas": {
            "9761d0dc-d005-4c34-85db-65146417231b": {
                "id": "9761d0dc-d005-4c34-85db-65146417231b",
                "name": "Luke Skywalker"
            }
        }
    }
}
```

## Retrieve a record

`GET /v0/housing-contracts/002c014b-6f33-4358-87d7-ba61994ae5ba`

Response:
```json
{
    "data": {
        "HousingContract": [
            "002c014b-6f33-4358-87d7-ba61994ae5ba"
        ],
        "ModelDatas": {
            "002c014b-6f33-4358-87d7-ba61994ae5ba": {
                "id": "002c014b-6f33-4358-87d7-ba61994ae5ba",
                "address": "Broadway",
                "signer": "9761d0dc-d005-4c34-85db-65146417231b"
            }
        },
        "Signer": [
            "9761d0dc-d005-4c34-85db-65146417231b"
        ],
        "SignerDatas": {
            "9761d0dc-d005-4c34-85db-65146417231b": {
                "id": "9761d0dc-d005-4c34-85db-65146417231b",
                "name": "Luke Skywalker"
            }
        }
    }
}
```