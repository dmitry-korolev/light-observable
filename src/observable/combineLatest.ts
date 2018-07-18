// tslint:disable no-bitwise
import { Observable } from '../core/Observable'
import { Subscribable, Subscription } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { EMPTY } from './empty'

// TODO: replace with spread after TS3.0 release
export function combineLatest(): Observable<void>
export function combineLatest<A>(s: Observable<A>): Observable<[A]>
export function combineLatest<A, B>(sA: Observable<A>, sB: Observable<B>): Observable<[A, B]>
export function combineLatest<A, B, C>(
  sA: Observable<A>,
  sB: Observable<B>,
  sC: Observable<C>
): Observable<[A, B, C]>
export function combineLatest<A, B, C, D>(
  sA: Observable<A>,
  sB: Observable<B>,
  sC: Observable<C>,
  sD: Observable<D>
): Observable<[A, B, C, D]>
export function combineLatest(...streams: Array<Subscribable<any>>): Observable<any> {
  if (streams.length < 1) {
    return EMPTY
  }

  const size = streams.length
  const flags = streams.map((_, i) => 2 ** i)
  // Here we get a final mask matching every flag for every stream
  // Later we gonna start from zero back again and perform OR operation with every
  // next emit of every stream. Resulting mask will become equal to the flagSum
  // value only when every stream will emit at least once.
  // If you feel uncomfortable with bitwise operators, read this great article:
  // https://blog.rinatussenov.com/juggling-bits-in-javascript-bitmasks-128ad5f31bed
  const flagsSum = flags.reduce((p, v) => p | v, 0)
  const C = getSpecies(streams[0])

  return new C((observer) => {
    const result = new Array(size)
    const subscriptions: Subscription[] = []
    let readyMask = 0
    let completeMask = 0

    const next = (index: number) => (value: any) => {
      result[index] = value
      if (readyMask !== flagsSum) {
        readyMask = readyMask | flags[index]
      }
      if (readyMask === flagsSum) {
        observer.next(result.slice())
      }
    }

    const complete = (index: number) => () => {
      completeMask = completeMask | flags[index]
      if (completeMask === flagsSum) {
        observer.complete()
      }
    }

    streams.forEach((stream, index) => {
      subscriptions.push(
        stream.subscribe({
          next: next(index),
          complete: complete(index),
          error(reason) {
            observer.error(reason)
          }
        })
      )
    })

    return () => subscriptions.forEach((subscription) => subscription.unsubscribe())
  })
}
