import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { fromPromise } from '../fromPromise'

describe('(Extra) fromPromise', () => {
  commonTest(fromPromise(Promise.resolve(1)), undefined, [1])

  it('should emit the resolved value and complete upon promise resolution', async () => {
    const observer = getTestObserver()
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
