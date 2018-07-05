import { Observable, Subscribable } from '..'
import { curry } from '../helpers/curry'
import { timeout as timeoutObservable } from '../observable/timeout'

export const timeout: <T>(time: number) => (stream: Subscribable<T>) => Observable<T> = curry(
  timeoutObservable
)
