import { Observer } from '../../core/types.h'

export function emitAfterTime<T>(ms: number, value: T): (observer: Observer<T>) => void
export function emitAfterTime<T>(observer: Observer<T>, ms: number, value: T): void
export function emitAfterTime<T>(
  observerOrMs: Observer<T> | number,
  msOrValue: number | any,
  value?: T
) {
  if (typeof observerOrMs === 'number') {
    return (observer: Observer<any>) => {
      setTimeout(() => observer.next(msOrValue), observerOrMs)
    }
  }

  setTimeout(() => observerOrMs.next(value!), msOrValue)
}
