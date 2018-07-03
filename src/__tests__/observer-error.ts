import { Observable } from '../Observable'
import { Observer } from '../types.h'
import { getObserver, testMethodProperty } from './utils'

describe('observer.error', () => {
  it('is a method of SubscriptionObserver', () => {
    const observer = getObserver()
    testMethodProperty(Object.getPrototypeOf(observer), 'error', {
      configurable: true,
      writable: true,
      length: 1
    })
  })

  it('forwards the argument', () => {
    let args
    const observer = getObserver({
      error(...a: any[]) {
        args = a
      }
    })
    observer.error(1)
    expect(args).toEqual([1])
  })

  it('does not return a value', () => {
    const observer = getObserver({
      error() {
        return 1
      }
    })
    expect(observer.error(new Error())).toBe(undefined)
  })

  it('does not throw when the subscription is complete', () => {
    // tslint:disable-next-line no-empty
    const observer = getObserver({ error() {} })
    observer.complete()
    observer.error('error')
  })

  it('does not throw when the subscription is cancelled', () => {
    let observer: Observer<any>
    const subscription = new Observable((x) => {
      observer = x
    }).subscribe({
      // tslint:disable-next-line no-empty
      error() {}
    })
    expect(() => {
      subscription.unsubscribe()
      observer!.error(1)
    }).not.toThrow()
  })

  it('queues if the subscription is not initialized', () => {
    let error
    new Observable((x) => {
      x.error({})
    }).subscribe({
      error(err) {
        error = err
      }
    })

    expect(error).toBeDefined()
  })

  it('queues if the observer is running', () => {
    let observer: Observer<any>
    let error
    new Observable((x) => {
      observer = x
    }).subscribe({
      next() {
        observer.error({ test: 123 })
      },
      error(e) {
        error = e
      }
    })
    observer!.next(1)
    expect(error).toBeDefined()
  })

  it('closes the subscription before invoking inner observer', () => {
    let closed
    const observer = getObserver({
      error() {
        closed = observer.closed
      }
    })
    observer.error(1)
    expect(closed).toBe(true)
  })

  it('throws an error if "error" is not a method', () => {
    // @ts-ignore
    const observer = getObserver({ error: 1 })
    expect(() => observer.error(new Error())).toThrow()
  })

  it('throws an error if "error" is undefined', () => {
    const error = {}
    // @ts-ignore
    const observer = getObserver({ error: undefined })
    expect(() => observer.error(error)).toThrow()
  })

  it('throws an error if "error" is null', () => {
    const error = {}
    // @ts-ignore
    const observer = getObserver({ error: null })
    expect(() => observer.error(error)).toThrow()
  })

  it('throws an error if "error" throws', () => {
    expect.assertions(1)
    const error = {}
    const observer = getObserver({
      error() {
        throw error
      }
    })
    try {
      observer.error(1)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBe(error)
    }
  })

  it('calls the cleanup method after "error"', () => {
    const calls: string[] = []
    let observer: Observer<any>
    new Observable((x) => {
      observer = x
      return () => {
        calls.push('cleanup')
      }
    }).subscribe({
      error() {
        calls.push('error')
      }
    })
    observer!.error(new Error())
    expect(calls).toEqual(['error', 'cleanup'])
  })

  it('calls the cleanup method if there is no "error"', () => {
    const calls: string[] = []
    let observer: Observer<any>
    new Observable((x) => {
      observer = x
      return () => {
        calls.push('cleanup')
      }
      // @ts-ignore
    }).subscribe({})
    try {
      observer!.error(1)
      // tslint:disable-next-line no-empty
    } catch (err) {}
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
      observer!.error(1)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toBe(error)
    }
  })
})
