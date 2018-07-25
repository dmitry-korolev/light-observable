import { Observable } from '../core/Observable'
import { SubscriptionObserver } from '../core/types.h'

export const createSubject = <T>(): [Observable<T>, SubscriptionObserver<T>] => {
  const observers = new Set<SubscriptionObserver<T>>()
  let completed = false

  const observable = new Observable<T>((observer) => {
    if (completed) {
      observer.complete()
    }

    observers.add(observer)
    return () => observers.delete(observer)
  })

  const sink = {
    get closed() {
      return completed
    },
    next(value: T) {
      observers.forEach((observer) => observer.next(value))
    },
    error(reason: any) {
      completed = true
      observers.forEach((observer) => observer.error(reason))
      observers.clear()
    },
    complete() {
      completed = true
      observers.forEach((observer) => observer.complete())
      observers.clear()
    }
  }

  return [observable, sink]
}
