import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { Concat } from '../helpers/types/concat'
import { ExtractInnerTypes } from '../helpers/types/extractInnnerTypes'
import { combineLatest as combineLatestObservable } from '../observable/combineLatest'

export function combineLatest<TS extends Array<Subscribable<any>>>(
  ...streams: TS
): <T>(stream: Subscribable<T>) => Observable<Concat<[T], ExtractInnerTypes<TS>>>
export function combineLatest() {
  const streams: Array<Subscribable<any>> = Array.prototype.slice.call(arguments)

  return (stream: Subscribable<any>) => {
    const allStreams = [stream].concat(streams)

    return combineLatestObservable.apply(null, allStreams)
  }
}
