import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { pairwise as pairwiseObservable } from '../observable/pairwise'

export const pairwise = () => <T>(stream: Subscribable<T>): Observable<[T, T]> => {
  return pairwiseObservable(stream)
}
