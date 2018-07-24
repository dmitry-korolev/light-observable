import { Observable } from '../core/Observable'
import { FromInput, Subscribable } from '../core/types.h'
import { switchAll as switchAllObservable } from '../observable/switchAll'

export const switchAll = () => <T>(stream: Subscribable<FromInput<T>>): Observable<T> => {
  return switchAllObservable(stream)
}
