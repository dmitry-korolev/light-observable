import { ObservableSubscription } from '../ObservableSubscription'
import { SubscriptionState } from '../types.h'
import { notifySubscription } from './notifySubscription'

export function flushSubscription(subscription: ObservableSubscription<any>) {
  const queue = subscription._queue

  if (!queue.length) {
    return
  }

  subscription._queue = []
  subscription._state = SubscriptionState.ready

  for (const { type, value } of queue) {
    notifySubscription(subscription, type, value)
    if ((subscription._state as any) === SubscriptionState.closed) {
      break
    }
  }
}
