import { Observable } from '../core/Observable'

type Unwrap<T> = T extends Promise<infer R> ? R : T

export const defer = <T>(fn: () => T) => {
  return new Observable<Unwrap<T>>((observer) => {
    Promise.resolve(fn()).then(
      (result) => {
        observer.next(result as Unwrap<T>)
        observer.complete()
      },
      (reason) => {
        observer.error(reason)
      }
    )
  })
}
