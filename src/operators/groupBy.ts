import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { groupBy as groupByObservable } from '../observable'

export const groupBy = <T, K>(selector: (value: T) => K) => (
  stream: Subscribable<T>
): Observable<Observable<T>> => {
  return groupByObservable(selector, stream)
}
