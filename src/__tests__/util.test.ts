import * as util from '../util'

describe('utilities', () => {
  describe('fromArray', () => {
    test('empty input -> empty output', () => {
      expect(util.fromArray([])).toEqual([])
    })
  })

  describe('fromObject', () => {
    test('empty input -> empty output', () => {
      expect(util.fromObject({})).toEqual([])
    })

    test('only enumerable properties are included', () => {
      const input = {}
      Object.defineProperty(input, 'a', { value: 1, enumerable: true })
      Object.defineProperty(input, 'b', { value: 2 })
      const output = util.fromObject(input)
      expect(output).toHaveLength(1)
      expect(output[0][0]).toEqual('a')
    })
  })
})
