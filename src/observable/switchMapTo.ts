import { Observable } from '../core/Observable'
import { FromInput, Subscribable } from '../core/types.h'
import { map } from './map'
import { switchAll } from './switchAll'

export const switchMapTo = <T>(value: FromInput<T>, stream: Subscribable<any>): Observable<T> => {
  return switchAll(map(() => value, stream))
}
