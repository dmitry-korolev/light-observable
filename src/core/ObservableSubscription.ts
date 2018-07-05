import { cleanupSubscription } from './cleanupSubscription'
import { closeSubscription } from './closeSubscription'
import { SubscriptionObserver } from './SubscriptionObserver'
import { Disposer, PartialObserver, Subscriber, Subscription } from './types.h'

export class ObservableSubscription<T> implements Subscription {
  _disposer: Disposer | undefined
  _observer: PartialObserver<T> | undefined
  _closed: boolean = false

  constructor(observer: PartialObserver<T>, source: Subscriber<T>) {
    this._observer = observer

    if (observer.start) {
      observer.start(this)
    }

    const subscriptionObserver = new SubscriptionObserver(this)

    try {
      this._disposer = source(subscriptionObserver)
    } catch (error) {
      subscriptionObserver.error(error)
    }
  }

  get closed() {
    return this._closed
  }

  unsubscribe() {
    if (this.closed) {
      return
    }

    closeSubscription(this)
    cleanupSubscription(this)
  }
}
