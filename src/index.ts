import { fromArray, fromObject } from './util'

export type Tuple = [any, number]
export enum Direction {
  asc = 'asc',
  desc = 'desc'
}
export interface ObjectInput {
  [value: string]: number
}
export type ArrayInput = Tuple[]

export default function shuffle(
  input: ObjectInput | ArrayInput,
  direction: Direction = Direction.asc
): Tuple[] {
  const tuples: Tuple[] = Array.isArray(input)
    ? fromArray(input)
    : fromObject(input)
  tuples.sort(
    direction === Direction.desc
      ? (a: Tuple, b: Tuple) => b[1] - a[1]
      : (a: Tuple, b: Tuple) => a[1] - b[1]
  )
  return tuples
}

export { shuffle }
