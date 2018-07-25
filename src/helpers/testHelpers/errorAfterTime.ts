import { SubscriptionObserver } from '../../core/types.h'

export function errorAfterTime(
  ms: number,
  reason: any
): (observer: SubscriptionObserver<any>) => void
export function errorAfterTime(observer: SubscriptionObserver<any>, ms: number, reason: any): void
export function errorAfterTime(
  observerOrMs: SubscriptionObserver<any> | number,
  msOrReason: number | any,
  reason?: any
) {
  if (typeof observerOrMs === 'number') {
    return (observer: SubscriptionObserver<any>) => {
      setTimeout(() => observer.error(msOrReason), observerOrMs)
    }
  }

  setTimeout(() => observerOrMs.error(reason), msOrReason)
}
