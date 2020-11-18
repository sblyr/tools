# API

Using the [Schema](/docs/schema.md) and [Hooks](/docs/hooks.md) an API can be automatically generated, resulting in the following endpoints:

| endpoint | description |
| --- | --- |
| `GET /v0` | Retrieve info about the application |
| `GET /v0/schema` | Retrieve schema |
| `GET /v0/:tableSlug` | List records |
| `GET /v0/:tableSlug/:recordId` | Retrieve a record |
| `POST /v0/:tableSlug` | Create records |
| `PATCH /v0/:tableSlug` | Update records, update the fields you specify, leaving the rest as they were |
| `PUT /v0/:tableSlug` | Update records, will perform a destructive update and clear all unspecified cell values |
| `DELETE /v0/:tableSlug` | Delete records |

**Normalized responses**
Most responses contain a normalized response. This might be counter-intuitive at first but, since normally related data is nested inside each object. But it allows for smaller response sizes and takes away the need to transform the data to store it inside a Redux store.

## Retrieve info about the application

Response:
```json
{
    "name": "sublayer-app-api",
    "platform": {
        "type": "Linux",
        "release": "4.19.0-11-amd64"
    },
    "hostname": "sublayer-app-api-66dff98857-p2drh",
    "build": {
        "version": "v1.0.0",
        "author": "sublayerio",
        "commit_hash": "97005e90147542ef7056764577e7cc27a07caa04",
        "release_date": "2020-11-12T14:34:45.000Z"
    }
}
```
## Retrieve schema

Response:
```json
{
    "data": [
        {
            "Table": [
                "HousingContract"
            ],
            "TableDatas": {
                "HousingContract": {
                    "id": "HousingContract",
                    "fields": [
                    
                    ]
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
        ],
        "HousingContractDatas": {
            "002c014b-6f33-4358-87d7-ba61994ae5ba": {
                "id": "002c014b-6f33-4358-87d7-ba61994ae5ba",
                "address": "Broadway",
                "signer": "9761d0dc-d005-4c34-85db-65146417231b"
            },
            "8aeb4944-69b6-4e37-9310-9a69b80ca7a8": {
                "id": "8aeb4944-69b6-4e37-9310-9a69b80ca7a8",
                "address": "Abbey Road",
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

## Retrieve a record

`GET /v0/housing-contracts/002c014b-6f33-4358-87d7-ba61994ae5ba`

Response:
```json
{
    "data": {
        "HousingContract": [
            "002c014b-6f33-4358-87d7-ba61994ae5ba"
        ],
        "HousingContractDatas": {
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