# `weighted-shuffle`

Perform a weighted shuffle on a collection. Based on the algorithms described in [Weighted Random Sampling (2005; Efraimidis, Spirakis)](http://utopia.duth.gr/~pefraimi/research/data/2007EncOfAlg.pdf).

![](https://img.shields.io/bundlephobia/minzip/weighted-shuffle.svg?style=for-the-badge) ![](https://img.shields.io/david/denizdogan/weighted-shuffle.svg?style=for-the-badge)

## Installation

```sh
$ npm i weighted-shuffle
```

## Usage

The package exports just one function. It takes either an object where each enumerable property is a value and its corresponding key is the weight, _or_ an array of arrays where the first element is the value and the second element is the weight.

### Examples

```js
import shuffle from 'weighted-shuffle'
// const { shuffle } = require('weighted-shuffle')

// shuffle the properties of an object
shuffle({
  a: 10,
  b: 20,
  c: 30,
  d: 40
}) // -> ['a', 'c', 'b', 'd']

// shuffle a list of tuples
shuffle([
  ['a', 10],
  ['b', 20],
  ['c', 30],
  ['d', 40]
]) // -> ['a', 'c', 'd', 'b']

// shuffle and order the result in descending order
// (default is 'asc')
shuffle({
  a: 1,
  b: 100,
  c: 10000
}, 'desc') // -> ['c', 'b', 'a']
```

## TODO

- Finish the test suite
- Implement benchmarks
