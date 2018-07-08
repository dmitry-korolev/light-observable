import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { skipRepeats as skipRepeatsObservable } from '../observable/skipRepeats'

export const skipRepeats = <T>(equals?: (a: T, b: T) => boolean) => (
  stream: Subscribable<T>
): Observable<T> => skipRepeatsObservable(equals, stream)
