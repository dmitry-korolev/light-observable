import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { skipLast as skipLastObservable } from '../observable'

export const skipLast = (count: number) => <T>(stream: Subscribable<T>): Observable<T> => {
  return skipLastObservable(count, stream)
}
