import { Observable } from '../..'
import { concat } from '../../operators/concat'

describe('(Operator) concat', () => {
  it('returns a new Observable', () => {
    expect(concat(Observable.of(), Observable.of())(Observable.of())).toBeInstanceOf(Observable)
  })

  it('emits all values from all input observables in order', async () => {
    const outputValues: any[] = []
    const one = new Observable((observer) => {
      setTimeout(() => {
        observer.next(1)
        observer.complete()
      }, 100)
    })

    await new Promise((resolve) => {
      concat(Observable.of(4, 5, 6), Observable.of(7, 8, 9))(one).subscribe({
        next(value) {
          outputValues.push(value)
        },
        complete: resolve
      })
    })

    expect(outputValues).toEqual([1, 4, 5, 6, 7, 8, 9])
  })

  it('propagates errors from all inputs', async () => {
    const errorObservable = new Observable((observer) => observer.error('error'))
    const errorHandler1 = jest.fn()
    const errorHandler2 = jest.fn()

    await new Promise((resolve) =>
      concat(Observable.of())(errorObservable).subscribe({
        error: (e) => {
          errorHandler1(e)
          resolve()
        }
      })
    )

    expect(errorHandler1).toHaveBeenCalledWith('error')

    await new Promise((resolve) =>
      concat(errorObservable)(Observable.of()).subscribe({
        error: (e) => {
          errorHandler2(e)
          resolve()
        }
      })
    )

    expect(errorHandler2).toHaveBeenCalledWith('error')
  })
})
