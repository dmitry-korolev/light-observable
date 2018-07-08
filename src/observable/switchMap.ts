import { Observable } from '../core/Observable'
import { Subscribable, Subscription } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'

export const switchMap = <T, R>(
  fn: (value: T) => Subscribable<R> | Iterable<R> | Promise<R> | R[],
  stream: Subscribable<T>
): Observable<R> => {
  const C = getSpecies(stream)

  return new C<R>((observer) => {
    let activeSubscription: Subscription | void
    let rootIsComplete: boolean
    let rootSubscription: Subscription

    rootSubscription = stream.subscribe({
      start(subscription) {
        rootSubscription = subscription
      },
      next(value) {
        try {
          if (activeSubscription) {
            activeSubscription.unsubscribe()
          }

          let innerIsComplete = false

          const innerSub = C.from(fn(value)).subscribe({
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
