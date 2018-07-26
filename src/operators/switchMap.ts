import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { map } from '../observable/map'
import { switchAll } from '../observable/switchAll'

export const switchMap = <T, R>(fn: (value: T, index: number) => Observable<R> | Iterable<R>) => (
  stream: Subscribable<T>
): Observable<R> => {
  return switchAll(map(fn, stream))
}
