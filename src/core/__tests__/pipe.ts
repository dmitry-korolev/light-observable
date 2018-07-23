import { of } from '../../observable/of'
import { filter } from '../../operators/filter'
import { forEach } from '../../operators/forEach'
import { map } from '../../operators/map'
import { Observable } from '../Observable'
import { testMethodProperty } from './utils'

describe('(Core) pipe', () => {
  it('is a method of Observable.prototype', () => {
    testMethodProperty(Observable.prototype, 'pipe', {
      configurable: true,
      writable: true,
      length: 0
    })
  })

  it('returns same Observable if no operators provided', () => {
    const o = of(1)
    expect(o.pipe()).toBe(o)
  })

  it('should work with streams', async () => {
    const result: number[] = []

    await of(1, 2, 3, 4, 5).pipe(
      map((x: number) => x * 3),
      filter((x) => x % 2 === 0),
      forEach((x) => result.push(x))
    )

    expect(result).toEqual([6, 12])
  })
})
