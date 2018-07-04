import { Subscribable } from '../core/types.h'
import { throttle as throttleFunc } from '../helpers/throttle'
import { transform } from '../helpers/transform'
import { Unary } from './pipe'

export const throttle = <T>(time: number): Unary<Subscribable<T>, Subscribable<T>> => {
  return (stream: Subscribable<T>) => {
    return transform(
      stream,
      throttleFunc(time, (observer, value) => {
        observer.next(value)
      })
    )
  }
}
