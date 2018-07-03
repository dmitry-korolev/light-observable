import { Observable } from '../Observable'
import { Observer } from '../types.h'
import { testMethodProperty } from './utils'

describe('from', () => {
  const iterable = {
    *[Symbol.iterator]() {
      yield 1
      yield 2
      yield 3
    }
  }

  it('is a method on Observable', () => {
    testMethodProperty(Observable, 'from', {
      configurable: true,
      writable: true,
      length: 1
    })
  })

  it('throws if the argument is null', () => {
    // @ts-ignore
    expect(() => Observable.from(null)).toThrow()
  })

  it('throws if the argument is undefined', () => {
    // @ts-ignore
    expect(() => Observable.from(undefined)).toThrow()
  })

  it('throws if the argument is not observable or iterable', () => {
    // @ts-ignore
    expect(() => Observable.from({})).toThrow()
  })

  it('uses Observable constructor, if from is calls in a non-function context', () => {
    const { from } = Observable
    const o = from([1, 2])
    expect(o).toBeInstanceOf(Observable)
  })

  describe('observables', () => {
    it('returns the input if the constructor matches "this"', () => {
      // tslint:disable-next-line no-empty only-arrow-functions
      const ctor = function() {}
      // tslint:disable-next-line no-empty
      const observable = new Observable(() => {})
      observable.constructor = ctor
      expect(Observable.from.call(ctor, observable)).toBe(observable)
    })

    it('wraps the input if it is not an instance of Observable', () => {
      const obj = {
        constructor: Observable,
        [Symbol.observable]() {
          return this
        }
      }

      // @ts-ignore
      expect(Observable.from(obj)).not.toBe(obj)
    })

    it('throws if @@observable property is not a method', () => {
      expect(() =>
        // @ts-ignore
        Observable.from({
          [Symbol.observable]: 1
        })
      ).toThrow()
    })

    it('throws if @@observable method does not return an object', () => {
      expect(() => {
        // @ts-ignore
        Observable.from({
          [Symbol.observable]() {
            return 1
          }
        })
      }).toThrow()
    })

    it('returns an observable wrapping @@observable result', () => {
      let observer: Observer<any>
      let cleanupCalled = false
      const inner = {
        subscribe(x: any) {
          observer = x
          return () => {
            cleanupCalled = true
          }
        }
      }

      // @ts-ignore
      const observable = Observable.from({
        [Symbol.observable]() {
          return inner
        }
      })

      observable.subscribe({})

      expect(typeof observer!.next).toBe('function')
      observer!.complete()
      expect(cleanupCalled).toBe(true)
    })
  })

  describe('iterables', () => {
    it('throws if @@iterator is not a method', () => {
      // @ts-ignore
      expect(() => Observable.from({ [Symbol.iterator]: 1 })).toThrow()
    })

    it('returns an observable wrapping iterables', async () => {
      const calls: any[] = []
      Observable.from(iterable).subscribe({
        next(v) {
          calls.push(['next', v])
        },
        complete() {
          calls.push(['complete'])
        }
      })

      expect(calls).toEqual([])
      await null
      expect(calls).toEqual([['next', 1], ['next', 2], ['next', 3], ['complete']])
    })

    it('stops iterating if observer is closed', async () => {
      const result: number[] = []
      const subscription = Observable.from([1, 2, 3, 4]).subscribe({
        next(x) {
          result.push(x)
          if (x === 2) {
            subscription.unsubscribe()
          }
        }
      })

      await null
      expect(result).toEqual([1, 2])
    })
  })
})
