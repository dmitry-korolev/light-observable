import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { catchError as catchErrorObservable } from '../observable/catchError'

export const catchError = <T>(fn: (reason: any) => Subscribable<T>) => (
  stream: Subscribable<T>
): Observable<T> => catchErrorObservable(fn, stream)
