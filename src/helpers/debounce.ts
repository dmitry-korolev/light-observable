export const debounce = <TS extends any[]>(wait: number, func: (...args: TS) => void) => {
  let timeoutId: any = null

  return function(this: any, ...args: TS): void {
    timeoutId > 0 && clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      timeoutId = null
      func.apply(this, args)
    }, wait)
  }
}
