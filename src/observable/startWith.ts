import { Observable } from '../core/Observable'
import { ArrayValues, Subscribable } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { concat } from './concat'

export function startWith<T, TS extends any[]>(
  stream: Subscribable<T>,
  ...args: TS
): Observable<ArrayValues<TS> | T>
export function startWith(): Observable<any> {
  const input = Array.prototype.slice.call(arguments, 1)
  const stream = arguments[0]
  const C = getSpecies(stream)

  return concat(C.from(input), stream)
}
