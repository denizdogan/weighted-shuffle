import { ArrayInput, Tuple, ObjectInput } from '.'

export function weightFunc(weight: number): number {
  // random(0, 1)^(1/w)
  return Math.pow(Math.random(), 1 / weight)
}

export function fromArray<T = any>(input: ArrayInput<T>): Tuple<T>[] {
  // apply weightFunc to the second element of every tuple.
  return input.map((tuple: Tuple<T>): Tuple => [tuple[0], weightFunc(tuple[1])])
}

export function fromObject(input: ObjectInput): Tuple[] {
  // apply weightFunc to each value in the object.
  const tuples: Tuple[] = []
  for (const value in input) {
    if (input.hasOwnProperty(value)) {
      tuples.push([value, weightFunc(input[value])])
    }
  }
  return tuples
}
