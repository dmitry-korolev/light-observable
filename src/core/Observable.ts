// tslint:disable max-classes-per-file no-use-before-declare
import $$observable from 'symbol-observable'
import {
  Disposer,
  PartialObserver,
  SignalType,
  Subscribable,
  Subscriber,
  Subscription,
  SubscriptionObserver,
  Unary
} from './types.h'

const fromArray = <T>(arrayLike: ArrayLike<T>): Subscriber<T> => {
  return (observer) => {
    for (const item of arrayLike as T[]) {
      if (observer.closed) {
        return
      }
      observer.next(item)
    }

    observer.complete()
  }
}

function cleanupSubscription(subscription: ObservableSubscription<any>) {
  const disposer = subscription._disposer
  if (!disposer) {
    return
  }

  subscription._disposer = undefined

  if (typeof disposer === 'function') {
    disposer()
  } else {
    if (disposer.unsubscribe) {
      disposer.unsubscribe()
    }
  }
}

function closeSubscription(subscription: ObservableSubscription<any>) {
  subscription._observer = undefined
  subscription._closed = true
}

function notifySubscription<T>(
  subscription: ObservableSubscription<T>,
  type: SignalType,
  value: any
) {
  if (subscription.closed) {
    return
  }

  const observer = subscription._observer

  /* istanbul ignore next */
  if (!observer) {
    return
  }

  switch (type) {
    case SignalType.next:
      if (observer.next) {
        observer.next(value)
      }

      break

    case SignalType.error:
      closeSubscription(subscription)
      if (observer.error) {
        observer.error(value)
      } else {
        cleanupSubscription(subscription)
        throw value
      }
      break

    case SignalType.complete:
      closeSubscription(subscription)
      if (observer.complete) {
        observer.complete()
      }
      break
  }

  if (subscription.closed) {
    cleanupSubscription(subscription)
  }
}

class ObservableSubscription<T> implements Subscription {
  _disposer: Disposer | undefined
  _observer: PartialObserver<T> | undefined
  _closed: boolean = false

  constructor(observer: PartialObserver<T>, source: Subscriber<T>) {
    this._observer = observer

    if (observer.start) {
      observer.start(this)
    }

    const subscriptionObserver = new ConcreteObserver(this)

    try {
      this._disposer = source(subscriptionObserver)
    } catch (error) {
      subscriptionObserver.error(error)
    }
  }

  get closed() {
    return this._closed
  }

  unsubscribe() {
    if (this.closed) {
      return
    }

    closeSubscription(this)
    cleanupSubscription(this)
  }
}

class ConcreteObserver<T> implements SubscriptionObserver<T> {
  _subscription: ObservableSubscription<T>

  constructor(subscription: ObservableSubscription<T>) {
    this._subscription = subscription
  }

  get closed() {
    return this._subscription.closed
  }

  next(value: T) {
    notifySubscription(this._subscription, SignalType.next, value)
  }

  error(reason: any) {
    notifySubscription(this._subscription, SignalType.error, reason)
  }

  complete() {
    notifySubscription(this._subscription, SignalType.complete, undefined)
  }
}

export class Observable<T> implements Subscribable<T> {
  static of(): Observable<any>
  static of<A>(a: A): Observable<A>
  static of<A, B>(a: A, b: B): Observable<A | B>
  static of<A, B, C>(a: A, b: B, c: C): Observable<A | B | C>
  static of<A, B, C, D>(a: A, b: B, c: C, d: D): Observable<A | B | C | D>
  static of<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): Observable<A | B | C | D | E>
  static of() {
    const C = typeof this === 'function' ? this : Observable
    return new C(fromArray(arguments))
  }

  static from<A>(ish: Observable<A> | Iterable<A>) {
    const C = typeof this === 'function' ? this : Observable
    const error = `${ish} is not an object`

    if (ish == null) {
      throw new TypeError(error)
    }

    if ((ish as any)[$$observable]) {
      const observable = (ish as any)[$$observable]()

      if (Object(observable) !== observable) {
        throw new TypeError(error)
      }

      if (observable instanceof Observable && observable.constructor === C) {
        return observable as Observable<A>
      }

      return new C<A>((observer) => observable.subscribe(observer))
    }

    if (Symbol.iterator && (ish as any)[Symbol.iterator]) {
      return new C(fromArray((ish as any)[Symbol.iterator]()))
    }

    // For old browsers that doesn't support @@iterator
    /* istanbul ignore next */
    if (Array.isArray(ish)) {
      return new C<A>(fromArray(ish))
    }

    throw new TypeError(error)
  }

  private _subscribe: Subscriber<T>

  constructor(_subscribe: Subscriber<T>) {
    // This check should stay in case if the ES6->ES5 transpiling is enabled.
    /* istanbul ignore next */
    if (!(this instanceof Observable)) {
      throw new TypeError('Observable cannot be called as a function')
    }

    if (typeof _subscribe !== 'function') {
      throw new TypeError('Observable initializer must be a function')
    }

    this._subscribe = _subscribe
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

    return new ObservableSubscription(observer, this._subscribe)
  }

  pipe(): Observable<T>
  pipe<A>(op1: Unary<Observable<T>, A>): A
  pipe<A, B>(op1: Unary<Observable<T>, A>, op2: Unary<A, B>): B
  pipe<A, B, C>(op1: Unary<Observable<T>, A>, op2: Unary<A, B>, op3: Unary<B, C>): C
  pipe<A, B, C, D>(
    op1: Unary<Observable<T>, A>,
    op2: Unary<A, B>,
    op3: Unary<B, C>,
    op4: Unary<C, D>
  ): D
  pipe<A, B, C, D, E>(
    op1: Unary<Observable<T>, A>,
    op2: Unary<A, B>,
    op3: Unary<B, C>,
    op4: Unary<C, D>,
    op5: Unary<D, E>
  ): E
  pipe<A, B, C, D, E, F>(
    op1: Unary<Observable<T>, A>,
    op2: Unary<A, B>,
    op3: Unary<B, C>,
    op4: Unary<C, D>,
    op5: Unary<D, E>,
    op6: Unary<E, F>
  ): F
  pipe<A, B, C, D, E, F, G>(
    op1: Unary<Observable<T>, A>,
    op2: Unary<A, B>,
    op3: Unary<B, C>,
    op4: Unary<C, D>,
    op5: Unary<D, E>,
    op6: Unary<E, F>,
    op7: Unary<F, G>
  ): G
  pipe<A, B, C, D, E, F, G, H>(
    op1: Unary<Observable<T>, A>,
    op2: Unary<A, B>,
    op3: Unary<B, C>,
    op4: Unary<C, D>,
    op5: Unary<D, E>,
    op6: Unary<E, F>,
    op7: Unary<F, G>,
    op8: Unary<G, H>
  ): H
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: Unary<Observable<T>, A>,
    op2: Unary<A, B>,
    op3: Unary<B, C>,
    op4: Unary<C, D>,
    op5: Unary<D, E>,
    op6: Unary<E, F>,
    op7: Unary<F, G>,
    op8: Unary<G, H>,
    op9: Unary<H, I>
  ): I
  pipe(): any {
    if (!arguments.length) {
      return this
    }

    // tslint:disable-next-line no-this-assignment
    let result: any = this
    for (let i = 0; i < arguments.length; i += 1) {
      result = arguments[i](result)
    }

    return result
  }

  [$$observable]() {
    return this
  }
}
