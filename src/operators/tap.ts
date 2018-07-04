import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'
import { Unary } from './pipe'

export const tap = <T>(fn: (value: T) => any): Unary<Subscribable<T>, Subscribable<T>> => {
  return (stream: Subscribable<T>) => {
    return transform<T>(stream, (observer, value) => {
      fn(value)
      observer.next(value)
    })
  }
}
