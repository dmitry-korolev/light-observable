import { curry } from '../helpers/curry'
import { catchError as catchErrorObservable } from '../observable/catchError'

export const catchError = curry(catchErrorObservable)
