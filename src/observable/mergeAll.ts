import { Observable } from '../core/Observable'
import { Subscribable, Subscription } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { uniqueId } from '../helpers/uniqueId'

export const mergeAll = <T>(stream: Subscribable<Observable<T> | Iterable<T>>): Observable<T> => {
  const C = getSpecies(stream)

  return new C((observer) => {
    let rootCompleted = false
    let rootSubscription: Subscription
    const subscriptions: { [K: string]: Subscription } = {}

    rootSubscription = stream.subscribe({
      start(s) {
        rootSubscription = s
      },
      next(inner) {
        const id = uniqueId()

        try {
          subscriptions[id] = C.from(inner).subscribe({
            start(s) {
              subscriptions[id] = s
            },
            next(value) {
              observer.next(value)
            },
            error(reason) {
              observer.error(reason)
            },
            complete() {
              delete subscriptions[id]

              if (rootCompleted && Object.keys(subscriptions).length === 0) {
                observer.complete()
              }
            }
          })
        } catch (err) {
          observer.error(err)
        }
      },
      error(reason) {
        observer.error(reason)
      },
      complete() {
        rootCompleted = true

        if (Object.keys(subscriptions).length === 0) {
          observer.complete()
        }
      }
    })

    return () => {
      rootSubscription.unsubscribe()
      Object.keys(subscriptions).forEach((id) => {
        subscriptions[id].unsubscribe()
      })
    }
  })
}
