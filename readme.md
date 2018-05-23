# key-of

Returns the first key/index at which the specified value is located in a collection.

It’s like `Array.prototype.indexOf()` except it works on Maps/Objects/etc.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i key-of
```

## API

The module exports a `keyOf()` function that has one other function attached to it as a method: `keyOf.any()`.

### `keyOf()`

#### Parameters

1. Bindable: `collection` (Array, Iterator, Object, Map, Set, string, or Typed Array)
2. `valueToFind` (any): The value whose corresponding key or index you want to locate.
3. Optional: Object argument:
    * `arrays` / `maps` / `sets` (arrays of classes/strings): Arrays of classes and/or string names of classes that should be treated as equivalent to `Array`/`Map`/`Set` (respectively).
    * `elseReturn` (any): A value to return in lieu of the key/index if `valueToFind` is not found. Only takes effect if no `elseThrow` is specified. Defaults to `undefined`.
    * `elseThrow` (Error or string): An error to be thrown if `valueToFind` is not found. A string will be wrapped in an `Error` object automatically.
    * `inObj` (boolean): Whether or not to search inherited properties if `collection` is an Object (i.e. not another recognized type). Defaults to `false`.
    * `loose` (boolean): Whether or not to identify values loosely (as defined by `looselyEquals`). Defaults to `false`.
    * `looselyEquals` (function): A callback that accepts two values and returns `true` if they are to be considered equivalent or `false` otherwise. This argument is only used if `loose` is `true`. If omitted, the default behavior will, among other things, consider arrays/objects to be equal if they have the same entries.
    * `preferStrict` (boolean): Only applies if `loose` is `true`. If `true`, then strictly-identical values will be preferred over loosely-equivalent values. Otherwise, the first loosely-equivalent value found will have its key returned, even if a strictly-identical value comes later. Defaults to `false`.
    * `reflectObj` (boolean): Whether or not to use reflection to include non-enumerable Object property values. Only takes effect if `collection` is an Object (i.e. not another recognized type). Defaults to `false`.
    * `reverse` (boolean): Set to `true` to emulate the behavior of `Array.prototype.lastIndexOf()`. Defaults to `false`.

#### Return Value

* Returns the first key or numeric index (depending on the collection type) at which `valueToFind` (or its loose equivalent, if so configured) was found in `collection`.
* If `valueToFind` is not found in `collection`, returns `elseReturn` if set; otherwise `undefined`.

#### Example

```javascript
const keyOf = require('key-of')

const obj = {
  a: 1,
  b: 2,
  c: 2,
  d: {},
  e: {},
}

keyOf(obj, 1) // 'a'
keyOf(obj, 2) // 'b'

keyOf(obj, {}) // undefined
keyOf(obj, {}, {loose: true}) // 'd'
```

### `keyOf.any()`

Use this function to find the first key (in iteration order) that corresponds to any of the given values. The signature is the same as the main function except that the second parameter is called `valuesToFind` and takes an iterable (such as an array or string).

#### Example

```javascript
const keyOf = require('key-of')

const obj = {
  a: 1,
  b: 2,
  c: 2,
  d: {},
  e: {},
}

keyOf.any(obj, [2, 1]) // 'a'
keyOf.any(obj, [1, {}], {loose: true}) // 'a'
```

## Related

* [keys-of](https://github.com/lamansky/keys-of): Same as this module, except it returns all keys/indexes, not just the first.
