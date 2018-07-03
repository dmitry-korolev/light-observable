import { Observable } from '../../Observable'
import { filter } from '../filter'
import { map } from '../map'
import { pipe } from '../pipe'
import { share } from '../share'

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
})
