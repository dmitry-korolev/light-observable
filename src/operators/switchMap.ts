import { Observable } from '..'
import { FromInput, Subscribable } from '../core/types.h'
import { switchMap as switchMapObservable } from '../observable'

export const switchMap = <T, R>(fn: (value: T) => FromInput<R>) => (
  stream: Subscribable<T>
): Observable<R> => switchMapObservable(fn, stream)
