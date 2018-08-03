import { Observable } from '../core/Observable'
import { ArrayValues } from '../core/types.h'

export function of<TS extends any[]>(...args: TS): Observable<ArrayValues<TS>>
export function of(): Observable<any> {
  return Observable.of.apply(Observable, arguments)
}
