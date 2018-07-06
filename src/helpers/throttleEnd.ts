export const throttleEnd = <This = any>(wait: number, fn: (this: This, ...args: any[]) => void) => {
  let lastValues: any[] = []
  let timeout: any

  return function(this: This, ...args: any[]): void {
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
