import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { map } from './map'

export const mapTo = <T>(value: T, stream: Subscribable<any>): Observable<T> => {
  return map(() => value, stream)
}
