import { Observable } from '..'
import { Subscribable } from '../core/types.h'
import { curry } from '../helpers/curry'
import { catchError as catchErrorObservable } from '../observable/catchError'

export const catchError: <T>(
  fn: (reason: any) => Subscribable<T>
) => (stream: Subscribable<T>) => Observable<T> = curry(catchErrorObservable)
