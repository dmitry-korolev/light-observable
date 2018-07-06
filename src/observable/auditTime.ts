import { Observable, Subscribable } from '..'
import { throttleEnd } from '../helpers/throttleEnd'
import { transform } from '../helpers/transform'

export const auditTime = <T>(time: number, stream: Subscribable<T>): Observable<T> => {
  return transform(
    stream,
    throttleEnd(time, (observer, value) => {
      observer.next(value)
    })
  )
}
