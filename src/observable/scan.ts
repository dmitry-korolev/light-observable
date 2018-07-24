import { Observable } from '../core/Observable'
import { Observer, Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

const scanFn = <T, R>(fn: (result: R, value: T) => R, initial: R) => {
  let result: R = initial

  return (observer: Observer<R>, value: T) => {
    result = fn(result, value)
    observer.next(result)
  }
}

export const scan = <T, R>(
  fn: (result: R, value: T) => R,
  initial: R,
  stream: Subscribable<T>
): Observable<R> => {
  return transform(stream, scanFn(fn, initial))
}
