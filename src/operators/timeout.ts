import { curry } from '../helpers/curry'
import { timeout as timeoutObservable } from '../observable/timeout'

export const timeout = curry(timeoutObservable)
