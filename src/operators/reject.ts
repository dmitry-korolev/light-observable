import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { reject as rejectObservable } from '../observable/reject'

export const reject = <T>(fn: (value: T, index: number) => boolean) => (
  stream: Subscribable<T>
): Observable<T> => rejectObservable(fn, stream)
