import { Observable } from '..'
import { Subscribable } from '../core/types.h'
import { curry } from '../helpers/curry'
import { throttle as throttleObservable } from '../observable/throttle'

export const throttle: <T>(time: number) => (stream: Subscribable<T>) => Observable<T> = curry(
  throttleObservable
)
