import { toArray as toArrayOperator } from '../../operators/toArray'
import { EMPTY } from '../empty'
import { of } from '../of'
import { toArray } from '../toArray'

describe('(Extra) toArray', () => {
  it('returns a promise', () => {
    expect(toArray(of(1))).toBeInstanceOf(Promise)
    expect(toArrayOperator()(of(1))).toBeInstanceOf(Promise)
  })

  it('resolves to an array', async () => {
    const result = await toArray(of(1, 2, 3))
    expect(result).toEqual([1, 2, 3])
  })

  it('resolves to an empty array from an empty observable', async () => {
    const result = await toArray(EMPTY)
    expect(result).toEqual([])
  })

  it('works correctly with arrays', async () => {
    const result = await toArray(of([1], [2], [3]))
    expect(result).toEqual([[1], [2], [3]])
  })
})
