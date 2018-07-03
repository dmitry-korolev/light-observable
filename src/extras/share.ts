import { getSpecies } from '../helpers/getSpecies'
import { Subscribable, Subscription } from '../types.h'
import { createSubject } from './subject'

export const share = <T>(source: Subscribable<T>): Subscribable<T> => {
  const C = getSpecies(source)
  const [nextSource, sink] = createSubject()
  let subscription: Subscription
  let refCount = 0

  return new C((observer) => {
    if (refCount === 0) {
      subscription = source.subscribe(sink)
    }
    const disposer = nextSource.subscribe(observer)
    refCount++

    return () => {
      refCount--
      if (refCount === 0) {
        subscription.unsubscribe()
      }
      disposer.unsubscribe()
    }
  })
}
