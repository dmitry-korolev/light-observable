import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

export const filter = <T>(fn: (value: T) => boolean, stream: Subscribable<T>) => {
  return transform<T>(stream, (observer, value) => {
    if (fn(value)) {
      observer.next(value)
    }
  })
}
