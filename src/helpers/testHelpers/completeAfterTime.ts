import { SubscriptionObserver } from '../../core/types.h'

export function completeAfterTime(ms: number): (observer: SubscriptionObserver<any>) => void
export function completeAfterTime(observer: SubscriptionObserver<any>, ms: number): void
export function completeAfterTime(observerOrMs: SubscriptionObserver<any> | number, ms?: number) {
  if (typeof observerOrMs === 'number') {
    return (observer: SubscriptionObserver<any>) => {
      setTimeout(() => observer.complete(), observerOrMs)
    }
  }

  setTimeout(() => observerOrMs.complete(), ms)
}
