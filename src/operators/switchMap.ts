import { Observable } from '..'
import { Subscribable } from '../core/types.h'
import { curry } from '../helpers/curry'
import { switchMap as switchMapObservable } from '../observable'

export const switchMap: <T, R>(
  fn: (value: T) => Subscribable<R> | Iterable<R> | Promise<R> | R[]
) => (stream: Subscribable<T>) => Observable<R> = curry(switchMapObservable)
