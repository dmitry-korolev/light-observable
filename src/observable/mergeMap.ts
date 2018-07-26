import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { map } from './map'
import { mergeAll } from './mergeAll'

export const mergeMap = <T, R>(
  fn: (value: T, index: number) => Observable<R> | Iterable<R>,
  stream: Subscribable<T>
): Observable<R> => {
  return mergeAll(map(fn, stream))
}
