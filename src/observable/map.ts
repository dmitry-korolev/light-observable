import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const map = <T, R>(fn: (value: T) => R, stream: Subscribable<T>) => {
  return transform<T, R>(stream, (observer, value) => {
    observer.next(fn(value))
  })
}
