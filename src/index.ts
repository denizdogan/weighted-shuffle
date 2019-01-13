export type Direction = 'asc' | 'desc'

export type Pair = [string, number]

export interface ObjectInput {
  [key: string]: number
}

export type Modifier = (x: number) => number

export type ArrayInput = Pair[]

export type Input = ObjectInput | ArrayInput

export type Output = string[]

/**
 * Shuffle an array or object according to weights.
 * @param input Input value (object or array)
 * @param direction Direction of the output
 * @returns Array of properties
 */
export default function shuffle(
  input: Input,
  direction: Direction = 'asc'
): Output {
  // normalize Input to Pair[]
  let pairs: Pair[]
  if (Array.isArray(input)) {
    pairs = input.slice(0)
  } else {
    pairs = Object.entries(input)
  }

  // calculate the "power" of each entry.  the power is the weight with some
  // randomization added into the mix.  we could do this in the next part
  // where we sort according to power, but then we would need to calculate the
  // power twice or more for each entry.
  const modifier: Modifier = direction === 'asc' ? x => x : x => -x
  const modifier: Modifier = direction === 'desc' ? x => -x : x => x
  const powers: [number, number][] = []
  for (const [idx, [, weight]] of pairs.entries()) {
    const power = modifier(Math.pow(Math.random(), 1 / weight))
    powers.push([power, idx])
  }

  // sort the pairs by their power.
  powers.sort(([power1], [power2]) => {
    if (power1 > power2) return 1
    if (power1 < power2) return -1
    return 0
  })

  return powers.map(([, idx]) => pairs[idx][0])
}
