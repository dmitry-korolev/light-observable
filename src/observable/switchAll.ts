import { Observable } from '../core/Observable'
import { Subscribable, Subscription } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'

export const switchAll = <T>(stream: Subscribable<Observable<T> | Iterable<T>>): Observable<T> => {
  const C = getSpecies(stream)

  return new C((observer) => {
    let activeSubscription: Subscription | void
    let rootIsComplete: boolean
    let rootSubscription: Subscription

    rootSubscription = stream.subscribe({
      start(subscription) {
        rootSubscription = subscription
      },
      next(inner) {
        try {
          if (activeSubscription) {
            activeSubscription.unsubscribe()
          }

          let innerIsComplete = false

          const innerSub = C.from(inner).subscribe({
            start(innerSubscription) {
              activeSubscription = innerSubscription
            },
            next(innerValue) {
              observer.next(innerValue)
            },
            error(innerReason) {
              observer.error(innerReason)
            },
            complete() {
              innerIsComplete = true
              activeSubscription = undefined

              if (rootIsComplete) {
                observer.complete()
              }
            }
          })

          /* istanbul ignore next */
          if (!innerIsComplete && !activeSubscription) {
            activeSubscription = innerSub
          }
        } catch (reason) {
          observer.error(reason)
        }
      },
      error(reason) {
        observer.error(reason)
      },
      complete() {
        rootIsComplete = true

        if (!activeSubscription) {
          observer.complete()
        }
      }
    })

    return () => {
      rootSubscription.unsubscribe()

      if (activeSubscription) {
        activeSubscription.unsubscribe()
      }
    }
  })
}
