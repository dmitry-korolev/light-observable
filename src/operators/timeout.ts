import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { timeout as timeoutObservable } from '../observable/timeout'

export const timeout = (time: number) => <T>(stream: Subscribable<T>): Observable<T> =>
  timeoutObservable(time, stream)
