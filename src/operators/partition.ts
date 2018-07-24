import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { filter } from '../observable/filter'
import { reject } from '../observable/reject'

export const partition = <T>(fn: (value: T) => boolean) => (
  stream: Subscribable<T>
): [Observable<T>, Observable<T>] => {
  return [filter(fn, stream), reject(fn, stream)]
}
