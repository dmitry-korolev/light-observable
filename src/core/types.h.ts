export type Subscription = {
  closed?: boolean
  unsubscribe(): void
}

export interface NextObserver<T> {
  closed?: boolean
  next: (value: T) => void
  error?: (err: any) => void
  complete?: () => void
  start?: (subscription: Subscription) => void
}

export interface ErrorObserver<T> {
  closed?: boolean
  next?: (value: T) => void
  error: (err: any) => void
  complete?: () => void
  start?: (subscription: Subscription) => void
}

export interface CompletionObserver<T> {
  closed?: boolean
  next?: (value: T) => void
  error?: (err: any) => void
  complete: () => void
  start?: (subscription: Subscription) => void
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

export type FromInput<T> = Subscribable<T> | Iterable<T> | Promise<T> | T[]

export const enum SignalType {
  next,
  error,
  complete
}
