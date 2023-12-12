---
title: JSON Patch
date: 2023-12-12 17:55:38
tags:
  - RFC
categories:
  - RFC Read
---

JSON Patch defines a JSON document structure for expressing a sequence of operations to apply to a JavaScript Object Notation(JSON) document. It is suitable for use with the HTTP PATCH method. The `application/json-patch+json` media type is used to identify such patch documents.

<!-- more -->

Operation objects **MUST** have exactly one `op` member, whose value indicates the operation to perform. Its value **MUST** be one of `add`, `remove`, `replace`, `move`, `copy`, or `test`; other values are errors.
Additionally, operation objects **MUST** have exactly one `path` member. That member's value is a string containing a [JSON-Pointer](https://datatracker.ietf.org/doc/html/rfc6901) that references a location within the target document where the operation is performed.

## JavaScript Object Notation (JSON) Patch


## Related Projects

### npm

- [fast-json-patch](https://www.npmjs.com/package/fast-json-patch)
- [json8-patch](https://www.npmjs.com/package/json8-patch)

### cargo

- [json_patch](https://crates.io/crates/json_patch)

## References

- [rfc6902: JavaScript Object Notation (JSON) Patch](https://datatracker.ietf.org/doc/html/rfc6902)
- [rfc7396: JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7396)


