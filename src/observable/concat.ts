import { Observable } from '../core/Observable'
import { ArrayValues, Subscribable, Subscription, SubscriptionObserver } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { ExtractInnerTypes } from '../helpers/types/extractInnnerTypes'

const subscribe = (
  streams: Array<Subscribable<any>>,
  observer: SubscriptionObserver<any>,
  onSubscribe: (s: Subscription) => void
) => {
  return streams[0].subscribe({
    start(s) {
      onSubscribe(s)
    },
    next(value) {
      observer.next(value)
    },
    error(e) {
      observer.error(e)
    },
    complete() {
      if (streams.length > 1) {
        subscribe(streams.slice(1), observer, onSubscribe)
      } else {
        observer.complete()
      }
    }
  })
}

export function concat<TS extends Array<Subscribable<any>>>(
  ...args: TS
): Observable<ArrayValues<ExtractInnerTypes<TS>>>
export function concat(): Observable<any> {
  const streams: Array<Subscribable<any>> = Array.prototype.slice.call(arguments)
  const C = getSpecies(streams[0])

  return new C((observer) => {
    let subscription: Subscription
    const onSubscribe = (newSubscription: Subscription) => {
      subscription = newSubscription
    }

    subscribe(streams, observer, onSubscribe)

    return () => {
      subscription.unsubscribe()
    }
  })
}
