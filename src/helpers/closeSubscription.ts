import { ObservableSubscription } from '../ObservableSubscription'
import { SubscriptionState } from '../types.h'

export function closeSubscription(subscription: ObservableSubscription<any>) {
  subscription._observer = undefined
  subscription._queue = []
  subscription._state = SubscriptionState.closed
}
