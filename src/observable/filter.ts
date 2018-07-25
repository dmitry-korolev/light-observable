import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const filter = <T>(
  predicate: (value: T) => boolean,
  stream: Subscribable<T>
): Observable<T> => {
  return transform(stream, (observer, value) => {
    if (predicate(value)) {
      observer.next(value)
    }
  })
}
