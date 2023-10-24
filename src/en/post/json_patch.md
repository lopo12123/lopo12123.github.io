---
layout: doc

# custom frontmatter properties
topic: JSON Patch
brief: JSON Patch defines a JSON document structure for expressing a sequence of operations to apply to a JavaScript Object Notation(JSON) document
language:
  - JSON
tag:
  - rfc
  - merge
  - patch
---

# JSON Patch & JSON Merge Patch

> This post is about [JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902)
> and [JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7396).

## JavaScript Object Notation (JSON) Patch

JSON Patch defines a JSON document structure for expressing a sequence of [operations](#operations) to apply to a
JavaScript Object Notation(JSON) document; it is suitable for use with the HTTP PATCH method.
The `application/json-patch+json` media type is used to identify such patch documents.

Operation objects **MUST** have exactly one `op` member, whose value indicates the operation to perform. Its value
**MUST** be one of [`add`](#add), [`remove`](#remove), [`replace`](#replace), [`move`](#move), [`copy`](#copy),
or [`test`](#test); other values are errors.

Additionally, operation objects **MUST** have exactly one `path` member. That member's value is a string containing
a [JSON-Pointer](https://datatracker.ietf.org/doc/html/rfc6901) that references a location within the target document
where the operation is performed.

- ### add <Badge type="info" text="operation" title="operation"/>

  > The operation object **MUST** contain a `value` member whose content specifies the value to be added.

  The `add` operation performs one of the following functions, depending upon what the target location references:

    - If the target location specifies an array index, a new value is inserted into the array at the specified index.
    - If the target location specifies an object member that does not already exist, a new member is added to the
      object.
    - If the target location specifies an object member that does exist, that member's value is replaced.

::: details Example 1. Add an Object Member
Original document:

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

```
{
    "foo": "bar",
    "plain": "plain value",  // [!code ++]
    "complex": {  // [!code ++]
        "complex key": "complex value"  // [!code ++]
    }  // [!code ++]
}
```

:::

::: details Example 2. Add an Array Element
Original document:

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

```
{
    "foo": [
        "el1",
        "el-ext",  // [!code ++]
        "el2"
    ]
}
```

:::

::: details Example 3. Add an Array Value
Original document:

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

```
{
    "foo": [
        "el1",
        [  // [!code ++]
            "el-ext1",  // [!code ++]
            "el-ext2"  // [!code ++]
        ]  // [!code ++]
    ]
}
```

:::

- ### remove <Badge type="info" text="operation" title="operation"/>

  The `remove` operation removes the value at the target location. The target location **MUST** exist for the operation
  to be successful.

::: details Example 1. Remove an Object Member
Original document:

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

```
{
    "foo": "bar",
    "baz": "qux"  // [!code --]
}
```

:::

::: details Example 2. Remove an Array Element
Original document:

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

```
{
    "foo": [
        "el1",
        "el2",  // [!code --]
        "el3"
    ]
}
```

:::

- ### replace <Badge type="info" text="operation" title="operation"/>

  > The operation object **MUST** contain a `value` member whose content specifies the replacement value.

  The `replace` operation replaces the value at the target location with a new value.

::: details Example 1. Replace an Object Member
Original document:

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

```
{
    "foo": "bar",  // [!code --]
    "foo": "boo",  // [!code ++]
    "baz": "qux"
}
```

:::

::: details Example 2. Replace an Array Element

Original document:

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

```
{
    "foo": [
        "el1",
        "el2",  // [!code --]
        "el-ext",  // [!code ++]
        "el3"
    ]
}
```

:::

- ### move <Badge type="info" text="operation" title="operation"/>

  > The operation object MUST contain a `from` member, which is a string containing a JSON Pointer value that references
  the location in the target document to move the value from.

  The `move` operation removes the value at a specified location and adds it to the target location.

::: details Example 1. Move an Object Member

Original document:

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

```
{
    "foo": {
        "bar": "baz",
        "waldo": "fred"  // [!code --]
    },
    "baz": {
        "qux": "quux",
        "thud": "fred"  // [!code ++]
    }
}
```

:::

::: details Example 2. Move an Array Element

Original document:

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

```
{
    "foo": [
        "el1",
        "el2"  // [!code --]
        "el3",
        "el4",
        "el2"  // [!code ++]
    ]
}
```

:::

- ### copy <Badge type="info" text="operation" title="operation"/>

  > The operation object MUST contain a `from` member, which is a string containing a JSON Pointer value that references
  the location in the target document to move the value from.

  The `copy` operation copies the value at a specified location to the target location.

::: details Example 1. Copy an Object Member

Original document:

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

```
{
    "foo": {
        "bar": "baz",
        "waldo": "fred"  // [!code hl]
    },
    "baz": {
        "qux": "quux",
        "thud": "fred"  // [!code ++]
    }
}
```

:::

- ### test <Badge type="info" text="operation" title="operation"/>

  > The operation object **MUST** contain a `value` member that conveys the value to be compared to the target
  location's value.

  The `test` operation tests that a value at the target location is equal to a specified value.

::: details Example

Original document:

```
{
    "baz": "qux",  // [!code hl]
    "foo": [
        "a",
        2,  // [!code hl]
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

:::

## JSON Merge Patch

The merge patch format is primarily intended for use with the HTTP PATCH method as a means of describing a set of
modifications to a target resource's content.

A JSON merge patch document describes changes to be made to a target JSON document using a syntax that closely mimics
the document being modified.

Recipients of a merge patch document determine the exact set of changes being requested by **comparing** the content of
the provided patch against the current content of the target document.

- If the provided merge patch contains members that do not appear within the target, those members are added.
- If the target does contain the member, the value is replaced.
- Null values in the merge patch are given special meaning to indicate the removal of existing values in the target.

::: details Example
Original document:

```
{
    "a": "b",  // [!code hl]
    "c": {
        "d": "e",
        "f": "g"  // [!code hl]
    }
}
```

Patch:

```
{
    "a": "z",  // [!code hl]
    "c": {
        "f": null  // [!code hl]
    }
}
```

Result:

```
{
    "a": "z",  // [!code --]
    "a": "b",  // [!code ++]
    "c": {
        "d": "e",
        "f": "g"  // [!code --]
    }
}
```

That is

- the value of `a` in the original document has been **replaced** by the value of `a` in the patch document
- and the `f` member of `c` has been **removed** cause its value is `null` in the patch document.

:::

## Related Projects

### npm

- [fast-json-patch](https://www.npmjs.com/package/fast-json-patch)
- [json8-patch](https://www.npmjs.com/package/json8-patch)

### cargo

- [json_patch](https://crates.io/crates/json_patch)

## References

- [rfc6902: JavaScript Object Notation (JSON) Patch](https://datatracker.ietf.org/doc/html/rfc6902)
- [rfc7396: JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7396)