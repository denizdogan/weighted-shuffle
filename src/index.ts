export type Direction = 'asc' | 'desc'

export interface ObjectInput {
  [key: string]: number
}

export type Modifier = (x: number) => number

export type ArrayInput = [string, number][]

export type Input = ObjectInput | ArrayInput

export type Output = string[]

/**
 * Shuffle an array or object according to weights.
 * @param input Input value (object or array)
 * @param direction Direction of the output
 * @returns Array of values
 */
export default function(input: Input, direction: Direction = 'asc'): Output {
  // normalize Input to [string, number][]
  let pairs: [string, number][]
  if (Array.isArray(input)) {
    pairs = input.slice(0)
  } else {
    pairs = []
    for (const prop in input) {
      if (input.hasOwnProperty(prop)) {
        const value = input[prop]
        pairs.push([prop, value])
      }
    }
  }

  const modifier: Modifier = direction === 'desc' ? x => -x : x => x
  pairs = pairs.map(
    (pair): [string, number] => [
      pair[0],
      modifier(Math.pow(Math.random(), 1 / pair[1]))
    ]
  )

  // sort the pairs by their power.
  pairs.sort((a, b) => {
    const aw = a[1]
    const bw = b[1]
    if (aw > bw) return 1
    if (aw < bw) return -1
    return 0
  })

  return pairs.map(pair => pair[0])
}
