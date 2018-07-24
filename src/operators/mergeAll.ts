import { Observable } from '../core/Observable'
import { FromInput, Subscribable } from '../core/types.h'
import { mergeAll as mergeAllObservable } from '../observable/mergeAll'

export const mergeAll = () => <T>(stream: Subscribable<FromInput<T>>): Observable<T> => {
  return mergeAllObservable(stream)
}
