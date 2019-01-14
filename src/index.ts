export type Value = any
export type Weight = number
export type Direction = 'asc' | 'desc'
export interface ObjectInput {
  [value: string]: Weight
}
export type Modifier = (x: Weight) => Weight
export type Pair = [Value, Weight]
export type ArrayInput = Pair[]
export type Input = ObjectInput | ArrayInput
export type Output = Value[]
export type WeightFunction = (weight: number) => number

function fromArray(input: ArrayInput, weightFunc: WeightFunction): Pair[] {
  // apply weightFunc to the second element of every pair. we could use
  // destructuring, but it's not widely supported and the transpiled code
  // would be slow.
  return input.map((pair: Pair): Pair => [pair[0], weightFunc(pair[1])])
}

function fromObject(input: ObjectInput, weightFunc: WeightFunction): Pair[] {
  const pairs: Pair[] = []
  // we could use Object.entries().map but it's slow
  for (const value in input) {
    if (input.hasOwnProperty(value)) {
      pairs.push([value, weightFunc(input[value])])
    }
  }
  return pairs
}

function shuffle(input: Input, direction: Direction = 'asc'): Output {
  const weightFunc =
    direction === 'desc'
      ? (weight: number) => -Math.pow(Math.random(), 1 / weight)
      : (weight: number) => Math.pow(Math.random(), 1 / weight)
  const pairs: Pair[] = Array.isArray(input)
    ? fromArray(input, weightFunc)
    : fromObject(input, weightFunc)
  pairs.sort((a, b) => {
    const aw = a[1]
    const bw = b[1]
    if (aw > bw) return 1
    if (aw < bw) return -1
    return 0
  })
  return pairs
}

export default shuffle
export { shuffle }
