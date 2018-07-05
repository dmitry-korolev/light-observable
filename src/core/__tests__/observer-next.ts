import { Observable } from '../Observable'
import { Observer } from '../types.h'
import { getObserver, testMethodProperty } from './utils'

describe('(Core) observer.next', () => {
  it('is a method of SubscriptionObserver', () => {
    const observer = getObserver()
    testMethodProperty(Object.getPrototypeOf(observer), 'next', {
      configurable: true,
      writable: true,
      length: 1
    })
  })

  it('forwards the first argument', () => {
    let args
    const observer = getObserver({
      next(...a: any[]) {
        args = a
      }
    })
    // @ts-ignore
    observer.next(1, 2)
    expect(args).toEqual([1])
  })

  it('does not return a value', () => {
    const observer = getObserver({
      next() {
        return 1
      }
    })
    expect(observer.next(1)).toBe(undefined)
  })

  it('does not forward when the subscription is complete', () => {
    let count = 0
    const observer = getObserver({
      next() {
        count++
      }
    })
    observer.complete()
    observer.next(1)
    expect(count).toBe(0)
  })

  it('does not forward when the subscription is cancelled', () => {
    let count = 0
    let observer: Observer<any>
    const subscription = new Observable((x) => {
      observer = x
    }).subscribe({
      next() {
        count++
      }
    })
    subscription.unsubscribe()
    observer!.next(1)
    expect(count).toBe(0)
  })

  it('remains closed if the subscription is cancelled from "next"', () => {
    let observer: Observer<any>
    const subscription = new Observable((x) => {
      observer = x
    }).subscribe({
      next() {
        subscription.unsubscribe()
      }
    })
    observer!.next(1)
    expect(observer!.closed).toBe(true)
  })

  it('forwards arguments', async () => {
    const values: number[] = []
    let observer: Observer<any>
    new Observable<number>((x) => {
      observer = x
      x.next(1)
    }).subscribe({
      next(val) {
        values.push(val)
        if (val === 1) {
          observer.next(2)
        }
      }
    })
    observer!.next(3)
    expect(values).toEqual([1, 2, 3])
  })

  it('queues if the observer is running', () => {
    let observer: Observer<any>
    const values: number[] = []
    new Observable<number>((x) => {
      observer = x
    }).subscribe({
      next(val) {
        values.push(val)
        if (val === 1) observer.next(2)
      }
    })
    observer!.next(1)
    expect(values).toEqual([1, 2])
  })

  it('throws error if "next" is not a method', () => {
    // @ts-ignore
    const observer = getObserver({ next: 1 })
    expect(() => observer.next()).toThrow()
  })

  it('does not throw if "next" is undefined', () => {
    // @ts-ignore
    const observer = getObserver({ next: undefined })
    expect(() => observer.next()).not.toThrow()
  })

  it('does not throw if "next" is null', () => {
    // @ts-ignore
    const observer = getObserver({ next: null })
    expect(() => observer.next()).not.toThrow()
  })

  it('reports error if "next" throws', () => {
    expect.assertions(1)
    const error = {}
    const observer = getObserver({
      next() {
        throw error
      }
    })
    try {
      observer.next(1)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBe(error)
    }
  })

  it('does not close the subscription on error', () => {
    const observer = getObserver({
      next() {
        throw {}
      }
    })
    try {
      observer.next(1)
      // tslint:disable-next-line no-empty
    } catch (e) {}
    expect(observer.closed).toBe(false)
  })
})
