import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { tap as tapObservable } from '../observable/tap'

export const tap = <T>(fn: (value: T) => any) => (stream: Subscribable<T>): Observable<T> =>
  tapObservable(fn, stream)
