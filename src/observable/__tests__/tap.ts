import { Observable } from '../../core/Observable'
import { pipe } from '../../helpers/pipe'
import { tap } from '../../operators/tap'

describe('(Operator) tap', () => {
  it('should perform side effect', () => {
    const resultA: any[] = []
    const resultB: any[] = []
    const o = pipe(tap<number>((x) => resultA.push(x * 2)))(Observable.of(1, 2))

    expect(resultA.length).toBe(0)
    expect(resultB.length).toBe(0)

    o.subscribe((x) => resultB.push(x))

    expect(resultA).toEqual([2, 4])
    expect(resultB).toEqual([1, 2])
  })

  it('should ignore return value', () => {
    const resultA: any[] = []
    const resultB: any[] = []
    const o = pipe(tap<number>((x) => x * 2))(Observable.of(1, 2))

    expect(resultA.length).toBe(0)
    expect(resultB.length).toBe(0)

    o.subscribe((x) => resultB.push(x))

    expect(resultA.length).toEqual(0)
    expect(resultB).toEqual([1, 2])
  })
})
