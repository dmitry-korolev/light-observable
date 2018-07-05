import { curry } from '../helpers/curry'
import { throttle as throttleObservable } from '../observable/throttle'

export const throttle = curry(throttleObservable)
