import { Observable } from '../..'
import { defer } from '../defer'

describe('(Observable) defer', () => {
  it('should return an instance of the global Observable by default', () => {
    expect(defer(() => null)).toBeInstanceOf(Observable)
  })

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
    const observer = {
      next: jest.fn(),
      complete: jest.fn()
    }

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
