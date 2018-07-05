import { Observable } from '..'
import { Subscribable } from '../core/types.h'
import { curry } from '../helpers/curry'
import { tap as tapObservable } from '../observable/tap'

export const tap: <T>(fn: (value: T) => any) => (stream: Subscribable<T>) => Observable<T> = curry(
  tapObservable
)
