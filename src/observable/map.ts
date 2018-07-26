import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const map = <T, R>(
  fn: (value: T, index: number) => R,
  stream: Subscribable<T>
): Observable<R> => {
  return transform(stream, (observer, value, index) => {
    observer.next(fn(value, index))
  })
}
