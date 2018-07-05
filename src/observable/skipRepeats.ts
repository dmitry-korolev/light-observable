import { Observer, Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

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
  equals: (a: T, b: T) => boolean = defaultEquals,
  stream: Subscribable<T>
) => {
  return transform(stream, skip(equals))
}
