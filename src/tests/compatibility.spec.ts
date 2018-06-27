import { from as rFrom } from 'rxjs'
import { map as rMap } from 'rxjs/operators'
import { Observable } from '../Observable'

describe('compatibility', () => {
  it('should be compatible with RxJS', async () => {
    const o = Observable.of(1, 2, 3)
    const ro = rFrom(o)
    const result: number[] = []

    await ro.pipe(rMap((x) => x * 10)).forEach((x) => result.push(x))

    expect(result).toEqual([10, 20, 30])
  })

  it('should be compatible with observable-operators', () => {})
})
