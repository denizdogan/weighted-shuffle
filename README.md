# `weighted-shuffle`

Perform a weighted shuffle on a collection. Based on the algorithms described in [Weighted Random Sampling (2005; Efraimidis, Spirakis)](http://utopia.duth.gr/~pefraimi/research/data/2007EncOfAlg.pdf).

- Zero dependencies
- Tiny footprint (271 B gzipped)
- TypeScript declarations

## Installation

```sh
$ npm i weighted-shuffle
```

## Usage

The package exports just one function, `shuffle`. It takes either an object where each enumerable property is a value and its corresponding key is the weight, _or_ an array of arrays where the first element is the value and the second value is the weight.

### Examples

```js
import shuffle from 'weighted-shuffle'

// below are example outputs. there is
// some randomness taking place.

shuffle({
  anna: 10,
  bob: 20,
  chris: 30,
  diana: 40
}) // -> ['anna', 'chris', 'bob', 'diana']

shuffle([
  ['anna', 10],
  ['bob', 20],
  ['chris', 30],
  ['diana', 40]
]) // -> ['anna', 'chris', 'diana', 'bob']
```

## TODO

- Finish the test suite
- Implement benchmarks
