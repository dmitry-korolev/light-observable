import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { map } from '../observable/map'

export const mapTo = <T>(value: T) => (stream: Subscribable<any>): Observable<T> =>
  map(() => value, stream)
