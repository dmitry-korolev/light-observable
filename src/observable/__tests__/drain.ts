import { Observable } from '../../core/Observable'
import { drain as drainOperator } from '../../operators/drain'
import { drain } from '../drain'
import { of } from '../of'

describe('(Extra) drain', () => {
  it('returns a promise', () => {
    expect(drain(of(1))).toBeInstanceOf(Promise)
    expect(drainOperator()(of(1))).toBeInstanceOf(Promise)
  })

  it('should reject on an error in the input observable', async () => {
    const errorHandler = jest.fn()

    await drain(new Observable((observer) => observer.error('error'))).catch(errorHandler)

    expect(errorHandler).toHaveBeenCalledWith('error')
  })

  it('should resolve on complete', async () => {
    expect.assertions(1)

    await drain(of(1, 2, 3))

    expect(true).toEqual(true)
  })
})
