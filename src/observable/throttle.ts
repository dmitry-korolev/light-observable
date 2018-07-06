import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { throttle as throttleFunc } from '../helpers/throttle'
import { transform } from '../helpers/transform'

export const throttle = <T>(time: number, stream: Subscribable<T>): Observable<T> => {
  return transform(
    stream,
    throttleFunc(time, (observer, value) => {
      observer.next(value)
    })
  )
}
