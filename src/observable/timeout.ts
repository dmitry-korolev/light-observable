import { Subscribable } from '..'
import { getSpecies } from '../helpers/getSpecies'

export const timeout = <T>(time: number, stream: Subscribable<T>) => {
  const C = getSpecies(stream)

  return new C<T>((observer) => {
    let timer: any = setTimeout(() => {
      observer.error(new Error('Timeout has occurred'))
    }, time)

    return stream.subscribe({
      next(value) {
        observer.next(value)

        if (timer) {
          clearTimeout(timer)
          timer = null
        }
      },
      error(reason) {
        observer.error(reason)

        clearTimeout(timer)
        timer = null
      },
      complete() {
        observer.complete()

        clearTimeout(timer)
        timer = null
      }
    })
  })
}
