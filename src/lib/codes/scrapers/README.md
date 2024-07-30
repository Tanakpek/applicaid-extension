
examples of extraction instructions


```
extract maps 
{
    'div': "innerHTML.text",
    "p": 'text,
    ...
}

[{   

    "op": "select",
    "values": ["class", "this"]
    "expected": "div",
    "cur": [
        {
            "op": "iterate",
            "values": [[["id"],["this"]]],
            "expected": "span",
            "cur": [{
                "op": "extract"
            }]
        }
    ]
}]

[{   

    "op": "select",
    "values" : ["class", "this"]
    "expected": "div",
    "cur": [
        {
            "op": "iterate",
            "type": "id",
            "value": "this",
            "values": [[["id" ], ["this"]]]
            "expected": "span",
            "cur": {
                "op": "extract"
            }
        },
        {
            "op": "select",
            "values" : ["{R}","class", "that*"] // means regexp
            "expected" : "span",
            "cur": {
                "op": "extract"
            }
        }
    ]
}]

[{   

    "op": "select",
    "values": ["class","test"],
    "expected": "div",
    "cur": [
        {
            "op": "iterate",

            "values": [[["id"],["this", "another"] ]], 
            "expected": "span",
            "cur": {
                "op": "extract"
            }
        },
        {
            "op": "select",
            "values" : ["class", "that"],
            "expected" : "span",
            "cur": {
                "op": "extract"
            }
        }
    ]
}]
```

