import { Observable } from '../core/Observable'
import { FromInput, Subscribable } from '../core/types.h'
import { map } from './map'
import { switchAll } from './switchAll'

export const switchMap = <T, R>(
  fn: (value: T) => FromInput<R>,
  stream: Subscribable<T>
): Observable<R> => {
  return switchAll(map(fn, stream))
}
