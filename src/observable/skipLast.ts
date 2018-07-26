import { Observer } from 'rxjs'
import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { transform } from '../helpers/transform'

const skipLastFn = <T>(count: number) => {
  const values: T[] = new Array(count)

  return (observer: Observer<T>, value: T, index: number) => {
    if (index < count) {
      values[index] = value
    } else {
      const currentIndex = index % count
      const oldValue = values[currentIndex]

      values[currentIndex] = value
      observer.next(oldValue)
    }
  }
}

export const skipLast = <T>(count: number, stream: Subscribable<T>): Observable<T> => {
  if (count < 1) {
    return stream as Observable<T>
  }

  return transform(stream, skipLastFn(count))
}
