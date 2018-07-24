import { Observable } from '../../core/Observable'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { concat as concatOperator } from '../../operators/concat'
import { startWith } from '../../operators/startWith'
import { concat } from '../concat'
import { of } from '../of'

describe('(Extra) concat', () => {
  commonTest(concat(of(1), of(2), of(3)), concatOperator(of(2), of(3))(of(1)), [1, 2, 3])

  it('emits all values from all input observables in order', async () => {
    const outputValues: any[] = []
    const one = new Observable((observer) => {
      observer.next(1)
      observer.next(2)

      setTimeout(() => {
        observer.next(3)
        observer.complete()
      }, 100)
    })

    await new Promise((resolve) => {
      concat(one, Observable.of(4, 5, 6), Observable.of(7, 8, 9)).subscribe({
        next(value) {
          outputValues.push(value)
        },
        complete: resolve
      })
      jest.runOnlyPendingTimers()
    })

    expect(outputValues).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('propagates errors from all inputs', async () => {
    const errorObservable = new Observable((observer) => observer.error('error'))
    const errorHandler1 = jest.fn()
    const errorHandler2 = jest.fn()

    await new Promise((resolve) =>
      concat(errorObservable, Observable.of()).subscribe({
        error: (e) => {
          errorHandler1(e)
          resolve()
        }
      })
    )

    expect(errorHandler1).toHaveBeenCalledWith('error')

    await new Promise((resolve) =>
      concat(Observable.of(), errorObservable).subscribe({
        error: (e) => {
          errorHandler2(e)
          resolve()
        }
      })
    )

    expect(errorHandler2).toHaveBeenCalledWith('error')
  })

  it('returns subscription', () => {
    const o = new Observable((ob) => ob.next(1))
    const subscribe = o.subscribe.bind(o)
    let subA: any
    o.subscribe = (s: any) => {
      subA = subscribe(s)
      jest.spyOn(s, 'unsubscribe')
      return subA
    }

    const subB = o.pipe(startWith([1])).subscribe()

    expect(subA.closed).toBe(false)
    expect(subB.closed).toBe(false)

    subB.unsubscribe()

    expect(subA.closed).toBe(true)
    expect(subB.closed).toBe(true)
  })
})
