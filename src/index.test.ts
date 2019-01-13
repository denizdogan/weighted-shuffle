import shuffle, { ObjectInput, ArrayInput } from './index'

describe('shuffling an object', () => {
  test('when object is empty, empty array is returned', () => {
    expect(shuffle({})).toEqual([])
  })

  test('when object has one property, that property is returned', () => {
    expect(shuffle({ a: 1 })).toEqual(['a'])
  })

  test('when object has many properties, all properties are returned', () => {
    const input: ObjectInput = {
      anna: 10,
      bob: 20,
      chris: 30,
      diana: 40
    }
    const output = shuffle(input)
    expect(output).toContain('anna')
    expect(output).toContain('bob')
    expect(output).toContain('chris')
    expect(output).toContain('diana')
    expect(output).toHaveLength(Object.keys(input).length)
  })

  // TODO: test that the weighted shuffle works
})

describe('shuffling an array', () => {
  test('when array is empty, empty array is returned', () => {
    expect(shuffle([])).toEqual([])
  })

  test('when array has one element, that element is returned', () => {
    expect(shuffle([['a', 1]])).toEqual(['a'])
  })

  test('when array has many elements, all keys are returned', () => {
    const input: ArrayInput = [
      ['anna', 10],
      ['bob', 20],
      ['chris', 30],
      ['diana', 40]
    ]
    const output = shuffle(input)
    expect(output).toContain('anna')
    expect(output).toContain('bob')
    expect(output).toContain('chris')
    expect(output).toContain('diana')
    expect(output).toHaveLength(input.length)
  })

  // TODO: test that the weighted shuffle works
  // TODO: test that the input array remains untouched
})
