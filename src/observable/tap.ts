import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const tap = <T>(
  fn: (value: T, index: number) => any,
  stream: Subscribable<T>
): Observable<T> => {
  return transform(stream, (observer, value, index) => {
    fn(value, index)
    observer.next(value)
  })
}
