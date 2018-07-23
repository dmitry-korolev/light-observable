import { Observable } from '..'
import { Subscribable } from '../core/types.h'
import { take as takeObservable } from '../observable/take'

export const take = (count: number) => <T>(stream: Subscribable<T>): Observable<T> => {
  return takeObservable(count, stream)
}
