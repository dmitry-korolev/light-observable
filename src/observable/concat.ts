import { Observable } from '../core/Observable'
import { Observer, Subscribable, Subscription } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'

const subscribe = (
  sources: Array<Subscribable<any>>,
  observer: Observer<any>,
  onSubscribe: (s: Subscription) => void
) =>
  onSubscribe(
    sources[0].subscribe({
      next(value) {
        observer.next(value)
      },
      error(e) {
        observer.error(e)
      },
      complete() {
        if (sources.length > 1) {
          subscribe(sources.slice(1), observer, onSubscribe)
        } else {
          observer.complete()
        }
      }
    })
  )

export function concat<A>(arg1: Subscribable<A>): Observable<A>
export function concat<A, B>(arg1: Subscribable<A>, arg2: Subscribable<B>): Observable<A | B>
export function concat<A, B, C>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>
): Observable<A | B | C>
export function concat<A, B, C, D>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>,
  arg4: Subscribable<D>
): Observable<A | B | C | D>
export function concat<A, B, C, D, E>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>,
  arg4: Subscribable<D>,
  arg5: Subscribable<E>
): Observable<A | B | C | D | E>
export function concat<A, B, C, D, E, F>(
  arg1: Subscribable<A>,
  arg2: Subscribable<B>,
  arg3: Subscribable<C>,
  arg4: Subscribable<D>,
  arg5: Subscribable<E>,
  arg6: Subscribable<F>
): Observable<A | B | C | D | E | F>
export function concat(...sources: Array<Subscribable<any>>): Observable<any> {
  const C = getSpecies(sources[0])

  return new C((observer) => {
    let subscription: Subscription
    const onSubscribe = (newSubscription: Subscription) => {
      subscription = newSubscription
    }

    subscribe(sources, observer, onSubscribe)

    return () => {
      subscription.unsubscribe()
    }
  })
}
