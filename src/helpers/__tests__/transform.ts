import { Observable } from '../../core/Observable'
import { createSubject } from '../../observable'
import { of } from '../../observable/of'
import { commonTest } from '../testHelpers/commonTest'
import { getTestObserver } from '../testHelpers/getTestObserver'
import { transform } from '../transform'

describe('(Util) transform', () => {
  commonTest(transform(of(1), () => null))

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

  it('provides index to transformer function', () => {
    const [stream, sink] = createSubject()
    const observer = getTestObserver()

    transform(stream, (o, value, index) => {
      o.next([value, index])
    }).subscribe(observer)

    sink.next('a')
    sink.next('b')
    sink.next('c')

    expect(observer.next.mock.calls).toEqual([[['a', 0]], [['b', 1]], [['c', 2]]])
  })
})
