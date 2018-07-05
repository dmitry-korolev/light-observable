import { curry } from '../helpers/curry'
import { skipRepeats as skipRepeatsObservable } from '../observable/skipRepeats'

export const skipRepeats = curry(skipRepeatsObservable)
