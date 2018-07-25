import { Observable, Subscribable } from '..'
import { throttleEnd } from '../helpers/throttleEnd'
import { transform } from '../helpers/transform'

export const auditTime = <T>(duration: number, stream: Subscribable<T>): Observable<T> => {
  return transform(
    stream,
    throttleEnd(duration, (observer, value) => {
      observer.next(value)
    })
  )
}
