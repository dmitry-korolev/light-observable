import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { takeUntil as takeUntilObservable } from '../observable/takeUntil'

export const takeUntil = (signal: Subscribable<any>) => <T>(
  stream: Subscribable<T>
): Observable<T> => {
  return takeUntilObservable(signal, stream)
}
