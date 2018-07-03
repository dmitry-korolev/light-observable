import { notifySubscription } from './helpers/notifySubscription'
import { ObservableSubscription } from './ObservableSubscription'
import { Observer, SignalType } from './types.h'

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
