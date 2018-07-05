import { of } from '../../observable/of'
import { filter } from '../../operators/filter'
import { forEach } from '../../operators/forEach'
import { map } from '../../operators/map'
import { pipe } from '../pipe'

describe('(Util) pipe', () => {
  it('should return function', () => {
    expect(typeof pipe((x) => x)).toBe('function')
  })

  it('should return same value, if no operators are provided', () => {
    expect(pipe()(1)).toEqual(1)
  })

  it('should call provided function', () => {
    expect(pipe((x: number) => x * 2)(2)).toBe(4)
  })

  it('should pipe functions', () => {
    expect(
      pipe(
        (x: number) => x * 2,
        (x) => x + 10,
        (x) => x / 10
      )(10)
    ).toEqual(3)
  })

  it('should work with streams', async () => {
    const result: number[] = []

    await pipe(
      map((x: number) => x * 3),
      filter((x) => x % 2 === 0),
      forEach((x) => result.push(x))
    )(of(1, 2, 3, 4, 5))

    expect(result).toEqual([6, 12])
  })
})
