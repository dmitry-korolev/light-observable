import { enqueue } from './helpers/enqueue'
import { $$iterator, $$observable } from './helpers/symbols'
import { ObservableSubscription } from './ObservableSubscription'
import { PartialObserver, Subscribable, Subscriber } from './types.h'

const fromArray = <T>(arrayLike: ArrayLike<T>): Subscriber<T> => {
  return (observer) => {
    enqueue(() => {
      for (const item of arrayLike as T[]) {
        if (observer.closed) {
          return
        }
        observer.next(item)
      }

      observer.complete()
    })
  }
}

export class Observable<T> implements Subscribable<T> {
  static of<A>(a: A): Observable<A>
  static of<A, B>(a: A, b: B): Observable<A | B>
  static of<A, B, C>(a: A, b: B, c: C): Observable<A | B | C>
  static of<A, B, C, D>(a: A, b: B, c: C, d: D): Observable<A | B | C | D>
  static of<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): Observable<A | B | C | D | E>
  static of(...items: any[]) {
    const C = typeof this === 'function' ? this : Observable

    return new C(fromArray(items))
  }

  static from<A>(ish: Subscribable<A>): Observable<A>
  static from<A>(ish: Iterable<A>): Observable<A>
  static from<A>(ish: Promise<A>): Observable<A>
  static from<A>(ish: A[]): Observable<A>
  static from<A>(ish: any) {
    const C = typeof this === 'function' ? this : Observable

    if (ish == null) {
      throw new TypeError(`${ish} is not an object`)
    }

    if (ish[$$observable]) {
      const observable = ish[$$observable]()

      if (Object(observable) !== observable) {
        throw new TypeError(`${ish} is not an object`)
      }

      if (isObservable(observable) && observable.constructor === C) {
        return observable as Observable<A>
      }

      return new C<A>((observer) => observable.subscribe(observer))
    }

    if (ish[$$iterator]) {
      return new C(fromArray(ish[$$iterator]()))
    }

    // For old browsers that doesn't support @@iterator
    /* istanbul ignore next */
    if (Array.isArray(ish)) {
      return new C<A>(fromArray(ish))
    }

    throw new TypeError(ish + ' is not observable')
  }

  private _source: Subscriber<T>

  constructor(source: Subscriber<T>) {
    // This check should stay in case if the ES6->ES5 transpiling is enabled.
    /* istanbul ignore next */
    if (!isObservable(this)) {
      throw new TypeError('Observable cannot be called as a function')
    }

    if (typeof source !== 'function') {
      throw new TypeError('Observable initializer must be a function')
    }

    this._source = source
  }

  subscribe(
    next?: PartialObserver<T> | ((value: T) => void),
    error?: (reason: any) => void,
    complete?: () => void
  ) {
    let observer: any
    if (typeof next !== 'object' || next === null) {
      observer = {
        next,
        error,
        complete
      }
    } else {
      observer = next
    }

    return new ObservableSubscription(observer, this._source)
  }

  [$$observable]() {
    return this
  }
}

function isObservable(x: any): x is Observable<any> {
  return x instanceof Observable // SPEC: Brand check
}
