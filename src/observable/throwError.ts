import { Observable } from '../core/Observable'

export const throwError = <T = any>(error: T): Observable<never> => {
  return new Observable((observer) => {
    observer.error(error)
  })
}
