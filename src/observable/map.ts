import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const map = <T, R>(fn: (value: T) => R, stream: Subscribable<T>): Observable<R> => {
  return transform(stream, (observer, value) => {
    observer.next(fn(value))
  })
}
