import { Subscribable } from '../core/types.h'

export const forEach = <S>(fn: (value: S) => void, stream: Subscribable<S>) => {
  return new Promise((resolve, reject) => {
    const subscription = stream.subscribe({
      next(value) {
        try {
          fn(value)
        } catch (e) {
          reject(e)
          subscription.unsubscribe()
        }
      },
      error: reject,
      complete: resolve
    })
  })
}
