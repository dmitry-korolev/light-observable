import { ObservableSubscription } from '../ObservableSubscription'
import { SignalType, SubscriptionState } from '../types.h'
import { cleanupSubscription } from './cleanupSubscription'
import { closeSubscription } from './closeSubscription'

export function notifySubscription<T>(
  subscription: ObservableSubscription<T>,
  type: SignalType,
  value: any
) {
  subscription._state = SubscriptionState.running

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

  if ((subscription._state as any) === SubscriptionState.closed) {
    cleanupSubscription(subscription)
  } else if (subscription._state === SubscriptionState.running) {
    subscription._state = SubscriptionState.ready
  }
}
