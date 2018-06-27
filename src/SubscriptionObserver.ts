import { onNotify } from './helpers/onNotify'
import { ObservableSubscription } from './ObservableSubscription'
import { Observer, SignalType, SubscriptionState } from './types.h'

export class SubscriptionObserver<T> implements Observer<T> {
  _subscription: ObservableSubscription<T>

  constructor(subscription: ObservableSubscription<T>) {
    this._subscription = subscription
  }

  get closed() {
    return this._subscription._state === SubscriptionState.closed
  }

  next(value: T) {
    onNotify(this._subscription, SignalType.next, value)
  }

  error(reason: any) {
    onNotify(this._subscription, SignalType.error, reason)
  }

  complete() {
    onNotify(this._subscription, SignalType.complete)
  }
}
