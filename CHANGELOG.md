# Changelog

## Unreleased

- Publish native ESM and CommonJS builds with conditional type declarations using Vite library mode and a declaration plugin.
- Build automatically before packing or publishing; mark the package as side-effect free.
- Accept readonly tuple inputs and literal sort directions; replace the Direction enum with an as const object.
- Infer string keys for object inputs and preserve iterable value types.
- Accept maps, sets of weighted entries, and other finite synchronous iterables while preserving value types and key identity.
- Upgrade to TypeScript 7 and replace Jest/ts-jest with Vitest and V8 coverage.
- Replace Prettier with Biome for formatting, linting, import organization, and staged-file checks.
- Check types, code style, tests, and builds in CI.
- Manage Node.js and bundled npm through mise with cross-platform lockfile checksums; share the mise ci task between local development and GitHub Actions.
- Improve the package description and keywords for weighted random shuffling and sampling.
- Breaking: return values by default; opt into [value, score] tuples with includeScores: true.
- Breaking: replace the positional direction argument with a configuration object accepting direction and includeScores.
- Breaking: require Node.js 22 or newer and target ES2022; internal deep imports are no longer exported.
- Breaking: callers relying on unchecked any defaults or incorrect object-input generic results must narrow or correct their types.
- Breaking: enum-member type references such as Direction.asc must use typeof Direction.asc instead.
- Breaking: remove the exported Tuple alias; use [T, number] directly.
- Breaking: input types are private; only shuffle and the Direction constant are exported.
- Breaking: shuffle's optional explicit type argument now describes the entire input, not the array value; normally it can be inferred.

## 1.0.0 - April 22, 2021

- Support for strong typing (PR #1)
- Update lockfile version 1 to 2
- Update a bunch of vulnerable dependencies

## 0.2.0 - January 15, 2019

- Refactor code base
- Use positive output weights when descending
- Improve test suite
- Improve documentation
- Remove Rollup

## 0.1.2 - January 14, 2019

- Fix CommonJS export

## 0.1.0 - January 14, 2019

- Revamped implementation
- Increase performance by more than 2x

## 0.0.2 - January 13, 2019

- Compile for ES5
- Remove minification
- Fix packaging issues

## 0.0.1 - January 12, 2019

- Initial release.
