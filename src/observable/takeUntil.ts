import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'

export const takeUntil = <T>(signal: Subscribable<any>, stream: Subscribable<T>): Observable<T> => {
  const C = getSpecies(stream)

  return new C((observer) => {
    const streamSubscription = stream.subscribe(observer)
    const signalSubscription = signal.subscribe({
      next() {
        observer.complete()
      },
      error(reason) {
        observer.error(reason)
      }
    })

    return () => {
      streamSubscription.unsubscribe()
      signalSubscription.unsubscribe()
    }
  })
}
