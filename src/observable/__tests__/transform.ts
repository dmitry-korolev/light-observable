import { Observable } from '../../core/Observable'
import { transform } from '../../helpers/transform'

describe('(Operator) transform', () => {
  it('returns a new observable', () => {
    expect(transform(Observable.of(1), () => null)).toBeInstanceOf(Observable)
  })

  it('calls the provided operation function once for each observed value', async () => {
    const operation = jest.fn()

    await new Promise((resolve) =>
      transform(Observable.of(1, 2, 3), operation).subscribe({
        complete: resolve
      })
    )
    expect(operation.mock.calls).toHaveLength(3)
  })

  it('propagates errors from the input observable', async () => {
    const errorObservable = new Observable((observer) => observer.error('error'))
    const errorHandler = jest.fn()

    await new Promise((resolve) =>
      transform(errorObservable, () => null).subscribe({
        error(e) {
          errorHandler(e)
          resolve()
        }
      })
    )

    expect(errorHandler).toHaveBeenCalledWith('error')
  })

  it('propagates complete calls from the input observable', async () => {
    const completeObservable = new Observable((observer) => observer.complete())

    const completionHandler = jest.fn()

    await new Promise((resolve) =>
      transform(completeObservable, () => null).subscribe({
        complete() {
          completionHandler()
          resolve()
        }
      })
    )

    expect(completionHandler.mock.calls).toHaveLength(1)
  })

  it('propagates errors that occur in the provided operation', async () => {
    const error = new Error('things went bad')
    const errorHandler = jest.fn()
    try {
      await new Promise((resolve) =>
        transform(Observable.of(1, 2, 3), () => {
          throw error
        }).subscribe({
          error(e) {
            errorHandler(e)
            resolve()
          }
        })
      )
      // tslint:disable-next-line
    } catch (e) {}

    expect(errorHandler).toHaveBeenCalledWith(error)
  })
})
