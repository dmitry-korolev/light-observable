import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { takeLast as takeLastObservable } from '../observable'

export const takeLast = (count: number) => <T>(stream: Subscribable<T>): Observable<T> => {
  return takeLastObservable(count, stream)
}
