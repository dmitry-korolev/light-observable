import { Observable } from '../core/Observable'
import { FromInput } from '../core/types.h'

export const from = <A>(ish: FromInput<A>) => {
  return Observable.from(ish)
}
