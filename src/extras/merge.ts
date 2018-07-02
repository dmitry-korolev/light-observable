import { getSpecies } from '../helpers/getSpecies'
import { Subscribable } from '../types.h'
import { Unary } from './pipe'

export function merge<T, A>(arg1: Subscribable<A>): Unary<Subscribable<T>, Subscribable<T | A>>
export function merge<T, A, B>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>
): Unary<Subscribable<T>, Subscribable<T | A | B>>
export function merge<T, A, B, C>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>
): Unary<Subscribable<T>, Subscribable<T | A | B | C>>
export function merge<T, A, B, C, D>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>,
  arg4: Subscribable<D>
): Unary<Subscribable<T>, Subscribable<T | A | B | C | D>>
export function merge<T, A, B, C, D, E>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>,
  arg4: Subscribable<D>,
  arg5: Subscribable<E>
): Unary<Subscribable<T>, Subscribable<T | A | B | C | D | E>>
export function merge<T>(): Unary<Subscribable<T>, Subscribable<T>>
export function merge(
  ...streams: Array<Subscribable<any>>
): Unary<Subscribable<any>, Subscribable<any>> {
  return (stream: Subscribable<any>) => {
    const C = getSpecies(stream)
    const allStreams = [stream].concat(streams)

    return new C((observer) => {
      let numObservers = allStreams.length

      const subscriptions = allStreams.map((operator) => {
        return operator.subscribe({
          next(value) {
            observer.next(value)
          },
          error(e) {
            observer.error(e)
          },
          complete() {
            numObservers -= 1

            if (numObservers === 0) {
              observer.complete()
            }
          }
        })
      })

      return () => {
        subscriptions.forEach((subscription) => subscription.unsubscribe())
      }
    })
  }
}
