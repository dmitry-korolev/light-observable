import { Observable } from '../../core/Observable'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { tap as tapOperator } from '../../operators/tap'
import { of } from '../of'
import { tap } from '../tap'

describe('(Extra) tap', () => {
  commonTest(tap(() => undefined, of(1, 2)), tapOperator(() => undefined)(of(1, 2)), [1, 2])
  it('should perform side effect', () => {
    const resultA: any[] = []
    const resultB: any[] = []
    const o = Observable.of(1, 2).pipe(tapOperator((x) => resultA.push(x * 2)))

    expect(resultA.length).toBe(0)
    expect(resultB.length).toBe(0)

    o.subscribe((x) => resultB.push(x))

    expect(resultA).toEqual([2, 4])
    expect(resultB).toEqual([1, 2])
  })

  it('should ignore return value', () => {
    const resultA: any[] = []
    const resultB: any[] = []
    const o = Observable.of(1, 2).pipe(tapOperator((x) => x * 2))

    expect(resultA.length).toBe(0)
    expect(resultB.length).toBe(0)

    o.subscribe((x) => resultB.push(x))

    expect(resultA.length).toEqual(0)
    expect(resultB).toEqual([1, 2])
  })
})
