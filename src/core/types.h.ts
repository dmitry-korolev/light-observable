export interface Subscription {
  closed?: boolean
  unsubscribe(): void
}

export interface NextObserver<T> {
  closed?: boolean
  next: (value: T) => void
  error?: (reason: any) => void
  complete?: () => void
  start?: (subscription: Subscription) => void
}

export interface ErrorObserver<T> {
  closed?: boolean
  next?: (value: T) => void
  error: (reason: any) => void
  complete?: () => void
  start?: (subscription: Subscription) => void
}

export interface CompletionObserver<T> {
  closed?: boolean
  next?: (value: T) => void
  error?: (reason: any) => void
  complete: () => void
  start?: (subscription: Subscription) => void
}

export type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>

export interface SubscriptionObserver<T> {
  closed?: boolean
  next: (value: T) => void
  error: (reason: any) => void
  complete: () => void
}

export type Disposer = void | (() => void) | ({ unsubscribe: () => void }) | Subscription

export type Subscriber<T> = (observer: SubscriptionObserver<T>) => Disposer

export interface Subscribable<T> {
  closed?: boolean
  subscribe(
    next?: PartialObserver<T> | ((value: T) => void),
    error?: (reason: any) => void,
    complete?: () => void
  ): Subscription
}

export type FromInput<T> = Subscribable<T> | Iterable<T> | T[]

export type Unary<T, R> = (arg: T) => R

export const enum SignalType {
  next,
  error,
  complete
}
