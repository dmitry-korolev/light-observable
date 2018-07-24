import { Observable } from '../core/Observable'
import { FromInput, Subscribable } from '../core/types.h'
import { map } from './map'
import { mergeAll } from './mergeAll'

export const mergeMapTo = <T>(value: FromInput<T>, stream: Subscribable<any>): Observable<T> => {
  return mergeAll(map(() => value, stream))
}
