import { Subscribable } from '../core/types.h'
import { forEach } from './forEach'
import { scan } from './scan'

export const reduce = <T, R>(
  fn: (result: R, value: T) => R,
  initial: R,
  stream: Subscribable<T>
): Promise<R> => {
  let result: R

  return forEach((x) => (result = x), scan(fn, initial, stream)).then(() => result)
}
