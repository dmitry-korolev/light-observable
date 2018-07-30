import { Observable } from '../core/Observable'
import { Subscribable, SubscriptionObserver } from '../core/types.h'
import { getSpecies } from '../helpers/getSpecies'
import { createSubject } from './subject'

export const groupBy = <T, K>(
  selector: (value: T) => K,
  stream: Subscribable<T>
): Observable<Observable<T>> => {
  const C = getSpecies(stream)

  return new C((observer) => {
    const groups = new Map<K, [Observable<T>, SubscriptionObserver<T>]>()
    return stream.subscribe({
      error(reason) {
        observer.error(reason)
      },
      complete() {
        groups.forEach(([_, sink]) => sink.complete())
        observer.complete()
      },
      next(value) {
        const key = selector(value)
        let subject: [Observable<T>, SubscriptionObserver<T>]

        if (groups.has(key)) {
          subject = groups.get(key)! // WTF TS
        } else {
          subject = createSubject<T>()
          observer.next(subject[0])
          groups.set(key, subject)
        }

        subject[1].next(value)
      }
    })
  })
}
