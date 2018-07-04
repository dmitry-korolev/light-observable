import { Subscribable } from '../core/types.h'
import { Unary } from './pipe'

export const forEach = <S>(fn: (value: S) => void): Unary<Subscribable<S>, Promise<void>> => (
  stream: Subscribable<S>
) => {
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
