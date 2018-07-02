import { Observable } from '../../Observable'
import { forEach } from '../forEach'

describe('(Operator) forEach', () => {
  it('returns a promise', () => {
    expect(forEach(() => undefined)(Observable.of(1))).toBeInstanceOf(Promise)
  })

  it('call the provided function with each observed value', async () => {
    const spy = jest.fn()

    await forEach(spy)(Observable.of(1, 2, 3))

    expect(spy.mock.calls).toEqual([[1], [2], [3]])
  })

  it('should reject on an error in the input observable', async () => {
    const errorHandler = jest.fn()

    await forEach(() => null)(new Observable((observer) => observer.error('error'))).catch(
      errorHandler
    )

    expect(errorHandler).toHaveBeenCalledWith('error')
  })

  it('should reject on an error in the function execution', async () => {
    const errorHandler = jest.fn()
    const error = new Error('things went bad')

    await forEach(() => {
      throw error
    })(Observable.of(1, 2, 3)).catch(errorHandler)

    expect(errorHandler).toHaveBeenCalledWith(error)
  })
})
