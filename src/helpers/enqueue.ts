export function enqueue(fn: () => void) {
  // tslint:disable-next-line no-floating-promises
  Promise.resolve().then(fn)
}
