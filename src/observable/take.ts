import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'
import { EMPTY } from './empty'

export const take = <T>(count: number, stream: Subscribable<T>) => {
  if (count === 0) {
    return EMPTY
  }

  return transform(stream, (observer, value, index) => {
    observer.next(value)

    if (count === index + 1) {
      observer.complete()
    }
  })
}
