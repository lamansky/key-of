'use strict'

const assert = require('assert')
const keyOf = require('.')

const elseReturn = Symbol('elseReturn')

describe('keyOf()', function () {
  it('should return the Map key of a single value', function () {
    assert.strictEqual(keyOf(new Map([['key', 'value']]), 'value'), 'key')
  })

  it('should return the Object key of a single value', function () {
    assert.strictEqual(keyOf({key: 'value'}, 'value'), 'key')
  })

  it('should return only the first Map key of a single value', function () {
    assert.strictEqual(keyOf(new Map([['key1', 'value'], ['key2', 'value']]), 'value'), 'key1')
  })

  it('should return undefined for a non-existent value', function () {
    assert.strictEqual(typeof keyOf(new Map([['key', 'value']]), 'other'), 'undefined')
  })

  it('should return the provided `elseReturn` for a non-existent value', function () {
    assert.strictEqual(keyOf(new Map([['key', 'value']]), 'other', {elseReturn}), elseReturn)
  })

  it('should treat an array as a single value', function () {
    const value = ['value']
    assert.strictEqual(keyOf(new Map([['key', value]]), value), 'key')
  })

  it('should return the Map key of an equivalent value when `loose` is true', function () {
    assert.strictEqual(typeof keyOf(new Map([['key', {value: true}]]), {value: true}), 'undefined')
    assert.strictEqual(typeof keyOf(new Map([['key', {value: true}]]), {}, {loose: true}), 'undefined')
    assert.strictEqual(keyOf(new Map([['key', {value: true}]]), {value: true}, {loose: true}), 'key')
  })

  it('should favor strictly-identical values if `preferStrict` is true', function () {
    const arr1 = []
    const arr2 = []
    assert.strictEqual(keyOf([arr1, arr2], arr2, {loose: true}), 0)
    assert.strictEqual(keyOf([arr1, arr2], arr2, {loose: true, preferStrict: true}), 1)
  })

  it('should return the last matching key if `reverse` is true', function () {
    assert.strictEqual(keyOf(new Map([['key1', 'value'], ['key2', 'value']]), 'value', {reverse: true}), 'key2')
  })

  it('should support the bind operator', function () {
    assert.strictEqual(keyOf.call(new Map([['key', 'value']]), 'value'), 'key')
  })

  describe('#any()', function () {
    it('should return the first key associated with any of the provided values', function () {
      const map = new Map([['a', 1], ['b', 2]])
      assert.strictEqual(keyOf.any(map, [2, 1]), 'a')
    })
  })
})
