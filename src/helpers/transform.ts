import { Observable } from '../core/Observable'
import { Observer, Subscribable } from '../core/types.h'
import { getSpecies } from './getSpecies'

export const transform = <T, R = T>(
  stream: Subscribable<T>,
  fn: (observer: Observer<R>, value: T, index: number) => void
): Observable<R> => {
  const C = getSpecies(stream)

  return new C<R>((observer) => {
    let index = 0
    return stream.subscribe({
      next(value) {
        try {
          fn(observer, value, index)
          index += 1
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
  })
}
