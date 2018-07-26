import { Observable } from '../core/Observable'
import { Subscribable, Subscription } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { uniqueId } from '../helpers/uniqueId'

export const delay = <T>(wait: number, stream: Subscribable<T>): Observable<T> => {
  if (wait <= 0) {
    return stream as Observable<T>
  }

  const C = getSpecies(stream)

  return new C((observer) => {
    const timers: { [K: number]: ReturnType<typeof setTimeout> } = {}
    let subscription: Subscription

    subscription = stream.subscribe({
      start(s) {
        subscription = s
      },
      next(value) {
        const id = uniqueId()
        timers[id] = setTimeout(() => {
          observer.next(value)
          delete timers[id]
        }, wait)
      },
      error(reason) {
        observer.error(reason)
      },
      complete() {
        timers[uniqueId()] = setTimeout(() => {
          observer.complete()
        }, wait)
      }
    })

    return () => {
      Object.keys(timers).forEach((timer) => clearTimeout(+timer))
      subscription.unsubscribe()
    }
  })
}
