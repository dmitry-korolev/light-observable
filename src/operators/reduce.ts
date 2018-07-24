import { Subscribable } from '../core/types.h'
import { reduce as reduceObservable } from '../observable/reduce'

export const reduce = <T, R>(fn: (result: R, value: T) => R, initial: R) => (
  stream: Subscribable<T>
): Promise<R> => {
  return reduceObservable(fn, initial, stream)
}
