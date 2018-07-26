import { Subscribable } from '../core/types.h'

// tslint:disable-next-line no-empty
const noop = () => {}

export const forEach = <S>(
  fn: (value: S, index: number) => void = noop,
  stream: Subscribable<S>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let i = 0
    const subscription = stream.subscribe({
      next(value) {
        try {
          fn(value, i)
          i += 1
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
