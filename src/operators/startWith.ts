import { Observable } from '..'
import { FromInput, Subscribable } from '../core/types.h'
import { startWith as startWithObservable } from '../observable'

export const startWith = <T>(input: FromInput<T>) => (stream: Subscribable<T>): Observable<T> =>
  startWithObservable(input, stream)
