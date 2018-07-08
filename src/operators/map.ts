import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { map as mapObservable } from '../observable/map'

export const map = <T, R>(fn: (value: T) => R) => (stream: Subscribable<T>): Observable<R> =>
  mapObservable(fn, stream)
