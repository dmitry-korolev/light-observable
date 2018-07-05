import { curry } from '../helpers/curry'
import { map as mapObservable } from '../observable/map'

export const map = curry(mapObservable)
