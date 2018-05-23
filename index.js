'use strict'

const entries = require('entries-iterator')
const equals = require('equals')
const iterify = require('iterify')
const otherwise = require('otherwise')
const xfn = require('xfn')

const notFound = Symbol('notFound')

module.exports = xfn(
  {pluralArg: 1, pluralProp: 'any'},
  (collection, valuesToFind, {loose, looselyEquals = equals, preferStrict, ...options} = {}) => {
    valuesToFind = iterify(valuesToFind)
    let looseMatch = notFound
    for (const [k, v] of entries(collection, options)) {
      for (const f of valuesToFind) {
        if (v === f) return k
        if (loose && looselyEquals(v, f)) {
          if (preferStrict) {
            if (looseMatch === notFound) { looseMatch = k; break }
          } else {
            return k
          }
        }
      }
    }
    return looseMatch === notFound ? otherwise(options) : looseMatch
  }
)
