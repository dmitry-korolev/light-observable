import { Observable } from '../..'
import { createSubject } from '../../observable'
import { merge } from '../merge'

describe('(Operator) merge', () => {
  it('returns a new Observable', () => {
    expect(merge(Observable.of(1))(Observable.of(1))).toBeInstanceOf(Observable)
  })

  it('emits all values from all input observables', async () => {
    const outputValues: any[] = []

    await new Promise((resolve) =>
      merge(Observable.of(4, 5, 6), Observable.of(7, 8, 9))(Observable.of(1, 2, 3)).subscribe({
        next(value) {
          outputValues.push(value)
        },
        complete: resolve
      })
    )

    expect(outputValues).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('propagates errors from all inputs', async () => {
    const errorObservable = new Observable((observer) => observer.error('error'))
    const errorHandler1 = jest.fn()
    const errorHandler2 = jest.fn()

    await new Promise((resolve) =>
      merge(Observable.of(1))(errorObservable).subscribe({
        error(e) {
          errorHandler1(e)
          resolve()
        }
      })
    )

    expect(errorHandler1).toHaveBeenCalledWith('error')

    await new Promise((resolve) =>
      merge(errorObservable)(Observable.of(1)).subscribe({
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
    const o = merge(stream)(Observable.of(1))
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
