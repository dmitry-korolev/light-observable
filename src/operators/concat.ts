import { Observable } from '../core/Observable'
import { ArrayValues, Subscribable } from '../core/types.h'
import { ExtractInnerTypes } from '../helpers/types/extractInnnerTypes'
import { concat as concatObservable } from '../observable/concat'

export function concat<TS extends Array<Subscribable<any>>>(
  ...args: TS
): <T>(stream: Subscribable<T>) => Observable<ArrayValues<ExtractInnerTypes<TS>> | T>

export function concat() {
  const streams: Array<Subscribable<any>> = Array.prototype.slice.call(arguments)

  return (stream: Subscribable<any>) => {
    const allStreams = [stream].concat(streams)

    return concatObservable.apply(null, allStreams)
  }
}
