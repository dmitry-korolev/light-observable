import { Observable } from '..'
import { Subscribable } from '../core/types.h'
import { curry } from '../helpers/curry'
import { map as mapObservable } from '../observable/map'

export const map: <T, R>(fn: (value: T) => R) => (stream: Subscribable<T>) => Observable<R> = curry(
  mapObservable
)
