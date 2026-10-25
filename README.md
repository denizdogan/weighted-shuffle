# weighted-shuffle

[![Coverage](https://codecov.io/gh/denizdogan/weighted-shuffle/graph/badge.svg)](https://app.codecov.io/gh/denizdogan/weighted-shuffle)

Shuffle weighted values without modifying the input. Node.js 22+, TypeScript types included, no runtime dependencies.

## Install

```sh
npm install weighted-shuffle
```

## Usage

```ts
import { shuffle } from "weighted-shuffle";

const weights = { apple: 1, banana: 2, cherry: 3 };
console.log(shuffle(weights));
// Example output (varies each run):
// ["banana", "apple", "cherry"]
```

Use positive, finite weights. The optional second argument accepts:

- `direction`: `"asc"` (default) sorts scores low to high; higher-weight items tend to appear later. `"desc"` reverses that order.
- `includeScores`: `false` (default) returns values only; `true` returns `[value, score]` tuples.

```ts
console.log(shuffle(weights, { includeScores: true }));
// Example output (varies each run):
// [
//   ["banana", 0.6655671011483644],
//   ["apple", 0.9086854240720301],
//   ["cherry", 0.9249868712792301]
// ]
```

Scores are internal random ranking keys—not the original weights or probabilities.

For values other than strings, pass `[value, weight]` entries. Arrays, maps, sets of entries, and other finite iterables are supported:

```ts
const weighted: [{ id: number }, number][] = [
	[{ id: 1 }, 2],
	[{ id: 2 }, 1],
];

shuffle(weighted);
shuffle(new Map(weighted));
shuffle(new Set(weighted));
```

Map keys retain their original types and identity. Generators and iterators are consumed; collections are not modified.

CommonJS is also supported:

```ts
const { shuffle } = require("weighted-shuffle");
```

Based on [Efraimidis–Spirakis weighted random sampling](http://utopia.duth.gr/~pefraimi/research/data/2007EncOfAlg.pdf).
