import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { transform } from '../helpers/transform'

export const sample = <T>(signal: Subscribable<any>, stream: Subscribable<T>): Observable<T> => {
  const C = getSpecies(stream)

  return transform(signal)
}
