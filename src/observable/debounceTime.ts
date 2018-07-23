import { Observable, Subscribable } from '..'
import { debounce } from '../helpers/debounce'
import { transform } from '../helpers/transform'

export const debounceTime = <T>(time: number, stream: Subscribable<T>): Observable<T> => {
  return transform(
    stream,
    debounce(time, (observer, value) => {
      observer.next(value)
    })
  )
}
