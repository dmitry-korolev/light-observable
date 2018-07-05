import { curry } from '../helpers/curry'
import { tap as tapObservable } from '../observable/tap'

export const tap = curry(tapObservable)
