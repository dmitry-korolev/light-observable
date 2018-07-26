import { Subscribable } from '../core/types.h'
import { EMPTY } from './empty'
import { slice } from './slice'

export const take = <T>(count: number, stream: Subscribable<T>) => {
  if (count === 0) {
    return EMPTY
  }

  return slice(0, count, stream)
}
