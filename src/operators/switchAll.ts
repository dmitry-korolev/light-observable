import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { switchAll as switchAllObservable } from '../observable/switchAll'

export const switchAll = () => <T>(
  stream: Subscribable<Observable<T> | Iterable<T>>
): Observable<T> => {
  return switchAllObservable(stream)
}
