import { Observable } from '../core/Observable'
import { Subscribable, Unary } from '../core/types.h'
import { combineLatest as combineLatestObservable } from '../observable/combineLatest'

export function combineLatest<A>(): Unary<Subscribable<A>, Observable<[A]>>
export function combineLatest<A, B>(sA: Subscribable<A>): Unary<Subscribable<B>, Observable<[B, A]>>
export function combineLatest<A, B, C>(
  sA: Subscribable<A>,
  sB: Subscribable<B>
): Unary<Subscribable<C>, Observable<[C, A, B]>>
export function combineLatest<A, B, C, D>(
  sA: Subscribable<A>,
  sB: Subscribable<B>,
  sC: Subscribable<C>
): Unary<Subscribable<C>, Observable<[D, A, B, C]>>
export function combineLatest(...streams: Array<Subscribable<any>>) {
  return (stream: Subscribable<any>) => {
    const allStreams = [stream].concat(streams)

    return combineLatestObservable.apply(null, allStreams)
  }
}
