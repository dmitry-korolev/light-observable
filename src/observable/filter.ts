import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const filter = <T>(fn: (value: T) => boolean, stream: Subscribable<T>): Observable<T> => {
  return transform<T>(stream, (observer, value) => {
    if (fn(value)) {
      observer.next(value)
    }
  })
}
