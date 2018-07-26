import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { map } from '../observable/map'
import { switchAll } from '../observable/switchAll'

export const switchMapTo = <T>(value: Observable<T> | Iterable<T>) => (
  stream: Subscribable<any>
): Observable<T> => {
  return switchAll(map(() => value, stream))
}
