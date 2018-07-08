import { Observable } from '../core/Observable'
import { FromInput, Subscribable } from '../core/types.h'
import { switchMap } from './switchMap'

export const switchMapTo = <T>(value: FromInput<T>, stream: Subscribable<any>): Observable<T> => {
  return switchMap(() => value, stream)
}
