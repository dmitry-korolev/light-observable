import { cleanupSubscription } from './cleanupSubscription'
import { closeSubscription } from './closeSubscription'
import { ObservableSubscription } from './ObservableSubscription'
import { Observer, SignalType } from './types.h'

function notifySubscription<T>(
  subscription: ObservableSubscription<T>,
  type: SignalType,
  value: any
) {
  if (subscription.closed) {
    return
  }

  const observer = subscription._observer

  /* istanbul ignore next */
  if (!observer) {
    return
  }

  switch (type) {
    case SignalType.next:
      if (observer.next) {
        observer.next(value)
      }

      break

    case SignalType.error:
      closeSubscription(subscription)
      if (observer.error) {
        observer.error(value)
      } else {
        cleanupSubscription(subscription)
        throw value
      }
      break

    case SignalType.complete:
      closeSubscription(subscription)
      if (observer.complete) {
        observer.complete()
      }
      break
  }

  if (subscription.closed) {
    cleanupSubscription(subscription)
  }
}

export class SubscriptionObserver<T> implements Observer<T> {
  _subscription: ObservableSubscription<T>

  constructor(subscription: ObservableSubscription<T>) {
    this._subscription = subscription
  }

  get closed() {
    return this._subscription.closed
  }

  next(value: T) {
    notifySubscription(this._subscription, SignalType.next, value)
  }

  error(reason: any) {
    notifySubscription(this._subscription, SignalType.error, reason)
  }

  complete() {
    notifySubscription(this._subscription, SignalType.complete, undefined)
  }
}
