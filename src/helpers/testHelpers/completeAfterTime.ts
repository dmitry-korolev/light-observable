import { Observer } from '../../core/types.h'

export function completeAfterTime(ms: number): (observer: Observer<any>) => void
export function completeAfterTime(observer: Observer<any>, ms: number): void
export function completeAfterTime(observerOrMs: Observer<any> | number, ms?: number) {
  if (typeof observerOrMs === 'number') {
    return (observer: Observer<any>) => {
      setTimeout(() => observer.complete(), observerOrMs)
    }
  }

  setTimeout(() => observerOrMs.complete(), ms)
}
