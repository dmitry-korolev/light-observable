import { Observable } from '../..'
import { fromPromise } from '../fromPromise'

describe('(Observable) fromPromise', () => {
  it('should return an Observable', () => {
    expect(fromPromise(Promise.resolve())).toBeInstanceOf(Observable)
  })

  it('should emit the resolved value and complete upon promise resolution', async () => {
    const observer = {
      next: jest.fn(),
      complete: jest.fn()
    }

    fromPromise(Promise.resolve('value')).subscribe(observer)

    await null

    expect(observer.next).toHaveBeenCalledWith('value')
    expect(observer.complete.mock.calls.length).toBe(1)
  })

  it('should error upon promise rejection', async () => {
    const error = new Error('error')

    const observer = {
      error: jest.fn()
    }

    fromPromise(Promise.reject(error)).subscribe(observer)

    await null

    expect(observer.error).toHaveBeenCalledWith(error)
  })
})
