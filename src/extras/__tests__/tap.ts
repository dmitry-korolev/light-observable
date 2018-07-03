import { pipe } from '../pipe'
import { tap } from '../tap'
import { Observable } from '../../Observable'

describe('(Operator) tap', () => {
  it('should perform side effect', async () => {
    const resultA: any[] = []
    const resultB: any[] = []
    const o = pipe(tap<number>((x) => resultA.push(x * 2)))(Observable.of(1, 2))

    await null

    expect(resultA.length).toBe(0)
    expect(resultB.length).toBe(0)

    o.subscribe((x) => resultB.push(x))

    await null

    expect(resultA).toEqual([2, 4])
    expect(resultB).toEqual([1, 2])
  })

  it('should ignore return value', async () => {
    const resultA: any[] = []
    const resultB: any[] = []
    const o = pipe(tap<number>((x) => x * 2))(Observable.of(1, 2))

    await null

    expect(resultA.length).toBe(0)
    expect(resultB.length).toBe(0)

    o.subscribe((x) => resultB.push(x))

    await null

    expect(resultA.length).toEqual(0)
    expect(resultB).toEqual([1, 2])
  })
})
