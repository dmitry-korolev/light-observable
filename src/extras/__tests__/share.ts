import { Observable } from '../../Observable'
import { filter } from '../filter'
import { map } from '../map'
import { pipe } from '../pipe'
import { share } from '../share'
import { createSubject } from '../subject'
import { tap } from '../tap'

describe('(Observable) share', () => {
  it('should multicast values', async () => {
    let filterCount = 0
    let mapCount = 0
    let mapCount2 = 0

    const o = pipe(
      filter((x: number) => {
        filterCount++
        return x % 2 === 0
      }),
      map((x) => {
        mapCount++
        return x * 2
      }),
      share,
      map((x) => {
        mapCount2++
        return x * 2
      })
    )(Observable.of(2))

    await null

    expect(filterCount).toEqual(0)
    expect(mapCount).toEqual(0)
    expect(mapCount2).toEqual(0)

    const sub1 = o.subscribe()
    const sub2 = o.subscribe()
    const sub3 = o.subscribe()

    await null

    expect(filterCount).toEqual(1)
    expect(mapCount).toEqual(1)
    expect(mapCount2).toEqual(3)
  })

  it('should unsubscribe from source, when there is no subscribers left', async () => {
    const [stream, sink] = createSubject()
    let count = 0
    let countS = 0

    const o = pipe(
      tap(() => count++),
      share
    )(stream)

    stream.subscribe(() => countS++)

    await null
    expect(count).toEqual(0)
    expect(countS).toEqual(0)

    sink.next(1)
    expect(count).toEqual(0)
    expect(countS).toEqual(1)

    const sub1 = o.subscribe()
    const sub2 = o.subscribe()
    const sub3 = o.subscribe()

    await null

    sink.next(2)
    expect(count).toEqual(1)
    expect(countS).toEqual(2)

    sub1.unsubscribe()
    sink.next(3)
    expect(count).toEqual(2)
    expect(countS).toEqual(3)

    sub2.unsubscribe()
    sub3.unsubscribe()
    sink.next(4)
    expect(count).toEqual(2)
    expect(countS).toEqual(4)
  })
})
