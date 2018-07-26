# Types
```typescript
declare class Observable<T> implements Subscribable<T> {
  static of<TS extends Array<any>>(
    ...args: TS
  ): Observable<TS extends Array<infer T> ? T : null>
  static from<A>(ish: Observable<A> | Iterable<A>): Observable<A>
  constructor(source: Subscriber<T>)
  subscribe(
    next?: PartialObserver<T> | ((value: T) => void),
    error?: (reason: any) => void,
    complete?: () => void
  ): ObservableSubscription<T>
  pipe(...operations: Array<Unary<any, any>>): any
}

declare class ObservableSubscription<T> implements Subscription {
  constructor(observer: PartialObserver<T>, source: Subscriber<T>)
  readonly closed: boolean
  unsubscribe(): void
}

interface Subscribable<T> {
  closed?: boolean
  subscribe(
    next?: PartialObserver<T> | ((value: T) => void),
    error?: (reason: any) => void,
    complete?: () => void
  ): Subscription
}

interface Subscription {
  closed?: boolean
  unsubscribe(): void
}

interface NextObserver<T> {
  closed?: boolean
  next: (value: T) => void
  error?: (reason: any) => void
  complete?: () => void
  start?: (subscription: Subscription) => void
}

interface ErrorObserver<T> {
  closed?: boolean
  next?: (value: T) => void
  error: (reason: any) => void
  complete?: () => void
  start?: (subscription: Subscription) => void
}

interface CompletionObserver<T> {
  closed?: boolean
  next?: (value: T) => void
  error?: (reason: any) => void
  complete: () => void
  start?: (subscription: Subscription) => void
}

type PartialObserver<T> =
  | NextObserver<T>
  | ErrorObserver<T>
  | CompletionObserver<T>

interface SubscriptionObserver<T> {
  closed?: boolean
  next: (value: T) => void
  error: (reason: any) => void
  complete: () => void
}

type Subscriber<T> = (observer: SubscriptionObserver<T>) => Disposer

type Disposer =
  | void
  | (() => void)
  | ({ unsubscribe: () => void })
  | Subscription

type Unary<T, R> = (arg: T) => R
```
