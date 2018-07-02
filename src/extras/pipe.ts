export type Unary<T, R> = (arg: T) => R

export function pipe<T>(): Unary<T, T>
export function pipe<T, A>(op1: Unary<T, A>): Unary<T, A>
export function pipe<T, A, B>(op1: Unary<T, A>, op2: Unary<A, B>): Unary<T, B>
export function pipe<T, A, B, C>(op1: Unary<T, A>, op2: Unary<A, B>, op3: Unary<B, C>): Unary<T, C>
export function pipe<T, A, B, C, D>(
  op1: Unary<T, A>,
  op2: Unary<A, B>,
  op3: Unary<B, C>,
  op4: Unary<C, D>
): Unary<T, D>
export function pipe<T, A, B, C, D, E>(
  op1: Unary<T, A>,
  op2: Unary<A, B>,
  op3: Unary<B, C>,
  op4: Unary<C, D>,
  op5: Unary<D, E>
): Unary<T, E>
export function pipe<T, A, B, C, D, E, F>(
  op1: Unary<T, A>,
  op2: Unary<A, B>,
  op3: Unary<B, C>,
  op4: Unary<C, D>,
  op5: Unary<D, E>,
  op6: Unary<E, F>
): Unary<T, F>
export function pipe<T, A, B, C, D, E, F, G>(
  op1: Unary<T, A>,
  op2: Unary<A, B>,
  op3: Unary<B, C>,
  op4: Unary<C, D>,
  op5: Unary<D, E>,
  op6: Unary<E, F>,
  op7: Unary<F, G>
): Unary<T, G>
export function pipe<T, A, B, C, D, E, F, G, H>(
  op1: Unary<T, A>,
  op2: Unary<A, B>,
  op3: Unary<B, C>,
  op4: Unary<C, D>,
  op5: Unary<D, E>,
  op6: Unary<E, F>,
  op7: Unary<F, G>,
  op8: Unary<G, H>
): Unary<T, H>
export function pipe<T, A, B, C, D, E, F, G, H, I>(
  op1: Unary<T, A>,
  op2: Unary<A, B>,
  op3: Unary<B, C>,
  op4: Unary<C, D>,
  op5: Unary<D, E>,
  op6: Unary<E, F>,
  op7: Unary<F, G>,
  op8: Unary<G, H>,
  op9: Unary<H, I>
): Unary<T, I>
export function pipe(...operators: Array<Unary<any, any>>) {
  return (value: any) => {
    if (!operators.length) {
      return value
    }

    return operators.reduce((prev, operator) => {
      return operator(prev)
    }, value)
  }
}
