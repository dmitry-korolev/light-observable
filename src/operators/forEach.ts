import { Subscribable } from '../core/types.h'
import { curry } from '../helpers/curry'
import { forEach as forEachObservable } from '../observable/forEach'

export const forEach: <S>(
  fn?: (value: S) => void
) => (stream: Subscribable<S>) => Promise<S> = curry(forEachObservable as any)
