﻿---
title: JSON Patch
category: rfc
created: 2023-12-12
---

JSON Patch defines a JSON document structure for expressing a sequence of operations to apply to a JavaScript Object Notation(JSON) document. It is suitable for use with the HTTP PATCH method. The `application/json-patch+json` media type is used to identify such patch documents.

## JavaScript Object Notation (JSON) Patch

Operation objects **MUST** have exactly one `op` member, whose value indicates the operation to perform. Its value **MUST** be one of `add`, `remove`, `replace`, `move`, `copy`, or `test`; other values are errors.

Additionally, operation objects **MUST** have exactly one `path` member. That member's value is a string containing a [JSON-Pointer](https://www.rfc-editor.org/rfc/rfc6901) that references a location within the target document where the operation is performed.

### add

> The operation object **MUST** contain a `value` member whose content specifies the value to be added.

The `add` operation performs one of the following functions, depending upon what the target location references:

- If the target location specifies an array index, a new value is inserted into the array at the specified index.
- If the target location specifies an object member that does not already exist, a new member is added to the object.
- If the target location specifies an object member that does exist, that member's value is replaced.

**Example 1**. Add to an Object

Original:

```json
{
    "foo": "bar"
}
```

Patch:

```json
[
    {
        "op": "add",
        "path": "/plain",
        "value": "plain value"
    },
    {
        "op": "add",
        "path": "/complex",
        "value": {
            "complex key": "complex value"
        }
    }
]
```

Result:

```json
{
    "foo": "bar",
    "plain": "plain value",
    "complex": {
        "complex key": "complex value"
    }
}
```

**Example 2**. Add to an Array (1)

Original:

```json
{
    "foo": [
        "el1",
        "el2"
    ]
}
```

Patch:

```json
[
    {
        "op": "add",
        "path": "/foo/1",
        "value": "el-ext"
    }
]
```

Result:

```json
{
    "foo": [
        "el1",
        "el-ext",
        "el2"
    ]
}
```

**Example 3**. Add to an Array (2)

Original:

```json
{
    "foo": [
        "el1"
    ]
}
```

Patch:

```json
[
    {
        "op": "add",
        "path": "/foo/-",
        "value": [
            "el-ext1",
            "el-ext2"
        ]
    }
]
```

Result:

```json
{
    "foo": [
        "el1",
        [
            "el-ext1",
            "el-ext2"
        ]
    ]
}
```

### remove

> The `remove` operation removes the value at the target location. The target location **MUST** exist for the operation to be successful.

**Example 1**. Remove from an Object

Original:

```json
{
    "foo": "bar",
    "baz": "qux"
}
```

Patch:

```json
[
    {
        "op": "remove",
        "path": "/baz"
    }
]
```

Result:

```json
{
    "foo": "bar"
}
```

**Example 2**. Remove from an Array

Original:

```json
{
    "foo": [
        "el1",
        "el2",
        "el3"
    ]
}
```

Patch:

```json
[
    {
        "op": "remove",
        "path": "/foo/1"
    }
]
```

Result:

```json
{
    "foo": [
        "el1",
        "el3"
    ]
}
```

### replace

> The operation object **MUST** contain a `value` member whose content specifies the replacement value.

The `replace` operation replaces the value at the target location with a new value.

**Example 1**. Replace in an Object

Original:

```json
{
    "foo": "bar",
    "baz": "qux"
}
```

Patch:

```json
[
    {
        "op": "replace",
        "path": "/foo",
        "value": "boo"
    }
]
```

Result:

```json
{
    "foo": "boo",
    "baz": "qux"
}
```

**Example 2**. Replace in an Array

Original:

```json
{
    "foo": [
        "el1",
        "el2",
        "el3"
    ]
}
```

Patch:

```json
[
    {
        "op": "replace",
        "path": "/foo/1",
        "value": "el-ext"
    }
]
```

Result:

```json
{
    "foo": [
        "el1",
        "el-ext",
        "el3"
    ]
}
```

### move

> The operation object MUST contain a `from` member, which is a string containing a JSON Pointer value that references the location in the target document to move the value from.

The `move` operation removes the value at a specified location and adds it to the target location.

**Example 1**. Move in an Object

Original:

```json
{
    "foo": {
        "bar": "baz",
        "waldo": "fred"
    },
    "baz": {
        "qux": "quux"
    }
}
```

Patch:

```json
[
    {
        "op": "move",
        "from": "/foo/waldo",
        "path": "/baz/thud"
    }
]
```

Result:

```json
{
    "foo": {
        "bar": "baz"
    },
    "baz": {
        "qux": "quux",
        "thud": "fred"
    }
}
```

**Example 2**. Move in an Array

Original:

```json
{
    "foo": [
        "el1",
        "el2",
        "el3",
        "el4"
    ]
}
```

Patch:

```json
[
    {
        "op": "move",
        "from": "/foo/1",
        "path": "/foo/3"
    }
]
```

Result:

```json
{
    "foo": [
        "el1",
        "el3",
        "el4",
        "el2"
    ]
}
```

### copy

> The operation object MUST contain a `from` member, which is a string containing a JSON Pointer value that references the location in the target document to move the value from.

The `copy` operation copies the value at a specified location to the target location.

**Example 1**. Copy an Object Member

Original:

```json
{
    "foo": {
        "bar": "baz",
        "waldo": "fred"
    },
    "baz": {
        "qux": "quux"
    }
}
```

Patch:

```json
[
    {
        "op": "copy",
        "from": "/foo/waldo",
        "path": "/baz/thud"
    }
]
```

Result:

```json
{
    "foo": {
        "bar": "baz",
        "waldo": "fred"
    },
    "baz": {
        "qux": "quux",
        "thud": "fred"
    }
}
```

### test

> The operation object **MUST** contain a `value` member that conveys the value to be compared to the target location's value.

The `test` operation tests that a value at the target location is equal to a specified value.

**Example 1**. Test Example

Original:

```json
{
    "baz": "qux",
    "foo": [
        "a",
        2,
        "c"
    ]
}
```

Patch:

```json
[
    {
        "op": "test",
        "path": "/baz",
        "value": "qux"
    },
    {
        "op": "test",
        "path": "/foo/1",
        "value": 2
    }
]
```

Result:

`successful`

## JSON Merge Patch

The merge patch format is primarily intended for use with the HTTP PATCH method as a means of describing a set of modifications to a target resource's content.

A JSON merge patch document describes changes to be made to a target JSON document using a syntax that closely mimics the document being modified.

Recipients of a merge patch document determine the exact set of changes being requested by **comparing** the content of the provided patch against the current content of the target document.

- If the provided merge patch contains members that do not appear within the target, those members are added.
- If the target does contain the member, the value is replaced.
- Null values in the merge patch are given special meaning to indicate the removal of existing values in the target.

### Example

Original:

```json
{
    "a": "b",
    "c": {
        "d": "e",
        "f": "g"
    }
}
```

Patch:

```json
{
    "a": "z",
    "c": {
        "f": null
    }
}
```

Result:

```json
{
    "a": "z",
    "c": {
        "d": "e"
    }
}
```

That is:

- the value of `a` (`"b"`) in the original document has been **replaced** by the value of `a` (`"z"`) in the patch document
- and a member of `c` (`"f"`) has been **removed** cause its value is `null` in the patch document.

## Related Projects

- NodeJs (npm)
    - [fast-json-patch](https://www.npmjs.com/package/fast-json-patch)
    - [json8-patch](https://www.npmjs.com/package/json8-patch)
- Rust (crates.io)
    - [json_patch](https://crates.io/crates/json_patch)

## References

- [rfc6902: JavaScript Object Notation (JSON) Patch](https://www.rfc-editor.org/rfc/rfc6902)
- [rfc7396: JSON Merge Patch](https://www.rfc-editor.org/rfc/rfc7396)



