import { Subscribable } from '../types.h'
import { createSubject } from './subject'

export const share = <T>(source: Subscribable<T>): Subscribable<T> => {
  const [nextSource, sink] = createSubject()
  source.subscribe(sink)

  return nextSource
}
