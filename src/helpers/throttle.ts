/**
 * Creates a throttled function that only invokes func at most once per every `wait` milliseconds.
 * Function is called on the beginning of `wait` period.
 */
export const throttle = <This = any>(wait: number, func: (this: This, ...args: any[]) => void) => {
  let timeoutId: any

  return function(this: This, ...args: any[]): void {
    if (timeoutId) {
      return
    }

    func.apply(this, args)
    timeoutId = setTimeout(() => {
      timeoutId = null
    }, wait)
  }
}
