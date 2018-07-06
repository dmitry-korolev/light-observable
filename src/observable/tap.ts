import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const tap = <T>(fn: (value: T) => any, stream: Subscribable<T>): Observable<T> => {
  return transform<T>(stream, (observer, value) => {
    fn(value)
    observer.next(value)
  })
}
