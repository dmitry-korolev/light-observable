import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { startWith as startWithObservable } from '../observable/startWith'

export function startWith<A>(a: A): <T>(stream: Subscribable<T>) => Observable<A | T>
export function startWith<A, B>(a: A, b: B): <T>(stream: Subscribable<T>) => Observable<A | B | T>
export function startWith<A, B, C>(
  a: A,
  b: B,
  c: C
): <T>(stream: Subscribable<T>) => Observable<A | B | C | T>
export function startWith<A, B, C, D>(
  a: A,
  b: B,
  c: C,
  d: D
): <T>(stream: Subscribable<T>) => Observable<A | B | C | D | T>
export function startWith<A, B, C, D, E>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E
): <T>(stream: Subscribable<T>) => Observable<A | B | C | D | E | T>
export function startWith() {
  const input = Array.prototype.slice.call(arguments)

  return (stream: Subscribable<any>): Observable<any> => {
    return startWithObservable.apply(null, [stream].concat(input))
  }
}
