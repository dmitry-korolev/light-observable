import { Observable } from '../core/Observable'
import { SubscriptionObserver } from '../core/types.h'

const enum Mode {
  Publish,
  Behavior
}

export const createSubject = <T>({ initial }: { initial?: T } = {}): [
  Observable<T>,
  SubscriptionObserver<T>
] => {
  const observers = new Set<SubscriptionObserver<T>>()
  const mode = initial !== undefined ? Mode.Behavior : Mode.Publish
  let lastValue = initial
  let completed = false
  let error: any

  const observable = new Observable<T>((observer) => {
    if (error) {
      observer.error(error)
      return
    }

    if (mode === Mode.Behavior) {
      observer.next(lastValue!)
    }

    if (completed) {
      observer.complete()
      return
    }

    observers.add(observer)
    return () => observers.delete(observer)
  })

  const sink = {
    get closed() {
      return completed
    },
    next(value: T) {
      if (mode === Mode.Behavior) {
        lastValue = value
      }

      observers.forEach((observer) => observer.next(value))
    },
    error(reason: any) {
      completed = true
      error = reason
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
