import { Subscribable } from '../core/types.h'

// tslint:disable-next-line no-empty
const noop = (...a: any[]) => {}

export const forEach = <S>(
  fn: (value: S) => void = noop,
  stream: Subscribable<S>
): Promise<void> => {
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
