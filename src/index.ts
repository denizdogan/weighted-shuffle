import { fromArray, fromObject } from './util'

export type Tuple<T = any> = [T, number]
export enum Direction {
  asc = 'asc',
  desc = 'desc'
}
export interface ObjectInput {
  [value: string]: number
}
export type ArrayInput<T = any> = Tuple<T>[]

export default function shuffle<T = any>(
  input: ObjectInput | ArrayInput<T>,
  direction: Direction = Direction.asc
): Tuple<T>[] {
  const tuples: Tuple<T>[] = Array.isArray(input)
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
