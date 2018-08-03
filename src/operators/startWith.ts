import { Observable } from '../core/Observable'
import { ArrayValues, Subscribable } from '../core/types.h'
import { startWith as startWithObservable } from '../observable/startWith'

export function startWith<TS extends any[]>(
  ...args: TS
): <T>(stream: Subscribable<T>) => Observable<ArrayValues<TS> | T>
export function startWith() {
  const input = Array.prototype.slice.call(arguments)

  return (stream: Subscribable<any>): Observable<any> => {
    return startWithObservable.apply(null, [stream].concat(input))
  }
}
