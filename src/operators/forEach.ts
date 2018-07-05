import { curry } from '../helpers/curry'
import { forEach as forEachObservable } from '../observable/forEach'

export const forEach = curry(forEachObservable)
