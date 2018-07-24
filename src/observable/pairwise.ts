import { Observable } from '../core/Observable'
import { Observer, Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

const pairwiseFn = <T>() => {
  let hasEmit = false
  let lastValue: T

  return (observer: Observer<[T, T]>, value: T) => {
    if (hasEmit) {
      observer.next([lastValue, value])
    }

    hasEmit = true
    lastValue = value
  }
}

export const pairwise = <T>(stream: Subscribable<T>): Observable<[T, T]> => {
  return transform(stream, pairwiseFn())
}
