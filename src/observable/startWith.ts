import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { concat } from './concat'

export function startWith<A, T>(stream: Subscribable<T>, a: A): Observable<A | T>
export function startWith<A, B, T>(stream: Subscribable<T>, a: A, b: B): Observable<A | B | T>
export function startWith<A, B, C, T>(
  stream: Subscribable<T>,
  a: A,
  b: B,
  c: C
): Observable<A | B | C | T>
export function startWith<A, B, C, D, T>(
  stream: Subscribable<T>,
  a: A,
  b: B,
  c: C,
  d: D
): Observable<A | B | C | D | T>
export function startWith<A, B, C, D, E, T>(
  stream: Subscribable<T>,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E
): Observable<A | B | C | D | E | T>
export function startWith(): Observable<any> {
  const input = Array.prototype.slice.call(arguments, 1)
  const stream = arguments[0]
  const C = getSpecies(stream)

  return concat(C.from(input), stream)
}
