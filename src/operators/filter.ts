import { curry } from '../helpers/curry'
import { filter as filterObservable } from '../observable/filter'

export const filter = curry(filterObservable)
