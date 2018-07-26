import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const slice = <T>(from: number, to: number, stream: Subscribable<T>): Observable<T> => {
  return transform(stream, (observer, value, index) => {
    if (from <= index && index < to) {
      observer.next(value)
    }

    if (index + 1 === to) {
      observer.complete()
    }
  })
}
