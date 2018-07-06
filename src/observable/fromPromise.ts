import { Observable } from '../core/Observable'
import { defer } from './defer'

export const fromPromise = <T>(promise: Promise<T>): Observable<T> => {
  return defer(() => promise)
}
