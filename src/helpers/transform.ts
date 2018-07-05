import { Observable } from '..'
import { Observer, Subscribable } from '../core/types.h'
import { getSpecies } from './getSpecies'

export const transform = <T, R = T>(
  stream: Subscribable<T>,
  fn: (observer: Observer<R>, value: T) => void
): Observable<R> => {
  const C = getSpecies(stream)

  return new C<R>((observer) =>
    stream.subscribe({
      next(value) {
        try {
          fn(observer, value)
        } catch (e) {
          observer.error(e)
        }
      },
      error(e) {
        observer.error(e)
      },
      complete() {
        observer.complete()
      }
    })
  )
}
