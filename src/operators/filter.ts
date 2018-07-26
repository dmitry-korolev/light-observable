import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { filter as filterObservable } from '../observable/filter'

export const filter = <T>(predicate: (value: T, index: number) => boolean) => (
  stream: Subscribable<T>
): Observable<T> => {
  return filterObservable(predicate, stream)
}
