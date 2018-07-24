import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'

export const skipLast = <T>(count: number, stream: Subscribable<T>): Observable<T> => {
  const C = getSpecies(stream)

  return new C((observer) => {
    const values: T[] = []
    return stream.subscribe({
      next(value) {
        values.push(value)
      },
      error(reason) {
        observer.error(reason)
      },
      complete() {
        values.length = values.length - count

        for (const value of values) {
          observer.next(value)
        }
        observer.complete()
      }
    })
  })
}
