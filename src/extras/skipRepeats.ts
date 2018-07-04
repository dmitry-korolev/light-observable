import { transform } from '../helpers/transform'
import { Observer, Subscribable } from '../types.h'
import { Unary } from './pipe'

const defaultEquals = <T>(a: T, b: T) => a === b

const skip = <T>(equals: (a: T, b: T) => boolean) => {
  let init = true
  let oldValue: T

  return (observer: Observer<T>, value: T) => {
    if (init) {
      init = false
      oldValue = value
      observer.next(value)
      return
    }

    if (equals(oldValue, value)) {
      return
    }

    oldValue = value
    observer.next(value)
  }
}

export const skipRepeats = <T>(
  equals: (a: T, b: T) => boolean = defaultEquals
): Unary<Subscribable<T>, Subscribable<T>> => {
  return (stream: Subscribable<T>) => {
    return transform(stream, skip(equals))
  }
}
