export const debounce = <This = any>(wait: number, func: (this: This, ...args: any[]) => void) => {
  let timeoutId: any = null

  return function(this: This, ...args: any[]): void {
    timeoutId > 0 && clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      timeoutId = null
      func.apply(this, args)
    }, wait)
  }
}
