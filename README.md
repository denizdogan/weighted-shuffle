# `weighted-shuffle`

Perform a non-destructive weighted shuffle on a collection. Based on the algorithms described in [Weighted Random Sampling (2005; Efraimidis, Spirakis)](http://utopia.duth.gr/~pefraimi/research/data/2007EncOfAlg.pdf).

![](https://img.shields.io/bundlephobia/minzip/weighted-shuffle.svg?style=for-the-badge) ![](https://img.shields.io/david/denizdogan/weighted-shuffle.svg?style=for-the-badge) ![](https://img.shields.io/travis/com/denizdogan/weighted-shuffle.svg?style=for-the-badge)

## Installation

```sh
$ npm i weighted-shuffle
```

TypeScript declarations are included.

## Usage

The package exports one function, `shuffle`, which takes two arguments. The first argument is the input collection, which is an object on the form `{value: weight, ...}`, _or_ an array of tuples on the form `[[value, weight], ...]`. The second argument is optional and either `'asc'` or `'desc'`. See below for examples.

The weight must always be a number. If it's not a number, the behavior of this library is undefined.

Since object property keys must be strings in JavaScipt, the same applies to this package.

In the array-tuple form, the value can be anything. The output is always an array of tuples on the form `[value, weight]` where `weight` is a value between 0 and 1 based on the input weight.

## Examples

```sh
$ node
> const { shuffle } = require('weighted-shuffle')
undefined
> shuffle({ a: 1, b: 2, c: 3, d: 4 })
[ [ 'a', 0.3332369734469953 ],
  [ 'd', 0.4435102443860357 ],
  [ 'b', 0.634610481335515 ],
  [ 'c', 0.6893187374490146 ] ]
> shuffle([['a', 1], ['b', 2], ['c', 3], ['d', 4]])
[ [ 'a', 0.17752200849829158 ],
  [ 'd', 0.4915930588445954 ],
  [ 'b', 0.5257541251818763 ],
  [ 'c', 0.8857869178489653 ] ]
> shuffle({ a: 1, b: 2, c: 3, d: 4 }, 'desc')
[ [ 'b', 0.8705423064592988 ],
  [ 'c', 0.729363245199407 ],
  [ 'd', 0.6693826180657991 ],
  [ 'a', 0.25133205081259735 ] ]
```

## Contributing

- Make a PR!
