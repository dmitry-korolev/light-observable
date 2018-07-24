import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { delay as delayObservable } from '../observable/delay'

export const delay = (wait: number) => <T>(stream: Subscribable<T>): Observable<T> => {
  return delayObservable(wait, stream)
}
