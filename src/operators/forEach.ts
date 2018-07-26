import { Subscribable } from '../core/types.h'
import { forEach as forEachObservable } from '../observable/forEach'

export const forEach = <S>(fn?: (value: S, index: number) => void) => (
  stream: Subscribable<S>
): Promise<void> => forEachObservable(fn, stream)
