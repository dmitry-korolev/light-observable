import { Observable } from '../core/Observable'
import { Subscribable, SubscriptionObserver } from '../core/types.h'
import { transform } from '../helpers/transform'

const scanFn = <T, R>(fn: (result: R, value: T, index: number) => R, initial: R) => {
  let result: R = initial

  return (observer: SubscriptionObserver<R>, value: T, index: number) => {
    result = fn(result, value, index)
    observer.next(result)
  }
}

export const scan = <T, R>(
  fn: (result: R, value: T, index: number) => R,
  initial: R,
  stream: Subscribable<T>
): Observable<R> => {
  return transform(stream, scanFn(fn, initial))
}
