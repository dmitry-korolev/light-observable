import { getSpecies } from '../helpers/getSpecies'
import { Subscribable, Subscription } from '../types.h'
import { Unary } from './pipe'

export const catchError = <T>(
  fn: (reason: any) => Subscribable<T>
): Unary<Subscribable<T>, Subscribable<T>> => {
  return (stream: Subscribable<T>) => {
    const C = getSpecies(stream)

    return new C<T>((observer) => {
      let subscription: Subscription

      stream.subscribe({
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
          fn(reason).subscribe({
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
}
