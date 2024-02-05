---
title: JSON Patch
date: 2023-12-12 17:55:38
tags:
  - RFC
categories:
  - RFC
---

JSON Patch defines a JSON document structure for expressing a sequence of operations to apply to a JavaScript Object Notation(JSON) document. It is suitable for use with the HTTP PATCH method. The `application/json-patch+json` media type is used to identify such patch documents.

<!-- more -->

## JavaScript Object Notation (JSON) Patch

Operation objects **MUST** have exactly one `op` member, whose value indicates the operation to perform. Its value **MUST** be one of `add`, `remove`, `replace`, `move`, `copy`, or `test`; other values are errors.

Additionally, operation objects **MUST** have exactly one `path` member. That member's value is a string containing a [JSON-Pointer](https://datatracker.ietf.org/doc/html/rfc6901) that references a location within the target document where the operation is performed.

### add

> The operation object **MUST** contain a `value` member whose content specifies the value to be added.

The `add` operation performs one of the following functions, depending upon what the target location references:

- If the target location specifies an array index, a new value is inserted into the array at the specified index.
- If the target location specifies an object member that does not already exist, a new member is added to the object.
- If the target location specifies an object member that does exist, that member's value is replaced.

**Example 1**. Add to an Object
{% tabs json-patch-add-1 %}
<!-- tab Original -->

```json
{
    "foo": "bar"
}
```

<!-- endtab -->
<!-- tab Patch -->

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

<!-- endtab -->
<!-- tab Result -->

```json
{
    "foo": "bar",
    "plain": "plain value",
    "complex": {
        "complex key": "complex value"
    }
}
```

<!-- endtab -->
{% endtabs %}

**Example 2**. Add to an Array (1)
{% tabs json-patch-add-2 %}
<!-- tab Original -->

```json
{
    "foo": [
        "el1",
        "el2"
    ]
}
```

<!-- endtab -->
<!-- tab Patch -->

```json
[
    {
        "op": "add",
        "path": "/foo/1",
        "value": "el-ext"
    }
]
```

<!-- endtab -->
<!-- tab Result -->

```json
{
    "foo": [
        "el1",
        "el-ext",
        "el2"
    ]
}
```

<!-- endtab -->
{% endtabs %}

**Example 3**. Add to an Array (2)
{% tabs json-patch-add-3 %}
<!-- tab Original -->

```json
{
    "foo": [
        "el1"
    ]
}
```

<!-- endtab -->
<!-- tab Patch -->

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

<!-- endtab -->
<!-- tab Result -->

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

<!-- endtab -->
{% endtabs %}

### remove

> The `remove` operation removes the value at the target location. The target location **MUST** exist for the operation to be successful.

**Example 1**. Remove from an Object
{% tabs json-patch-remove-1 %}
<!-- tab Original -->

```json
{
    "foo": "bar",
    "baz": "qux"
}
```

<!-- endtab -->
<!-- tab Patch -->

```json
[
    {
        "op": "remove",
        "path": "/baz"
    }
]
```

<!-- endtab -->
<!-- tab Result -->

```json
{
    "foo": "bar"
}
```

<!-- endtab -->
{% endtabs %}

**Example 2**. Remove from an Array
{% tabs json-patch-remove-2 %}
<!-- tab Original -->

```json
{
    "foo": [
        "el1",
        "el2",
        "el3"
    ]
}
```

<!-- endtab -->
<!-- tab Patch -->

```json
[
    {
        "op": "remove",
        "path": "/foo/1"
    }
]
```

<!-- endtab -->
<!-- tab Result -->

```json
{
    "foo": [
        "el1",
        "el3"
    ]
}
```

<!-- endtab -->
{% endtabs %}

### replace

> The operation object **MUST** contain a `value` member whose content specifies the replacement value.

The `replace` operation replaces the value at the target location with a new value.

**Example 1**. Replace in an Object
{% tabs json-patch-replace-1 %}
<!-- tab Original -->

```json
{
    "foo": "bar",
    "baz": "qux"
}
```

<!-- endtab -->
<!-- tab Patch -->

```json
[
    {
        "op": "replace",
        "path": "/foo",
        "value": "boo"
    }
]
```

<!-- endtab -->
<!-- tab Result -->

```json
{
    "foo": "boo",
    "baz": "qux"
}
```

<!-- endtab -->
{% endtabs %}

**Example 2**. Replace in an Array
{% tabs json-patch-replace-2 %}
<!-- tab Original -->

```json
{
    "foo": [
        "el1",
        "el2",
        "el3"
    ]
}
```

<!-- endtab -->
<!-- tab Patch -->

```json
[
    {
        "op": "replace",
        "path": "/foo/1",
        "value": "el-ext"
    }
]
```

<!-- endtab -->
<!-- tab Result -->

```json
{
    "foo": [
        "el1",
        "el-ext",
        "el3"
    ]
}
```

<!-- endtab -->
{% endtabs %}

### move

> The operation object MUST contain a `from` member, which is a string containing a JSON Pointer value that references the location in the target document to move the value from.

The `move` operation removes the value at a specified location and adds it to the target location.

**Example 1**. Move in an Object

{% tabs json-patch-move-1 %}
<!-- tab Original -->

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

<!-- endtab -->
<!-- tab Patch -->

```json
[
    {
        "op": "move",
        "from": "/foo/waldo",
        "path": "/baz/thud"
    }
]
```

<!-- endtab -->
<!-- tab Result -->

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

<!-- endtab -->
{% endtabs %}

**Example 2**. Move in an Array

{% tabs json-patch-move-2 %}
<!-- tab Original -->

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

<!-- endtab -->
<!-- tab Patch -->

```json
[
    {
        "op": "move",
        "from": "/foo/1",
        "path": "/foo/3"
    }
]
```

<!-- endtab -->
<!-- tab Result -->

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

<!-- endtab -->
{% endtabs %}

### copy

> The operation object MUST contain a `from` member, which is a string containing a JSON Pointer value that references the location in the target document to move the value from.

The `copy` operation copies the value at a specified location to the target location.

**Example 1**. Copy an Object Member
{% tabs json-patch-copy-1 %}
<!-- tab Original -->

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

<!-- endtab -->
<!-- tab Patch -->

```json
[
    {
        "op": "copy",
        "from": "/foo/waldo",
        "path": "/baz/thud"
    }
]
```

<!-- endtab -->
<!-- tab Result -->

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

<!-- endtab -->
{% endtabs %}

### test

> The operation object **MUST** contain a `value` member that conveys the value to be compared to the target location's value.

The `test` operation tests that a value at the target location is equal to a specified value.

**Example 1**. Test Example

{% tabs json-patch-test %}
<!-- tab Original -->

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

<!-- endtab -->
<!-- tab Patch -->

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

<!-- endtab -->
<!-- tab Result -->

`successful`

<!-- endtab -->
{% endtabs %}

## JSON Merge Patch

The merge patch format is primarily intended for use with the HTTP PATCH method as a means of describing a set of modifications to a target resource's content.

A JSON merge patch document describes changes to be made to a target JSON document using a syntax that closely mimics the document being modified.

Recipients of a merge patch document determine the exact set of changes being requested by **comparing** the content of the provided patch against the current content of the target document.

- If the provided merge patch contains members that do not appear within the target, those members are added.
- If the target does contain the member, the value is replaced.
- Null values in the merge patch are given special meaning to indicate the removal of existing values in the target.

### Example

{% tabs json-merge-patch-1 %}
<!-- tab Original -->

```json
{
    "a": "b",
    "c": {
        "d": "e",
        "f": "g"
    }
}
```

<!-- endtab -->
<!-- tab Patch -->

```json
{
    "a": "z",
    "c": {
        "f": null
    }
}
```

<!-- endtab -->
<!-- tab Result -->

```json
{
    "a": "z",
    "c": {
        "d": "e"
    }
}
```

<!-- endtab -->
{% endtabs %}

That is,

- the value of `a` (`"b"`) in the original document has been **replaced** by the value of `a` (`"z"`) in the patch document
- and a member of `c` (`"f"`) has been **removed** cause its value is `null` in the patch document.

## Related Projects

### nodejs

- [fast-json-patch](https://www.npmjs.com/package/fast-json-patch)
- [json8-patch](https://www.npmjs.com/package/json8-patch)

### rust

- [json_patch](https://crates.io/crates/json_patch)

## References

- [rfc6902: JavaScript Object Notation (JSON) Patch](https://datatracker.ietf.org/doc/html/rfc6902)
- [rfc7396: JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7396)


