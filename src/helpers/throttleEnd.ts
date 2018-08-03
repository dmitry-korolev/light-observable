export const throttleEnd = <TS extends any[]>(wait: number, fn: (...args: TS) => void) => {
  let lastValues: TS
  let timeout: any

  return function(this: any, ...args: TS): void {
    lastValues = args

    if (timeout) {
      return
    }

    timeout = setTimeout(() => {
      timeout = null
      fn.apply(this, lastValues)
    })
  }
}
