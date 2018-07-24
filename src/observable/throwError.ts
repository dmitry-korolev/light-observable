import { Observable } from '../core/Observable'

export const throwError = (reason: any): Observable<void> => {
  return new Observable((observer) => {
    observer.error(reason)
  })
}
