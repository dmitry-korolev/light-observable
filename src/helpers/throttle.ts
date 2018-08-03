/**
 * Creates a throttled function that only invokes func at most once per every `wait` milliseconds.
 * Function is called on the beginning of `wait` period.
 */
export const throttle = <TS extends any[]>(wait: number, func: (...args: TS) => void) => {
  let timeoutId: any

  return function(this: any, ...args: TS): void {
    if (timeoutId) {
      return
    }

    func.apply(this, args)
    timeoutId = setTimeout(() => {
      timeoutId = null
    }, wait)
  }
}
