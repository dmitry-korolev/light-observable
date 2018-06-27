import { cleanupSubscription } from './helpers/cleanupSubscription'
import { closeSubscription } from './helpers/closeSubscription'
import { SubscriptionObserver } from './SubscriptionObserver'
import {
  Disposer,
  PartialObserver,
  SignalType,
  Subscriber,
  Subscription,
  SubscriptionState
} from './types.h'

export class ObservableSubscription<T> implements Subscription {
  _disposer: Disposer | undefined
  _observer: PartialObserver<T> | undefined
  _queue: Array<{ type: SignalType; value: any }> = []
  _state: SubscriptionState = SubscriptionState.initializing

  constructor(observer: PartialObserver<T>, source: Subscriber<T>) {
    this._observer = observer

    const subscriptionObserver = new SubscriptionObserver(this)

    try {
      this._disposer = source(subscriptionObserver)
    } catch (error) {
      subscriptionObserver.error(error)
    }

    if (this._state === SubscriptionState.initializing) {
      this._state = SubscriptionState.ready
    }
  }

  get closed() {
    return this._state === SubscriptionState.closed
  }

  unsubscribe() {
    if (this._state === SubscriptionState.closed) {
      return
    }

    closeSubscription(this)
    cleanupSubscription(this)
  }
}
