import { Observable } from '../Observable'
import { SubscriptionObserver } from '../types.h'
import { testMethodProperty } from './utils'

describe('(Core) observer.closed', () => {
  it('is a getter on SubscriptionObserver.prototype', () => {
    let observer
    new Observable((x) => {
      observer = x
      // @ts-ignore
    }).subscribe({})
    testMethodProperty(Object.getPrototypeOf(observer), 'closed', {
      get: true,
      configurable: true,
      writable: true,
      length: 1
    })
  })

  it('returns false when the subscription is open', () => {
    new Observable((observer) => {
      expect(observer.closed).toBe(false)
      // @ts-ignore
    }).subscribe({})
  })

  it('returns true when the subscription is completed', () => {
    let observer: SubscriptionObserver<any>
    new Observable((x) => {
      observer = x
      // @ts-ignore
    }).subscribe({})
    observer!.complete()
    expect(observer!.closed).toBe(true)
  })

  it('returns true when the subscription is errored', () => {
    let observer: SubscriptionObserver<any>
    new Observable((x) => {
      observer = x
      // @ts-ignore
      // tslint:disable-next-line no-empty
    }).subscribe(() => {}, () => {})
    observer!.error(new Error())
    expect(observer!.closed).toBe(true)
  })
})
