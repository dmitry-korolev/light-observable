import { Observable, Subscribable } from '..'
import { debounce } from '../helpers/debounce'
import { getSpecies } from '../helpers/getSpecies'

export const debounceTime = <T>(time: number, stream: Subscribable<T>): Observable<T> => {
  const C = getSpecies(stream)

  return new C<T>((observer) => {
    let lastValue: T
    let lastEmitted = true
    const debouncedNext = debounce(time, (value: T) => {
      observer.next(value)
      lastEmitted = true
    })

    return stream.subscribe({
      next(value) {
        lastValue = value
        lastEmitted = false
        debouncedNext(value)
      },
      error(e) {
        observer.error(e)
      },
      complete() {
        if (!lastEmitted) {
          observer.next(lastValue)
        }
        observer.complete()
      }
    })
  })
}
