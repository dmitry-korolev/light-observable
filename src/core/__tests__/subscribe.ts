import { Observable } from '../Observable'
import { Observer } from '../types.h'
import { testMethodProperty } from './utils'

describe('subscribe', () => {
  it('is a method of Observable.prototype', () => {
    testMethodProperty(Observable.prototype, 'subscribe', {
      configurable: true,
      writable: true,
      length: 3
    })
  })

  it('accepts an observer argument', () => {
    let observer: Observer<any>
    let nextValue
    new Observable((x) => {
      observer = x
    }).subscribe({
      next(v: any) {
        nextValue = v
      }
    })
    observer!.next(1)

    expect(nextValue).toBe(1)
  })

  it('accepts a next function argument', () => {
    let observer: Observer<any>
    let nextValue
    new Observable((x) => {
      observer = x
    }).subscribe((v) => (nextValue = v))
    observer!.next(1)

    expect(nextValue).toBe(1)
  })

  it('accepts an error function argument', () => {
    let observer: Observer<any>
    let errorValue
    const error = {}
    new Observable((x) => {
      observer = x
      // tslint:disable-next-line no-empty
    }).subscribe(() => {}, (e) => (errorValue = e))
    observer!.error(error)

    expect(errorValue).toEqual(error)
  })

  it('accepts a complete function argument', () => {
    let observer: Observer<any>
    let completed = false
    new Observable((x) => {
      observer = x
      // @ts-ignore
    }).subscribe(null, null, () => (completed = true))
    observer!.complete()
    expect(completed).toBe(true)
  })

  it('uses function overload if first argument is null', () => {
    let observer: Observer<any>
    let completed = false
    new Observable((x) => {
      observer = x
      // @ts-ignore
    }).subscribe(null, null, () => (completed = true))
    observer!.complete()
    expect(completed).toBe(true)
  })

  it('uses function overload if first argument is undefined', () => {
    let observer: Observer<any>
    let completed = false
    new Observable((x) => {
      observer = x
      // @ts-ignore
    }).subscribe(undefined, null, () => (completed = true))
    observer!.complete()
    expect(completed).toBe(true)
  })

  it('uses function overload if first argument is a primative', () => {
    let observer: Observer<any>
    let completed = false
    new Observable((x) => {
      observer = x
      // @ts-ignore
    }).subscribe('abc', null, () => (completed = true))
    observer!.complete()
    expect(completed).toBe(true)
  })

  it('enqueues a job to send error if subscriber throws', () => {
    const error = {}
    let errorValue
    new Observable(() => {
      throw error
    }).subscribe({
      error(e) {
        errorValue = e
      }
    })

    expect(errorValue).toBe(error)
  })
})
