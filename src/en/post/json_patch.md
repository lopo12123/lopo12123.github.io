---
layout: doc

# custom frontmatter properties
name: JSON Patch
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

- ### remove <Badge type="info" text="operation" title="operation"/>

  The `remove` operation removes the value at the target location. The target location **MUST** exist for the operation
  to be successful.

- ### replace <Badge type="info" text="operation" title="operation"/>

  > The operation object **MUST** contain a `value` member whose content specifies the replacement value.

  The `replace` operation replaces the value at the target location with a new value.

- ### move <Badge type="info" text="operation" title="operation"/>

  > The operation object MUST contain a `from` member, which is a string containing a JSON Pointer value that references
  the location in the target document to move the value from.

  The `move` operation removes the value at a specified location and adds it to the target location.

- ### copy <Badge type="info" text="operation" title="operation"/>

  > The operation object MUST contain a `from` member, which is a string containing a JSON Pointer value that references
  the location in the target document to move the value from.

  The `copy` operation copies the value at a specified location to the target location.

- ### test <Badge type="info" text="operation" title="operation"/>

  > The operation object **MUST** contain a `value` member that conveys the value to be compared to the target
  location's value.

  The `test` operation tests that a value at the target location is equal to a specified value.

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

For example, given the following original JSON document:

```json
{
    "a": "b",
    "c": {
        "d": "e",
        "f": "g"
    }
}
```

with the following merge patch document:

```json
{
    "a": "z",
    "c": {
        "f": null
    }
}
```

the resulting JSON document would be:

```json
{
    "a": "z",
    "c": {
        "d": "e"
    }
}
```

that is, the value of `a` in the original document has been replaced, and the `f` member of `c` has been removed.

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

## Related Projects

### npm

- [fast-json-patch](https://www.npmjs.com/package/fast-json-patch)
- [json8-patch](https://www.npmjs.com/package/json8-patch)

### cargo

- [json_patch](https://crates.io/crates/json_patch)

## References

- JavaScript Object Notation (JSON) Patch -- [rfc6902](https://datatracker.ietf.org/doc/html/rfc6902)
- JSON Merge Patch -- [rfc7396](https://datatracker.ietf.org/doc/html/rfc7396)