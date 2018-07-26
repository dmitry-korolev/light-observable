import { Observable } from '../core/Observable'

export const from = <A>(ish: Observable<A> | Iterable<A>) => {
  return Observable.from(ish)
}
