export const curry = <A, B, R>(fn: (a: A, b: B) => R) => {
  return (a: A) => (b: B) => fn(a, b)
}
