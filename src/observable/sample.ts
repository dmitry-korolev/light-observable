import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'

export const sample = <T>(signal: Subscribable<any>, stream: Subscribable<T>): Observable<T> => {
  const C = getSpecies(stream)

  return new C((observer) => {
    let streamEmitted = false
    let lastResult: T
    const streamSubscription = stream.subscribe({
      next(value) {
        streamEmitted = true
        lastResult = value
      },
      error(reason) {
        observer.error(reason)
      },
      complete() {
        observer.complete()
      }
    })

    const signalSubscription = signal.subscribe({
      next() {
        if (streamEmitted) {
          observer.next(lastResult)
          streamEmitted = false
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
      streamSubscription.unsubscribe()
      signalSubscription.unsubscribe()
    }
  })
}
