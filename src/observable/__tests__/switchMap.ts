import { Observable } from '../../core/Observable'
import { Observer } from '../../core/types.h'
import { commonTest } from '../../helpers/testHelpers/commonTest'
import { emitAfterTime } from '../../helpers/testHelpers/emitAfterTime'
import { switchMap as switchMapOperator } from '../../operators/switchMap'
import { of } from '../of'
import { switchMap } from '../switchMap'

describe('(Extra) switchMap', () => {
  const fn = (x: number) => of(x * 2, x * 3)
  const stream = of(1, 2, 3)
  commonTest(switchMap(fn, stream), switchMapOperator(fn)(stream), [2, 3, 4, 6, 6, 9])

  it('should apply mapping function with each value', () => {
    const map = jest.fn((x) => Observable.of(x))
    const complete = jest.fn()

    const sub = switchMap(map, Observable.of(1, 2, 3)).subscribe({ complete })

    expect(map.mock.calls).toEqual([[1], [2], [3]])
    expect(sub.closed).toBe(true)
    expect(complete).toHaveBeenCalled()
  })

  it('should work as an operator', () => {
    const map = jest.fn((x) => Observable.of(x))
    const complete = jest.fn()

    const sub = switchMapOperator(map)(Observable.of(1, 2, 3)).subscribe({ complete })

    expect(map.mock.calls).toEqual([[1], [2], [3]])
    expect(sub.closed).toBe(true)
    expect(complete).toHaveBeenCalled()
  })

  it('should emit the latest values of the most recently mapped Observable', () => {
    const sink = jest.fn()

    const source = new Observable((observer) => {
      emitAfterTime(observer, 50, 1)
      emitAfterTime(observer, 100, 50)
      setTimeout(() => observer.complete(), 150)
    })

    const mapValue = (value: any) =>
      new Observable((observer) => {
        observer.next(value * 10)
        emitAfterTime(observer, 100, value * 20)
        setTimeout(() => observer.complete(), 150)
      })

    const mapped = switchMap(mapValue, source)

    mapped.subscribe(sink)

    jest.runTimersToTime(75)

    expect(sink.mock.calls).toEqual([[10]])

    jest.runTimersToTime(50)

    expect(sink.mock.calls).toEqual([[10], [500]])
  })

  it('should unsubscribe from each mapped Observable before subscribing to the next', () => {
    const unsubscribeSpy1 = jest.fn()
    const unsubscribeSpy2 = jest.fn()

    const mapped1 = new Observable(() => unsubscribeSpy1)
    jest.spyOn(mapped1, 'subscribe')
    const mapped2 = new Observable(() => unsubscribeSpy2)
    jest.spyOn(mapped2, 'subscribe')

    const source = new Observable((observer) => {
      emitAfterTime(observer, 50, 1)
      emitAfterTime(observer, 100, 2)
      setTimeout(() => observer.complete(), 150)
    })

    const mapValue = (value: any) => {
      if (value === 1) {
        return mapped1
      }

      if (value === 2) {
        return mapped2
      }

      return Observable.of()
    }

    const mapped = switchMap(mapValue, source)

    mapped.subscribe(() => null)

    jest.runTimersToTime(75)

    expect(mapped1.subscribe).toHaveBeenCalled()
    expect(unsubscribeSpy1).not.toHaveBeenCalled()

    jest.runTimersToTime(50)

    expect(unsubscribeSpy1).toHaveBeenCalled()
    expect(mapped2.subscribe).toHaveBeenCalled()
    expect(unsubscribeSpy2).not.toHaveBeenCalled()
  })

  it('should unsubscribe from mapped Observable when unsubscribed', () => {
    const unsubscribeSpy = jest.fn()

    const map = () => new Observable(() => unsubscribeSpy)

    const source = new Observable((observer) => {
      observer.next(1)
    })

    const subscription = switchMap(map, source).subscribe(() => undefined)

    jest.runTimersToTime(50)

    subscription.unsubscribe()

    expect(unsubscribeSpy.mock.calls.length).toBe(1)
  })

  it('should propagate errors from the original Observable', async () => {
    const errorHandlerSpy = jest.fn()
    const errorObservable = new Observable((observer) => {
      observer.error('error')
    })

    await new Promise((resolve) => {
      switchMap(() => Observable.of(), errorObservable).subscribe({
        error(e) {
          errorHandlerSpy(e)
          resolve()
        }
      })
    })

    expect(errorHandlerSpy).toHaveBeenCalledWith('error')
  })

  it('should propagate errors from mapped Observables', async () => {
    const errorHandlerSpy = jest.fn()
    const errorObservable = new Observable((observer) => {
      observer.error('error')
    })

    await new Promise((resolve) => {
      switchMap(() => errorObservable, Observable.of(1)).subscribe({
        error(e) {
          errorHandlerSpy(e)
          resolve()
        }
      })
    })

    expect(errorHandlerSpy).toHaveBeenCalledWith('error')
  })
  //
  it('should handle errors in mapping function', async () => {
    const errorHandlerSpy = jest.fn()

    const error = new Error('error')

    const map = () => {
      throw error
    }

    try {
      await new Promise((resolve) => {
        switchMap(map, Observable.of(1, 2, 3)).subscribe({
          error(e) {
            errorHandlerSpy(e)
            resolve()
          }
        })
      })

      // tslint:disable-next-line no-empty
    } catch (e) {}

    expect(errorHandlerSpy).toHaveBeenCalledWith(error)
  })

  it('should not complete until the mapped observable has completed', () => {
    const completeSpy = jest.fn()
    const waitAWhile = new Observable((observer) => {
      setTimeout(() => {
        observer.next(1)
        observer.complete()
      }, 100)
    })

    switchMap(() => waitAWhile, Observable.of(1)).subscribe({
      complete: completeSpy
    })

    jest.runTimersToTime(50)

    expect(completeSpy).not.toHaveBeenCalled()

    jest.runTimersToTime(150)

    expect(completeSpy).toHaveBeenCalled()
  })
})
