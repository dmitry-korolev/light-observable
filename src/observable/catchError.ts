import { Observable } from '../core/Observable'
import { Subscribable, Subscription } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'

export const catchError = <T, R = any>(
  fn: (reason: R) => Subscribable<T>,
  stream: Subscribable<T>
): Observable<T> => {
  const C = getSpecies(stream)

  return new C<T>((observer) => {
    let subscription: Subscription

    subscription = stream.subscribe({
      start(s) {
        subscription = s
      },
      next(value) {
        observer.next(value)
      },
      complete() {
        observer.complete()
      },
      error(reason) {
        subscription = fn(reason).subscribe({
          start(s) {
            subscription = s
          },
          next(value) {
            observer.next(value)
          },
          complete() {
            observer.complete()
          },
          error(innerReason) {
            observer.error(innerReason)
          }
        })
      }
    })

    return () => subscription.unsubscribe()
  })
}
