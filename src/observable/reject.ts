import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const reject = <T>(
  fn: (value: T, index: number) => boolean,
  stream: Subscribable<T>
): Observable<T> => {
  return transform(stream, (observer, value, index) => {
    if (!fn(value, index)) {
      observer.next(value)
    }
  })
}
