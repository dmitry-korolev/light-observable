import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { skip as skipObservable } from '../observable'

export const skip = (count: number) => <T>(stream: Subscribable<T>): Observable<T> => {
  return skipObservable(count, stream)
}
