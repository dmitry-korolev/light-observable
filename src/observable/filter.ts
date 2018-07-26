import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const filter = <T>(
  predicate: (value: T, index: number) => boolean,
  stream: Subscribable<T>
): Observable<T> => {
  return transform(stream, (observer, value, index) => {
    if (predicate(value, index)) {
      observer.next(value)
    }
  })
}
