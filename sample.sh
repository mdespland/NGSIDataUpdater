#!/bin/bash

curl -X POST http://127.0.0.1:1026/v2/entities -H "Content-Type: application/json" -d @- <<EOF
{
    "id": "$1",
    "type": "Room",
    "temperature": {
        "value": 23.5,
        "type": "Number"
    },
    "light": {
        "value": true,
        "type": "Boolean"
    }
}
EOF