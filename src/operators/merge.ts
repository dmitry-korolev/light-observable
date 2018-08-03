import { Observable } from '../core/Observable'
import { ArrayValues, Subscribable } from '../core/types.h'
import { ExtractInnerTypes } from '../helpers/types/extractInnnerTypes'
import { merge as mergeObservable } from '../observable/merge'

export function merge<TS extends Array<Subscribable<any>>>(
  ...streams: TS
): <T>(stream: Subscribable<T>) => Observable<T | ArrayValues<ExtractInnerTypes<TS>>>
export function merge() {
  const streams: Array<Subscribable<any>> = Array.prototype.slice.call(arguments)

  return (stream: Subscribable<any>) => {
    const allStreams = [stream].concat(streams)

    return mergeObservable.apply(null, allStreams)
  }
}
