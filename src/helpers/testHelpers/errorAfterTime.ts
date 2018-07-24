import { Observer } from '../../core/types.h'

export function errorAfterTime(ms: number, reason: any): (observer: Observer<any>) => void
export function errorAfterTime(observer: Observer<any>, ms: number, reason: any): void
export function errorAfterTime(
  observerOrMs: Observer<any> | number,
  msOrReason: number | any,
  reason?: any
) {
  if (typeof observerOrMs === 'number') {
    return (observer: Observer<any>) => {
      setTimeout(() => observer.error(msOrReason), observerOrMs)
    }
  }

  setTimeout(() => observerOrMs.error(reason), msOrReason)
}
