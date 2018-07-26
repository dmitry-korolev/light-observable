import { SubscriptionObserver } from '../../core/types.h'

export function emitAfterTime<T>(ms: number, value: T): (observer: SubscriptionObserver<T>) => void
export function emitAfterTime<T>(observer: SubscriptionObserver<T>, ms: number, value: T): void
export function emitAfterTime<T>(
  observerOrMs: SubscriptionObserver<T> | number,
  msOrValue: number | any,
  value?: T
) {
  if (typeof observerOrMs === 'number') {
    return (observer: SubscriptionObserver<any>) => {
      setTimeout(() => observer.next(msOrValue), observerOrMs)
    }
  }

  setTimeout(() => observerOrMs.next(value!), msOrValue)
}
