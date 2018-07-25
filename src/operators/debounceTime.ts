import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { debounceTime as debounceTimeObservable } from '../observable/debounceTime'

export const debounceTime = (dueTime: number) => <T>(stream: Subscribable<T>): Observable<T> =>
  debounceTimeObservable(dueTime, stream)
