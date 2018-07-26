import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { map } from './map'
import { mergeAll } from './mergeAll'

export const mergeMapTo = <T>(
  value: Observable<T> | Iterable<T>,
  stream: Subscribable<any>
): Observable<T> => {
  return mergeAll(map(() => value, stream))
}
