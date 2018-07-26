import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { slice } from './slice'

export const skip = <T>(count: number, stream: Subscribable<T>): Observable<T> => {
  if (count === 0) {
    return stream as Observable<T>
  }

  return slice(count, Infinity, stream)
}
