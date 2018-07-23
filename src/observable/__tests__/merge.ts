import { Observable } from '../../core/Observable'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { merge as mergeOperator } from '../../operators/merge'
import { merge } from '../merge'
import { of } from '../of'
import { createSubject } from '../subject'

describe('(Extra) merge', () => {
  const streamA = of(1, 2)
  const streamB = of(3, 4)
  const streamC = of(5, 6)
  commonTest(merge(streamA, streamB, streamC), mergeOperator(streamB, streamC)(streamA), [
    1,
    2,
    3,
    4,
    5,
    6
  ])

  it('propagates errors from all inputs', async () => {
    const errorObservable = new Observable((observer) => observer.error('error'))
    const errorHandler1 = jest.fn()
    const errorHandler2 = jest.fn()

    await new Promise((resolve) =>
      merge(Observable.of(1), errorObservable).subscribe({
        error(e) {
          errorHandler1(e)
          resolve()
        }
      })
    )

    expect(errorHandler1).toHaveBeenCalledWith('error')

    await new Promise((resolve) =>
      merge(errorObservable, Observable.of(1)).subscribe({
        error(e) {
          errorHandler2(e)
          resolve()
        }
      })
    )

    expect(errorHandler2).toHaveBeenCalledWith('error')
  })

  it('unsubscribes', () => {
    const [stream, sink] = createSubject()
    const o = merge(stream, Observable.of(1))
    const results: any[] = []

    const sub = o.subscribe((x: any) => results.push(x))
    expect(results).toEqual([1])

    sink.next(2)
    expect(results).toEqual([1, 2])

    sub.unsubscribe()
    sink.next(3)
    expect(results).toEqual([1, 2])
  })
})
