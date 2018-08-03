import { Observable } from '../core/Observable'
import { ArrayValues, Subscribable } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { ExtractInnerTypes } from '../helpers/types/extractInnnerTypes'

export function merge<TS extends Array<Subscribable<any>>>(
  ...streams: TS
): Observable<ArrayValues<ExtractInnerTypes<TS>>>
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
