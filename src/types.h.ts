export type Subscription = {
  closed?: boolean
  unsubscribe(): void
}

export interface NextObserver<T> {
  closed?: boolean
  next: (value: T) => void
  error?: (err: any) => void
  complete?: () => void
}

export interface ErrorObserver<T> {
  closed?: boolean
  next?: (value: T) => void
  error: (err: any) => void
  complete?: () => void
}

export interface CompletionObserver<T> {
  closed?: boolean
  next?: (value: T) => void
  error?: (err: any) => void
  complete: () => void
}

export type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>

export interface Observer<T> {
  closed?: boolean
  next: (value: T) => void
  error: (err: any) => void
  complete: () => void
}

export type Disposer = void | (() => void) | ({ unsubscribe: () => void }) | Subscription

export type Subscriber<T> = (observer: Observer<T>) => Disposer

export type Subscribable<T> = {
  closed?: boolean
  subscribe(
    next?: PartialObserver<T> | ((value: T) => void),
    error?: (reason: any) => void,
    complete?: () => void
  ): Subscription
}

export const enum SubscriptionState {
  initializing,
  buffering,
  ready,
  running,
  closed
}

export const enum SignalType {
  next,
  error,
  complete
}
