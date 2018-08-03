// tslint:disable no-bitwise
import { Observable } from '../core/Observable'
import { Subscribable, Subscription } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { ExtractInnerTypes } from '../helpers/types/extractInnnerTypes'
import { EMPTY } from './empty'

export function combineLatest<TS extends Array<Subscribable<any>>>(
  ...streams: TS
): Observable<ExtractInnerTypes<TS>>
export function combineLatest(): Observable<any> {
  if (arguments.length < 1) {
    return EMPTY
  }

  const size = arguments.length
  const streams: Array<Subscribable<any>> = Array.prototype.slice.call(arguments)
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
