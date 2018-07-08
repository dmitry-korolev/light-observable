import { Observable } from '../../core/Observable'
import { forEach } from '../../operators/forEach'
import { of } from '../of'

describe('(Operator) forEach', () => {
  it('returns a promise', () => {
    expect(forEach(() => undefined)(of(1))).toBeInstanceOf(Promise)
  })

  it('call the provided function with each observed value', async () => {
    const spy = jest.fn()

    await forEach(spy)(of(1, 2, 3))

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
    })(of(1, 2, 3)).catch(errorHandler)

    expect(errorHandler).toHaveBeenCalledWith(error)
  })

  it('can be called without fn argument', async () => {
    expect(async () => {
      await forEach()(of(1))
    }).not.toThrow()
  })
})
