import { alea } from 'seedrandom'

import { shuffle, ObjectInput, ArrayInput, Direction, Tuple } from '../index'
import * as util from '../util'

import arrayInput from './fixtures/array-input.json'
import objectInput from './fixtures/object-input.json'
import outputAsc from './fixtures/output-asc.json'
import outputDesc from './fixtures/output-desc.json'

describe('shuffling', () => {
  beforeEach(() => {
    // for reproducible tests, use a seeded Math.random replacement. the
    // fixtures are all based on this seed being set before each test case.
    const seed = 'weighted-shuffle'
    const arng = alea(seed)
    Math.random = jest.fn(arng)
  })

  test('object, ascending', () => {
    const fromObject = jest.spyOn(util, 'fromObject')
    const output = shuffle(<ObjectInput>objectInput)
    expect(fromObject.mock.calls).toEqual([[objectInput]])
    expect(output).toEqual(outputAsc)
  })

  test('object, descending', () => {
    const fromObject = jest.spyOn(util, 'fromObject')
    const output = shuffle(<ObjectInput>objectInput, Direction.desc)
    expect(fromObject.mock.calls).toEqual([[objectInput]])
    expect(output).toEqual(outputDesc)
  })

  test('array, ascending', () => {
    const fromArray = jest.spyOn(util, 'fromArray')
    const output = shuffle(<ArrayInput>arrayInput)
    expect(fromArray.mock.calls).toEqual([[arrayInput]])
    expect(output).toEqual(outputAsc)
  })

  test('array, descending', () => {
    const fromArray = jest.spyOn(util, 'fromArray')
    const output = shuffle(<ArrayInput>arrayInput, Direction.desc)
    expect(fromArray.mock.calls).toEqual([[arrayInput]])
    expect(output).toEqual(outputDesc)
  })

  test('strongly typed', () => {
    // @ts-expect-error
    const output: Tuple<string>[] = shuffle([[{ name: 'Maurine' }, 713]])
    expect(output).toHaveLength(1)
  })
})
