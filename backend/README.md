# Flask API Documentation:

## Register

## [POST] /api/register

### Request Body

```json
{
    "username": "string",
    "password": "string"
}
```

### Response Body

```json
{
    "msg": "string",
    "username": {
        "id": "integer",
        "username": "string",
        "password": "string"
    }
}
```
