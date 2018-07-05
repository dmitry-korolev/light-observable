import { Observable } from '..'
import { Subscribable } from '../core/types.h'
import { curry } from '../helpers/curry'
import { filter as filterObservable } from '../observable/filter'

export const filter: <T>(
  fn: (value: T) => boolean
) => (stream: Subscribable<T>) => Observable<T> = curry(filterObservable)
