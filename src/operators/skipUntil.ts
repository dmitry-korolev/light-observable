import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { skipUntil as skipUntilObservable } from '../observable'

export const skipUntil = (signal: Subscribable<any>) => <T>(
  stream: Subscribable<T>
): Observable<T> => {
  return skipUntilObservable(signal, stream)
}
