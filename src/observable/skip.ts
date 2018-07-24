import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const skip = <T>(count: number, stream: Subscribable<T>): Observable<T> => {
  return transform(stream, (observer, value, index) => {
    if (index >= count) {
      observer.next(value)
    }
  })
}
