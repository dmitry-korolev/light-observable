import { Observable } from '../core/Observable'
import { Subscribable, Subscription } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'

export const skipUntil = <T>(signal: Subscribable<any>, stream: Subscribable<T>): Observable<T> => {
  const C = getSpecies(stream)

  return new C((observer) => {
    let blocked = true
    let signalSubscription: Subscription
    let streamSubscription: Subscription

    signalSubscription = signal.subscribe({
      start(s) {
        signalSubscription = s
      },
      next() {
        blocked = false
        signalSubscription.unsubscribe()
      },
      error(reason) {
        observer.error(reason)
      },
      complete() {
        /* istanbul ignore next */
        if (blocked) {
          observer.complete()
        }
      }
    })

    if (observer.closed) {
      return undefined
    }

    streamSubscription = stream.subscribe({
      start(s) {
        streamSubscription = s
      },
      next(value) {
        if (!blocked) {
          observer.next(value)
        }
      },
      error(reason) {
        observer.error(reason)
      },
      complete() {
        observer.complete()
      }
    })

    return () => {
      signalSubscription.unsubscribe()
      streamSubscription.unsubscribe()
    }
  })
}
