import { Observable } from '..'
import { Subscribable } from '../core/types.h'
import { curry } from '../helpers/curry'
import { skipRepeats as skipRepeatsObservable } from '../observable/skipRepeats'

export const skipRepeats: <T>(
  equals: (a: T, b: T) => boolean
) => (stream: Subscribable<T>) => Observable<T> = curry(skipRepeatsObservable as any)
