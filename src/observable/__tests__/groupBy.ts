import { Observable } from '../../core/Observable'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { groupBy as groupByOperator, map, mergeMap, scan, takeLast, tap } from '../../operators'
import { groupBy } from '../groupBy'
import { of } from '../of'
import { throwError } from '../throwError'

describe('(Extra) groupBy', () => {
  it('should return Observable', () => {
    expect(groupBy(x => x % 2 === 0, of(0, 1, 2, 3, 4))).toBeInstanceOf(Observable)
    expect(groupByOperator((x: number) => x % 2 === 0)(of(0, 1, 2, 3, 4))).toBeInstanceOf(Observable)
  })

  it('should group values in streams', () => {
    const stream = of(0, 1, 2, 3, 4, 5)
    const observer = getTestObserver()

    groupBy((x) => x % 2 === 0, stream).pipe(
      mergeMap((s, index) => s.pipe(
        scan((r: number[], v) => r.concat(v), []),
        takeLast(1),
        map(result => ({ index, result }))
      ))
    ).subscribe(observer)

    expect(observer.next.mock.calls).toEqual([
      [{ index: 0, result: [0, 2, 4] }],
      [{ index: 1, result: [1, 3, 5] }]
    ])
  })

  it('propagates error from source stream', () => {
    const stream = throwError('error')
    const observer = getTestObserver()

    groupBy((x) => x % 2 === 0, stream).subscribe(observer)

    expect(observer.error).toBeCalledWith('error')
  })
})