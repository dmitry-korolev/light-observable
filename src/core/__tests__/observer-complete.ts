import { Observable } from '../Observable'
import { Observer } from '../types.h'
import { getObserver, testMethodProperty } from './utils'

describe('(Core) observer.complete', () => {
  it('is a method of SubscriptionObserver', () => {
    const observer = getObserver()
    testMethodProperty(Object.getPrototypeOf(observer), 'complete', {
      configurable: true,
      writable: true,
      length: 0
    })
  })

  it('does not forward arguments', () => {
    let args
    const observer = getObserver({
      complete(...a: any[]) {
        args = a
      }
    })
    // @ts-ignore
    observer.complete(1)
    expect(args).toEqual([])
  })

  it('does not return a value', () => {
    const observer = getObserver({
      complete() {
        return 1
      }
    })

    expect(observer.complete()).toBe(undefined)
  })

  it('does not forward when the subscription is complete', () => {
    let count = 0
    const observer = getObserver({
      complete() {
        count++
      }
    })
    observer.complete()
    observer.complete()
    expect(count).toBe(1)
  })

  it('does not forward when the subscription is cancelled', () => {
    let count = 0
    let observer: Observer<any>
    const subscription = new Observable((x) => {
      observer = x
    }).subscribe({
      complete() {
        count++
      }
    })
    subscription.unsubscribe()
    observer!.complete()
    expect(count).toBe(0)
  })

  it('queues if the subscription is not initialized', async () => {
    let completed = false
    new Observable((x) => {
      x.complete()
    }).subscribe({
      complete() {
        completed = true
      }
    })
    expect(completed).toBe(true)
  })

  it('queues if the observer is running', () => {
    let observer: Observer<any>
    let completed = false
    new Observable((x) => {
      observer = x
    }).subscribe({
      next() {
        observer.complete()
      },
      complete() {
        completed = true
      }
    })
    observer!.next('test')
    expect(completed).toBe(true)
  })

  it('closes the subscription before invoking inner observer', () => {
    let closed
    const observer = getObserver({
      complete() {
        closed = observer.closed
      }
    })
    observer.complete()
    expect(closed).toBe(true)
  })

  it('throws error if "complete" is not a method', () => {
    // @ts-ignore
    const observer = getObserver({ complete: 1 })
    expect(() => observer.complete()).toThrow()
  })

  it('does not report error if "complete" is undefined', () => {
    // @ts-ignore
    const observer = getObserver({ complete: undefined })
    expect(() => observer.complete()).not.toThrow()
  })

  it('does not report error if "complete" is null', () => {
    // @ts-ignore
    const observer = getObserver({ complete: null })
    expect(() => observer.complete()).not.toThrow()
  })

  it('throws error if "complete" throws', () => {
    const error = {}
    const observer = getObserver({
      complete() {
        throw error
      }
    })
    expect(() => observer.complete()).toThrow()
  })

  it('calls the cleanup method after "complete"', () => {
    const calls: string[] = []
    let observer: Observer<any>
    new Observable((x) => {
      observer = x
      return () => {
        calls.push('cleanup')
      }
    }).subscribe({
      complete() {
        calls.push('complete')
      }
    })
    observer!.complete()
    expect(calls).toEqual(['complete', 'cleanup'])
  })

  it('calls the cleanup method if there is no "complete"', () => {
    const calls: string[] = []
    let observer: Observer<any>
    new Observable((x) => {
      observer = x
      return () => {
        calls.push('cleanup')
      }
      // @ts-ignore
    }).subscribe({})
    observer!.complete()
    expect(calls).toEqual(['cleanup'])
  })

  it('throws error if the cleanup function throws', () => {
    expect.assertions(1)
    const error = {}
    let observer: Observer<any>
    new Observable((x) => {
      observer = x
      return () => {
        throw error
      }
      // @ts-ignore
    }).subscribe({})
    try {
      observer!.complete()
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBe(error)
    }
  })
})
