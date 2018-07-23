import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { defer } from '../defer'

describe('(Observable) defer', () => {
  commonTest(defer(() => 1), undefined, [1])

  it('should not execute deferred action before subscription', () => {
    const action = jest.fn()
    defer(action)
    expect(action).not.toHaveBeenCalled()
  })

  it('should execute deferred action upon subscription', async () => {
    const action = jest.fn()

    await new Promise((resolve) => defer(action).subscribe(resolve))

    expect(action.mock.calls.length).toBe(1)
  })

  it('should emit the returned value of the action then complete', async () => {
    const observer = getTestObserver()
    defer(() => Promise.resolve('value')).subscribe(observer)

    await null

    expect(observer.next).toHaveBeenCalledWith('value')
    expect(observer.complete).toHaveBeenCalled()
  })

  it('should error upon promise rejection', async () => {
    const error = new Error('error')
    const observer = {
      error: jest.fn()
    }

    defer(() => Promise.reject(error)).subscribe(observer)

    await null

    expect(observer.error).toHaveBeenCalledWith(error)
  })
})
