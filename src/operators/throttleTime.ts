import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { throttleTime as throttleObservable } from '../observable/throttleTime'

export const throttleTime = (time: number) => <T>(stream: Subscribable<T>): Observable<T> =>
  throttleObservable(time, stream)
