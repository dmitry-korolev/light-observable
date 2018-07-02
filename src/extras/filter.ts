import { transform } from '../helpers/transform'
import { Subscribable } from '../types.h'
import { Unary } from './pipe'

export const filter = <T>(fn: (value: T) => boolean): Unary<Subscribable<T>, Subscribable<T>> => (
  stream: Subscribable<T>
) => {
  return transform<T>(stream, (observer, value) => {
    if (fn(value)) {
      observer.next(value)
    }
  })
}
