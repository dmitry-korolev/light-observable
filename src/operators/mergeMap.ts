import { Observable } from '../core/Observable'
import { FromInput, Subscribable } from '../core/types.h'
import { map } from '../observable/map'
import { mergeAll } from '../observable/mergeAll'

export const mergeMap = <T, R>(fn: (value: T) => FromInput<R>) => (
  stream: Subscribable<T>
): Observable<R> => {
  return mergeAll(map(fn, stream))
}
