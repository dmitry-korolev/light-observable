import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { mergeAll as mergeAllObservable } from '../observable/mergeAll'

export const mergeAll = () => <T>(
  stream: Subscribable<Observable<T> | Iterable<T>>
): Observable<T> => {
  return mergeAllObservable(stream)
}
