import { filter } from '../filter'
import { map } from '../map'
import { pipe } from '../pipe'
import { share } from '../share'
import { createSubject } from '../subject'

describe('(Observable) share', () => {
  it('should multicast values', () => {
    const [stream, sink] = createSubject<number>()
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
    )(stream)

    const sub1 = o.subscribe()
    const sub2 = o.subscribe()
    const sub3 = o.subscribe()

    sink.next(2)

    expect(filterCount).toEqual(1)
    expect(mapCount).toEqual(1)
    expect(mapCount2).toEqual(3)
  })
})
