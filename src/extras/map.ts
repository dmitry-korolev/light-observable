import { transform } from '../helpers/transform'
import { Subscribable } from '../types.h'
import { Unary } from './pipe'

export const map = <T, R>(fn: (value: T) => R): Unary<Subscribable<T>, Subscribable<R>> => (
  stream: Subscribable<T>
) => {
  return transform<T, R>(stream, (observer, value) => {
    observer.next(fn(value))
  })
}
