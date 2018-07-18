import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { sample as sampleObservable } from '../observable'

export const sample = (signal: Subscribable<any>) => <T>(
  source: Subscribable<T>
): Observable<T> => {
  return sampleObservable(signal, source)
}
