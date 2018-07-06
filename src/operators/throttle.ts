import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { curry } from '../helpers/curry'
import { throttle as throttleObservable } from '../observable/throttle'

export const throttle: (time: number) => <T>(stream: Subscribable<T>) => Observable<T> = curry(
  throttleObservable
) as any
