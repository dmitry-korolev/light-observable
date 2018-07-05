import { Unary } from './pipe'

type Curry<F> = F extends ((a: infer A, b: infer B) => infer R) ? Unary<A, Unary<B, R>> : F

export const curry = <T extends (a: any, b: any) => any>(fn: T): Curry<T> => {
  return ((a: any) => (b: any) => fn(a, b)) as any
}
