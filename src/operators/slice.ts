import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { slice as sliceObservable } from '../observable/slice'

export const slice = (from: number, to: number) => <T>(stream: Subscribable<T>): Observable<T> => {
  return sliceObservable(from, to, stream)
}
