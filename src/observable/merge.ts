import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'

export function merge<A>(arg1: Subscribable<A>): Observable<A>
export function merge<A, B>(arg1: Subscribable<A>, arg2: Subscribable<B>): Observable<A | B>
export function merge<A, B, C>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>
): Observable<A | B | C>
export function merge<A, B, C, D>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>,
  arg4: Subscribable<D>
): Observable<A | B | C | D>
export function merge<A, B, C, D, E>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>,
  arg4: Subscribable<D>,
  arg5: Subscribable<E>
): Observable<A | B | C | D | E>
export function merge<A, B, C, D, E, F>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>,
  arg4: Subscribable<D>,
  arg5: Subscribable<E>,
  arg6: Subscribable<F>
): Observable<A | B | C | D | E | F>
export function merge(): Observable<any> {
  const streams: Array<Subscribable<any>> = Array.prototype.slice.call(arguments)
  const C = getSpecies(streams[0])

  return new C((observer) => {
    let numObservers = streams.length

    const subscriptions = streams.map((stream) => {
      return stream.subscribe({
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
