import { ObservableSubscription } from '../ObservableSubscription'
import { SignalType, SubscriptionState } from '../types.h'
import { enqueue } from './enqueue'
import { flushSubscription } from './flushSubscription'
import { notifySubscription } from './notifySubscription'

export function onNotify<T>(
  subscription: ObservableSubscription<T>,
  type: SignalType,
  value?: any
) {
  if (subscription._state === SubscriptionState.closed) {
    return
  }

  if (subscription._state === SubscriptionState.buffering) {
    subscription._queue.push({ type, value })
    return
  }

  if (subscription._state !== SubscriptionState.ready) {
    subscription._state = SubscriptionState.buffering
    subscription._queue = [{ type, value }]
    enqueue(() => flushSubscription(subscription))
    return
  }

  notifySubscription(subscription, type, value)
}
