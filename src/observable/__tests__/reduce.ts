import { reduce as reduceOperator } from '../../operators/reduce'
import { of } from '../of'
import { reduce } from '../reduce'
import { throwError } from '../throwError'

describe('(Extra) reduce', () => {
  it('returns a promise', () => {
    expect(reduce(() => undefined, undefined, of(1))).toBeInstanceOf(Promise)
    expect(reduceOperator(() => undefined, undefined)(of(1))).toBeInstanceOf(Promise)
  })

  it('call the provided function with each observed value', async () => {
    const spy = jest.fn((acc, val) => acc + val)
    await reduce(spy, 0, of(1, 2, 3))

    expect(spy.mock.calls).toEqual([[0, 1, 0], [1, 2, 1], [3, 3, 2]])
  })

  it('resolves to accumulated result', async () => {
    const fn = (acc: number, val: number) => acc + val
    const result = await reduce(fn, 5, of(1, 2, 3))

    expect(result).toEqual(11)
  })

  it('should reject on an error in the input observable', async () => {
    const errorHandler = jest.fn()

    await reduce(() => null, null, throwError('error')).catch(errorHandler)

    expect(errorHandler).toHaveBeenCalledWith('error')
  })

  it('should reject on an error in the function execution', async () => {
    const errorHandler = jest.fn()
    const error = new Error('things went bad')

    await reduce(
      () => {
        throw error
      },
      0,
      of(1)
    ).catch(errorHandler)

    expect(errorHandler).toHaveBeenCalledWith(error)
  })
})
