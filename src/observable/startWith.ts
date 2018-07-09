import { Observable } from '../core/Observable'
import { FromInput, Subscribable } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { concat } from './concat'

export const startWith = <T>(input: FromInput<T>, stream: Subscribable<T>): Observable<T> => {
  const C = getSpecies(stream)

  return concat(C.from(input), stream)
}
