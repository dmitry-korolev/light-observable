import { Observable } from '../core/Observable'

export function of<A>(a: A): Observable<A>
export function of<A, B>(a: A, b: B): Observable<A | B>
export function of<A, B, C>(a: A, b: B, c: C): Observable<A | B | C>
export function of<A, B, C, D>(a: A, b: B, c: C, d: D): Observable<A | B | C | D>
export function of<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): Observable<A | B | C | D | E>
export function of(...values: any[]): Observable<any> {
  return Observable.of.apply(Observable, values)
}
