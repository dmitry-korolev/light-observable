import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { scan as scanObservable } from '../observable/scan'

export const scan = <T, R>(fn: (result: R, value: T) => R, initial: R) => (
  stream: Subscribable<T>
): Observable<R> => {
  return scanObservable(fn, initial, stream)
}
