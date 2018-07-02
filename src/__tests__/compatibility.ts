import { createStore } from 'redux'
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

  it('should be compatible with redux', async () => {
    const reduxStore = createStore((state: any[] = [], event) => state.concat(event))
    const result: any[] = []
    const o = Observable.from(reduxStore as any).subscribe((x) => result.push(x))

    await null
    expect(result.length).toEqual(1)

    reduxStore.dispatch({ type: 'test' })
    expect(result.length).toEqual(2)
    expect(result[1][1]).toEqual({ type: 'test' })

    o.unsubscribe()

    reduxStore.dispatch({ type: 'test2' })
    expect(result.length).toEqual(2)
  })
})
